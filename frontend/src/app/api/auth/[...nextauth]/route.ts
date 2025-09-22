import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const nextAuth = NextAuth(authOptions)

export { nextAuth as GET, nextAuth as POST };