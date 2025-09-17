import NextAuth from "next-auth/next";
import {authOptions} from "@/app/api/auth/authOptions";

const nextAuth = NextAuth(authOptions);

export {nextAuth as GET, nextAuth as POST};