import {ReactNode} from "react";
import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";
import {authOptions, CustomSession} from "@/app/api/auth/[...nextauth]/authOptions";
import {getServerSession} from "next-auth";

export default async function DailyDevLayout({children}: {children: ReactNode}) {
    const session = await getServerSession(authOptions) as CustomSession | null;
    return (
        <div className="h-screen flex flex-col overflow-y-hidden">
            <Navbar user={session?.user!}/>
            <div className="flex">
                <Sidebar/>
                <div className="flex justify-center items-center w-full overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}