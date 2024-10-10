import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query} from appwrite;

export class Service{
    client= new Client;
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl) 
    .setProject(conf.appwriteprojectid);
    this.databases = new Databases(this.client);
    this.bucket= new Storage(this.client);
    }
     async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwritedatbaseid,conf.appwritecollectionid,slug,{title,content,featuredImage,status,userId})
            
        } catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            
        }
     }
     async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(conf.appwritecollectionid,
                conf.appwritecollectionid,slug,{title,content,featuredImage,status,userId}
            )
                
            }
            
         catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            
        }
     }
     async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwritedatbaseid,conf.appwritecollectionid,slug)
           return true; 
        } 

        catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            return false;
        }
     }
     async getPost(slug){
        try {
         return await this.databasesgetDocument(conf.appwritedatbaseid,conf.appwritecollectionid,slug)
            
        } catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
        }
     }
     async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments (
                conf.appwritedatbaseid,conf.appwritecollectionid,
                queries
            )
            
        } catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            return false;
        }
     }
     /// file uploading services
     async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID,unique(),
            
            )
            
        } catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            return false;
        }
     }
     async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwritebucketid,fileId)
            
        } catch (error) {
            console.log("appwrite seervice :: getCurrentUser :: error",error)
            return false;
        }
     }
     getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwritebucketid,fileId)
     }

    }
