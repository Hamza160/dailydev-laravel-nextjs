"use client"
import Link from "next/link";
import {ArrowBigUpIcon, FlameIcon, LinkIcon, SearchIcon} from "lucide-react";
import UserAvatar from "@/components/common/UserAvatar";
import {useSession} from "next-auth/react";
import {CustomUser} from "@/app/api/auth/[...nextauth]/authOptions";

const SidebarLinks = () => {
    const {data} = useSession();
    const user = data?.user as CustomUser;
    return (
        <>
            <Link href="/" className="flex space-x-4 items-center py-4">
                <UserAvatar image={user?.profile_image ?? undefined} />
                <p>Feed</p>
            </Link>

            <p className="my-2 font-bold text-white/80">Discover</p>
            <ul>
                <li>
                    <Link href="/popular" className="flex space-x-4 items-center mb-4">
                        <FlameIcon className="w-5 h-5"/>
                        <p>Popular</p>
                    </Link>
                    <Link href="/search" className="flex space-x-4 items-center mb-4">
                        <SearchIcon className="w-5 h-5"/>
                        <p>Search</p>
                    </Link>
                    <Link href="/most-voted" className="flex space-x-4 items-center mb-4">
                        <ArrowBigUpIcon className="w-5 h-5"/>
                        <p>Most Voted</p>
                    </Link>
                </li>
            </ul>

            <p className="my-2 font-bold text-white/80">Contribute</p>
            <ul>
                <li>
                    <Link href="/popular" className="flex space-x-4 items-center mb-4">
                        <LinkIcon className="w-5 h-5"/>
                        <p>Submit Article</p>
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default SidebarLinks;