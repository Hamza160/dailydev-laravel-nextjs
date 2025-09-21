import {AuthOptions, ISODateString} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/lib/axios";
import {LOGIN_URL} from "@/lib/apiEndpoints";
import {JWT} from "next-auth/jwt";

export interface CustomSession{
    user?:CustomSession;
    expires: ISODateString
}
export  interface CustomUser{
    id?:string;
    email?:string;
    name?:string;
    username?:string;
    password?:string;
    profile_image?:string;
    token?:string;
    created_at?:string;
    updated_at?:string;
}
export const authOptions: AuthOptions = {
    pages:{
        signIn:'/login'
    },
    callbacks:{
        async jwt({token, user, trigger, session}){
            if(trigger === 'update' && session?.profile_image)
            {
                const user = token.user as CustomUser
                user.profile_image = session?.profile_image
            }
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session, token, user}:{session:CustomSession, token:JWT, user:CustomUser}){
            session.user = token.user as CustomUser
            return session
        }
    },
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{},
                password:{}
            },
            async authorize(credentials, req){
                const response = await axiosInstance.post(LOGIN_URL, credentials)
                const user = response?.data?.user
                return user ? user :  null
            }
        })
    ]
}