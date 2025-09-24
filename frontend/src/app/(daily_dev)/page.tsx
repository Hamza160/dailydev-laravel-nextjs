import Image from "next/image";
import {Button} from "@/components/ui/button";
import {getServerSession} from "next-auth";
import {authOptions, CustomSession} from "@/app/api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/base/Navbar";
import {fetchPosts} from "@/dataFetch/postFetch";
import Posts from "@/components/post/Posts";

export default async function Home() {
    const session: CustomSession | null = await getServerSession(authOptions);
    const posts: ApiResponseType<PostType> = await  fetchPosts(session?.user?.token!);

    return (
        <div>
            <Posts data={posts} />
        </div>
    );
}
