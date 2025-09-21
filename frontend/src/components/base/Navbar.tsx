import Image from "next/image";
import {Button} from "@/components/ui/button";
import {BellIcon} from "lucide-react";
import SearchInput from "@/components/base/SearchInput";
import ProfileMenu from "@/components/base/ProfileMenu";
import MobileSidebar from "@/components/base/MobileSidebar";
import {CustomUser} from "@/app/api/auth/[...nextauth]/authOptions";

const Navbar = ({user}:{user:CustomUser}) => {
    return (
        <nav className="flex justify-between items-center p-2 border-b">
            <MobileSidebar/>
            <Image src="/logo.svg" alt="Logo" width={120} height={120}/>
            <SearchInput/>
            <div className="flex items-center gap-1">
                <Button size="icon" variant="secondary">
                    <BellIcon className="w-5 h-5"/>
                </Button>
                <ProfileMenu/>
            </div>
        </nav>
    )
}

export default Navbar;