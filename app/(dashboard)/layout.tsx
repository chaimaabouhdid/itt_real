import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import React from "react";

// Define the DashboardLayout component
const DashboardLayout = ({children} :{children: React.ReactNode;}) => {
    return ( 
        <div className="h-full">
             {/* Navbar */}
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50" >
                <Navbar/>
            </div>
            {/* Sidebar (visible only on larger screens) */}
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar/>
            </div>
             {/* Main content area */}
            <main className="md:pl-56 pt-[80px] h-full">
                {children}
            </main>
        </div>
     );
}
export default DashboardLayout;