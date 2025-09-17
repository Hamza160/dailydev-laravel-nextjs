"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import React, {FormEvent, useState} from "react";
import myAxios from "@/lib/axios.config";
import {CHECK_CREDENTIALS_URL, LOGIN_URL} from "@/lib/apiEndPoints";
import {toast} from "react-toastify";
import {signIn} from "next-auth/react"

const Login = () => {
    const [authState, setAuthState] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: [],
        password: [],
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await myAxios.post(CHECK_CREDENTIALS_URL, authState);
            if(response.status === 200){
                await signIn("credentials", {
                    email: authState.email,
                    password: authState.password,
                    redirect:true,
                    callbackUrl:'/'
                })
            }
            setLoading(false);
            toast.success("Login successful");
        }catch(error) {
            if(error?.response?.status === 422){
                setErrors(error.response.data.errors);
            }else if(error?.response?.status === 404){
                toast.error("Invalid credentials");
            }else{
                toast.error("Something went wrong. Please try again later");
            }
        }
    }

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
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter here..."
                                value={authState.email}
                                onChange={(e) => setAuthState({...authState, email: e.target.value})}
                            />
                            <span className="text-red-400">{errors.email?.[0]}</span>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={authState.password}
                                onChange={(e) => setAuthState({...authState, password: e.target.value})}
                            />
                            <span className="text-red-400">{errors.password?.[0]}</span>
                        </div>
                        <div className="mt-3">
                            <Button className="w-full" disabled={loading}>{loading ? 'Processing...': 'Login'}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default Login;