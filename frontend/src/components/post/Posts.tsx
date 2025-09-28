"use client"
import {useState, useEffect} from "react";
import PostCard from "@/components/post/PostCard";

const Posts = ({data}: { data:ApiResponseType<PostType>}) => {
    const [posts, setPosts] = useState<ApiResponseType<PostType>>(data);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 gap-4 pt-4 p-2">
            {posts.data && posts.data.length > 0 && posts.data.map((post: PostType) => (
                <PostCard post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts;
