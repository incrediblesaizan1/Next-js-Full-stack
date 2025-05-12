import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/dbConnect";
// import UserModel from "@/model/user.model";

export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            
            credentials:{
               username: {label: "Username", type: "text", placeholder: "jsmith"},
               password: {label: "Password", type: "password"}     
            },

            async authorize(credentials: any):Promise<any>{
                console.log(credentials)
            }

        })
    ]
}