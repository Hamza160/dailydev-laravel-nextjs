import Image from "next/image";

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Login from "@/components/Login";
import Register from "@/components/Register";
export default function LoginPage(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="hidden lg:flex items-center justify-center w-fullh-screen">
                <Image
                    src={"/auth_img.svg"}
                    alt={"Auth Image"}
                    width={500}
                    height={500}
                    className="w-full object-containt"
                />
            </div>
            <div className="flex flex-col justify-center items-center h-screen w-full md:w-[500px] px-4">
                <div className="flex flex-col justify-start items-start gap-2 mb-6">
                    <Image
                        src={"/logo.svg"}
                        alt={"Logo"}
                        width={150}
                        height={150}
                        priority={true}
                    />
                    <h1 className="text-cabbage font-bold text-2xl md:text-3xl mt-2">Where developers suffer together</h1>
                </div>
                <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                        <Login/>
                        <Register/>
                </Tabs>
                </div>
            </div>
        </div>
    )
}