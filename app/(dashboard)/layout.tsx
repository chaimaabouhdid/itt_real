import Footer from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import React from "react";

// Define the DashboardLayout component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <div className="fixed inset-y-0 z-50 w-full md:pl-56 h-[80px]">
                <Navbar />
            </div>
            {/* Sidebar (visible only on larger screens) */}
            <div className="hidden fixed inset-y-0 z-50 flex-col w-56 h-full md:flex">
                <Sidebar />
            </div>
            {/* Main content area */}
            <main className="md:pl-56 pt-[80px]">{children}</main>
            {/* Footer Area */}
            <div className="mt-auto md:pl-56 pt-[80px]">
                <Footer />
            </div>
        </div>
    );
};
export default DashboardLayout;