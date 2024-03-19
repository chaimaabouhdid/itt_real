import { NavbarRoutes } from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

// Define the Navbar component
export const Navbar  = () => {
    return ( 
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            {/* Render the mobile sidebar */}
            <MobileSidebar/>
            {/* Render the navbar routes */}
            <NavbarRoutes/>
        </div>
     );
}
