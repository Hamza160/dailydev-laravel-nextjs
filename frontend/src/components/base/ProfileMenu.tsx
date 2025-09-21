"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import UserAvatar from "@/components/common/UserAvatar";
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import {LOGOUT_URL, UPDATE_PROFILE_URL} from "@/lib/apiEndpoints";
import {CustomSession, CustomUser} from "@/app/api/auth/[...nextauth]/authOptions";
import {toast} from "react-toastify";
import {signOut} from 'next-auth/react'
import {Label} from "@radix-ui/react-menu";
import {Input} from "@/components/ui/input";
import {useSession} from "next-auth/react";

const ProfileMenu = () => {
    const {data, update} = useSession();
    const user = data?.user as CustomUser;
    const [logoutOpen, setLogoutOpen] = React.useState(false);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState<File|null>(null);
    const [errors, setErrors] = React.useState({
        profile_image: []
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if(file){
            setImage(file)
        }
    }

    const updateProfile = async(event:React.FormEvent) => {
        event.preventDefault();

        try{
            setLoading(true);
            const formData = new FormData();
            formData.append('profile_image', image ?? "");
            const response = await axiosInstance.post(UPDATE_PROFILE_URL, formData, {
                headers: {
                    Authorization:`Bearer ${user.token}`,
                }
            })
            console.log(response.data);
            const profile_image = response?.data?.profile_image;

            await update({profile_image:profile_image})
            toast.success("Profile successfully updated")
            setProfileOpen(false);
        }catch(error){
            if(error?.response?.status === 422){
                setErrors(error?.response?.data?.errors)
            }else if(error?.response?.status === 401){
                toast.error("Invalid Credentials")
            }else{
                toast.error("Something went wrong. Please try again")
            }
        }finally{
            setLoading(false);
        }
    }

    const logoutUser = async() => {
        try{
            await axiosInstance.post(LOGOUT_URL, {}, {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })
            await signOut({
                callbackUrl: '/login',
                redirect: true
            })
        }catch(error){
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div>
            {/*Profile Dialog*/}
            <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <div>
                        <form onSubmit={updateProfile}>
                            <div className="mb-2">
                                <Label htmlFor="image">Profile Image</Label>
                                <Input type="file" id="image" accept="image/*" onChange={handleChange} />
                                {errors?.profile_image?.length > 0 && <span className="text-red-400">{errors.profile_image?.[0]}</span>}
                            </div>
                            <div className="mb-2">
                                <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Processing': 'Update Profile'}</Button>
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/*Logout Dialog*/}
            <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action expires your current session.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-4">
                        <Button variant={"destructive"} onClick={logoutUser}>Yes Logout</Button>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar image={user?.profile_image ?? undefined}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setProfileOpen(true)}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileMenu