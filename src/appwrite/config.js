import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            if (!fileId) {
                return null;
            }
            
            // Check if fileId is already a full URL (for external images)
            if (fileId.startsWith('http://') || fileId.startsWith('https://')) {
                return fileId;
            }
            
            // Log for debugging in production
            console.log('Getting file preview for ID:', fileId);
            console.log('Bucket ID:', conf.appwriteBucketId);
            console.log('Project ID:', conf.appwriteProjectId);
            
            // getFileView returns a URL object directly
            // No need for await as it's synchronous
            const fileUrl = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            
            // Convert URL object to string
            const urlString = fileUrl.href || fileUrl.toString();
            console.log('Generated file URL:', urlString);
            
            return urlString;
            
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            console.error("Failed to get preview for fileId:", fileId);
            console.error("Bucket ID:", conf.appwriteBucketId);
            console.error("Make sure bucket permissions are set to 'Any' for read access");
            return null;
        }
    }
    
    // Alternative method using getFileDownload which might work better in production
    getFileDownload(fileId){
        try {
            if (!fileId) {
                return null;
            }
            
            // Check if fileId is already a full URL (for external images)
            if (fileId.startsWith('http://') || fileId.startsWith('https://')) {
                return fileId;
            }
            
            // getFileDownload returns a URL for downloading the file
            const fileUrl = this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            );
            
            return fileUrl.href || fileUrl.toString();
            
        } catch (error) {
            console.error("Appwrite service :: getFileDownload :: error", error);
            console.error("Failed to get download URL for fileId:", fileId);
            return null;
        }
    }
}


const service = new Service()
export default service