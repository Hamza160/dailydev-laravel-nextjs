import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {MenuIcon} from "lucide-react";
import SidebarLinks from "@/components/base/SidebarLinks";
const MobileSidebar = () => {
    return (
       <div className="p-4">
           <Sheet>
               <SheetTrigger asChild>
                   <MenuIcon className="lg:hidden cursor-pointer"/>
               </SheetTrigger>
               <SheetContent side="left">
                   <SidebarLinks />
               </SheetContent>
           </Sheet>
       </div>
    )
}

export default MobileSidebar;