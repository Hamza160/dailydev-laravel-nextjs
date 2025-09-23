"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {LinkIcon} from "lucide-react";
import {FormEvent, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {isValidUrl} from "@/lib/utils";
import {toast} from "react-toastify";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import {POST_URL} from "@/lib/apiEndpoints";
import {useSession} from "next-auth/react";
import {CustomUser} from "@/app/api/auth/[...nextauth]/authOptions";

const defaultPostState = {
    url: "",
    title: "",
    description: "",
    image_url: ""
}

const AddPost = () => {
    const {data} = useSession()
    const user = data?.user as CustomUser
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        title: [],
        description: [],
        url: [],
        image_url: []
    });
    const [postState, setPostState] = useState<PostStateType>(defaultPostState)

    const loadPreview = async () => {
        if (isValidUrl(postState.url)) {
            setLoading(true);
            try {
                const res = await axios.post("/api/image-preview", {url: postState.url})
                const response = await res.data?.data
                const img = response.images.length > 0 ? response.images[0] : 'https://images.unsplash.com/photo-1738005787790-cdd55b3bddec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                setPostState({
                    ...postState,
                    image_url: img,
                    title: response.title,
                    description: response.description ?? "",
                })

            } catch (err) {
                toast.error("something went wrong while fetching data from url");
            } finally {
                setLoading(false);
            }
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            await axiosInstance.post(POST_URL, postState, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setOpen(false);
            setPostState(defaultPostState)
            toast.success("Post Added successful");
        } catch (err) {
            if (err?.response?.status === 422) {
                setErrors(err?.response?.data?.errors);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex space-x-4 items-center mb-4" onClick={() => setOpen(true)}>
                    <LinkIcon className="w-5 h-5"/>
                    <p>Submit Article</p>
                </div>
            </DialogTrigger>
            <DialogContent
                className="overflow-y-auto max-h-screen"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Add Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {postState.image_url &&
                        <Image
                            src={postState.image_url}
                            alt={postState.title}
                            width={450}
                            height={450}
                            className="object-contain w-full rounded-xl my-2"
                        />
                    }
                    <div className="mb-4">
                        <Label htmlFor="url">Url</Label>
                        <Input
                            type="text"
                            id="url"
                            placeholder="Paste your url"
                            value={postState.url}
                            onChange={(e) => setPostState({...postState, url: e.target.value})}
                            onBlur={loadPreview}
                        />
                        {errors.url && <span className="text-red-400">{errors.url?.[0]}</span>}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Type here..."
                            value={postState.title}
                            onChange={(e) => setPostState({...postState, title: e.target.value})}
                        />
                        {errors.title && <span className="text-red-400">{errors.title?.[0]}</span>}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="desciption">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Type here..."
                            value={postState.description}
                            rows={10}
                            onChange={(e) => setPostState({...postState, description: e.target.value})}
                        />
                        {errors.description && <span className="text-red-400">{errors.description?.[0]}</span>}
                    </div>
                    <div className="mb-4">
                        <Button type="submit" className="w-full"
                                disabled={loading}>{loading ? 'Processing...' : 'Submit'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPost