import Link from "next/link";
import {ArrowBigUpIcon, FlameIcon, LinkIcon, SearchIcon} from "lucide-react";
import UserAvatar from "@/components/common/UserAvatar";

const SidebarLinks = () => {
    return (
        <>
            <Link href="/" className="flex space-x-4 items-center py-4">
                <UserAvatar/>
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