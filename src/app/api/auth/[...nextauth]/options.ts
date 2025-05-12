import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            
            credentials:{
               email: {label: "Email", type: "text", placeholder: "jsmith"},
               password: {label: "Password", type: "password"}     
            },

            async authorize(credentials: any):Promise<any>{
                await connectDB()
                try {
                  const user =  await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier.email},
                            {username: credentials.identifier.username}
                        ]
                    })
                    if(!user){
                        throw new Error("No User found with this Email")
                    }
                   const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                   if(isPasswordCorrect){
                    return user
                   }else{
                    throw new Error("Incorrect Password")
                   }
                } catch (error) {
                    throw new Error(error)
                }
            }

        })
    ],

    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt"
    },
    secret: "lsdalndaldsllnfdaldnoiel6789msasdl341ladalad"
}