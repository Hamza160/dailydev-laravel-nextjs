"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import {useState} from "react";

const Register = () => {
    const [authState, setAuthState] = useState({
        name:"",
        username:"",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);

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
                    <form className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter here..."
                                value={authState.name}
                                onChange={(e) => setAuthState({...authState, name: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter here..."
                                value={authState.username}
                                onChange={(e) => setAuthState({...authState, username: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter here..."
                                value={authState.email}
                                onChange={(e) => setAuthState({...authState, email: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={authState.password}
                                onChange={(e) => setAuthState({...authState, password: e.target.value})}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password_confirmation">Password Confirmation</Label>
                            <Input
                                type="password_confirmation"
                                id="password_confirmation"
                                value={authState.password_confirmation}
                                onChange={(e) => setAuthState({...authState, password_confirmation: e.target.value})}
                            />
                        </div>
                        <div className="mt-3">
                            <Button className="w-full" disabled={loading}>{loading ? 'Processing...': 'Register'}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

export default Register;