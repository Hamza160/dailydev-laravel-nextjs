import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import UserAvatar from "@/components/common/UserAvatar";
import Image from "next/image";
import {ArrowBigUp, LinkIcon, MessageSquare} from "lucide-react";
import {formatDate} from "@/lib/utils";
const PostCard = ({post}: { post:PostType }) => {
    return (
        <Card className="w-full md:w-[300px] md:h-[500px] bg-muted">
            <CardHeader>
                <UserAvatar image={post.user.profile_image} />
                <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-2 px-2">{formatDate(post.created_at)}</p>
                <figure>
                    <Image
                        src={post.image_url}
                        alt={post.title}
                        width={250}
                        height={250}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </figure>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <ArrowBigUp size={25} />
                <div className="flex items-center space-x-2">
                    <MessageSquare size={20} />
                    {post.comment_count > 0 && <span>{post.comment_count}</span>}
                </div>
                <LinkIcon size={20} />
            </CardFooter>
        </Card>
    )
}

export default PostCard;