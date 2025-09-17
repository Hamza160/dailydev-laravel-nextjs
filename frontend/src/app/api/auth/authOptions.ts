import {AuthOptions, ISODateString} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import myAxios from "@/lib/axios.config";
import {LOGIN_URL} from "@/lib/apiEndPoints";
import {JWT} from "next-auth/jwt";

export interface CustomSession {
    user?: CustomUser,
    expires: ISODateString | null,
}

export type CustomUser = {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    profile_image?: string;
    token?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const authOptions: AuthOptions = {
    pages:{
        signIn:'/login'
    },
    callbacks:{
        async jwt({token, user, trigger, session}){
            if(user){
                token.user = user;
            }
            return token
        },
        async session({session, token, user}:{session:CustomSession; token: JWT; user:CustomSession}){
            session.user = token.user as CustomUser
            return session
        }
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, request){
                const res = await myAxios.post(LOGIN_URL, credentials);
                const response = res.data
                const user = response.user;
                if(user){
                    return user;
                }else{
                    return null;
                }
            }
        }),
    ];
}