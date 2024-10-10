import conf from "../conf/conf";
import {Client,Account,ID} from appwrite;
 export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl) // Your API Endpoint
    .setProject(conf.appwriteprojectid); 
    this.account=new Account(this.client);
    }

//??????? for create account ????????? //
async createAccount({email,password,name}){
  try{
    const userAccount= await this.account.create(ID.unique(),email,password,name);
    if(userAccount){
        // login krvana he direct
    }
    else {
        return userAccount;

    }

} catch(error){
    throw error;  
}
}
 
// \\\\\\\\\\\ for login  /////////////// //
async login({password,email}){
  try {
    await this.account.createEmailPasswordSession(password,email);
} catch(error){
    throw error;
}
} 
/// for finding out that is the user is login or not //
 async getCurrentUser(){
   try{
   return await this.account.get();
   } catch(error){
    console.log("appwrite seervice :: getCurrentUser :: error",error)
   }
   return null;
 }
 // :::::::::: for logout or delete :::::::::::: //
 async logout(){
try{
    await this.account.deleteSessions();
} catch(error){
    throw error;
}
 }

 }




const authService=new AuthService();
export default authService;
