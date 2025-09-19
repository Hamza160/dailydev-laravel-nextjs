import {ReactNode} from "react";
import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";

export default function DailyDevLayout({children}: {children: ReactNode}) {
    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                {children}
            </div>
        </div>
    )
}