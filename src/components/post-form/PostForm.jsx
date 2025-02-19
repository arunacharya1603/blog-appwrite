import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { ID } from "appwrite";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    toast.promise(
      (async () => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };

          if (post) {
            const file = data.image[0] ? 
              await imageCompression(data.image[0], options)
                .then(compressedBlob => {
                  return new File([compressedBlob], data.image[0].name, {
                    type: data.image[0].type
                  });
                })
                .then(compressedFile => appwriteService.uploadFile(compressedFile))
              : null;

            if (file) {
              appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
              ...data,
              featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
              navigate(`/post/${dbPost.$id}`);
            }
          } else {
            const compressedBlob = await imageCompression(data.image[0], options);
            const compressedFile = new File([compressedBlob], data.image[0].name, {
              type: data.image[0].type
            });
            const file = await appwriteService.uploadFile(compressedFile);

            if (file) {
              const fileId = file.$id;
              data.featuredImage = fileId;
              const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
                $id: ID.unique(),
              });

              if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
              }
            }
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      })(),
      {
        loading: 'Saving post...',
        success: post ? 'Post updated successfully!' : 'Post created successfully!',
        error: 'Could not save post'
      }
    );
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

PostForm.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        $id: PropTypes.string,
        content: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string,
        slug: PropTypes.string
    })
};
