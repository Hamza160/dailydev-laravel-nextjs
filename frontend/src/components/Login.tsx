"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import {useForm} from "react-hook-form";
import {LoginSchema, LoginSchemaType} from "@/validations/authValidations";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import axiosInstance from "@/lib/axios";
import {CHECK_CREDENTIALS_URL} from "@/lib/apiEndpoints";
import {signIn} from "next-auth/react";

const Login = () => {
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<LoginSchemaType>({
        resolver:zodResolver(LoginSchema)
    })

    const onSubmit = async (data: LoginSchemaType) => {
        try{
            await axiosInstance.post(CHECK_CREDENTIALS_URL, data);
            await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect:true,
                callbackUrl:'/'
            })
        }catch(error){
            if(error?.response?.status === 422){
                toast.error(error?.response?.data?.message);
            }else if(error?.response?.status === 500){
                toast.error("Something went wrong");
            }
        }
    };


    return (
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Welcome back to Daily.dev
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="Enter here..."
                                {...register("email")}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                {...register("password")}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="mt-3">
                            <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Processing' : 'Login'}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default Login;