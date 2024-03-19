import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

// Define the MobileSidebar component
export const MobileSidebar = () => {
    return ( 
        <Sheet>
             {/* Render the sheet trigger for mobile */}
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            {/* Render the sheet content */}
            <SheetContent side="left" className="p-0 bg-white">
                 {/* Render the sidebar */}
                <Sidebar/>
            </SheetContent>
        </Sheet>     
        );
}
export default MobileSidebar;