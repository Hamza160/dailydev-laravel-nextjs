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
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

const AddPost = () => {
    const [open, setOpen] = useState(false);
    const [postState, setPostState] = useState({
        url:"",
        title:"",
        description:"",
        image_url:""
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex space-x-4 items-center mb-4" onClick={() => setOpen(true)}>
                    <LinkIcon className="w-5 h-5"/>
                    <p>Submit Article</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Post</DialogTitle>
                </DialogHeader>
                <form>
                    <div className="mb-4">
                        <Label htmlFor="url">Url</Label>
                        <Input
                            type="text"
                            id="url"
                            placeholder="Paste your url"
                            value={postState.url}
                            onChange={(e) => setPostState({...postState, url: e.target.value})}
                        />
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
                    </div>
                    <div className="mb-4">
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPost