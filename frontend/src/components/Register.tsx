"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import React from "react";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {RegisterSchema, RegisterSchemaType} from "@/validations/authValidations";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios";
import {REGISTER_URL} from "@/lib/apiEndpoints";
import {useRouter} from "next/navigation";

const Register = () => {
    const router = useRouter();
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = async (data: RegisterSchemaType): Promise<void> => {
        try {
            await axiosInstance.post(REGISTER_URL, data)
            router.push("/login");
            toast.success("Register successfully");
        } catch (error) {
            if (error?.response.status === 422) {
                const serverErrors = error.response.data.errors;
                for (const field in serverErrors) {
                    if (serverErrors.hasOwnProperty(field)) {
                        setError(field, {
                            type: 'server',
                            message: serverErrors[field][0] // Assumes the first message in the array
                        });
                    }
                }
            } else if (error?.response.status === 500) {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <TabsContent value="register">
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Welcome to Daily.dev
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter here..."
                                {...register("name")}
                            />
                            {errors.name && <span className="text-red-400">{errors.name.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter here..."
                                {...register("username")}
                            />
                            {errors.username && <span className="text-red-400">{errors.username.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter here..."
                                {...register("email")}
                            />
                            {errors.email && <span className="text-red-400">{errors.email.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                {...register("password")}
                            />
                            {errors.password && <span className="text-red-400">{errors.password.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password_confirmation">Password Confirmation</Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                {...register("password_confirmation")}
                            />
                            {errors.password_confirmation &&
                                <span className="text-red-400">{errors.password_confirmation.message}</span>}
                        </div>
                        <div className="mt-3">
                            <Button className="w-full"
                                    disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Register'}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default Register;