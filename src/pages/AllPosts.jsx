import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";
import HomeSkeletonCard from "./home/HomeSkeletonCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingToast = toast.loading("Loading posts...");
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
      toast.success("Posts loaded successfully");
      toast.dismiss(loadingToast);
    }).catch(() => {
      toast.error("Error loading posts");
    });
  }, []);
  //TODO: add case for array length 0
  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? <AllPostsSkeleton /> : posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

function AllPostsSkeleton() {
  return (
    <>
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
    </>
  );
}
