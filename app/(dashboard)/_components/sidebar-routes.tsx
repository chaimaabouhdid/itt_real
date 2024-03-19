"use client";

import { Compass, Users2, Mail, List, MonitorCheck, LayoutGrid, BarChartBig } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

// Define guest routes for the sidebar
const guestRoutes =[
    {
        icon: LayoutGrid,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
    {
        icon: Users2,
        label: "About Us",
        href: "/about-us",
    },
    {
        icon: Mail,
        label: "Contact Us",
        href: "/contact-us",
    },
    {
        icon: MonitorCheck,
        label: "Terms of Service",
        href: "/terms-of-service",
    },
];

// Define teacher routes for the sidebar
const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
]

// Define the SidebarRoutes component
export const SidebarRoutes = () => {
     // Get the current pathname
    const pathname = usePathname();
    // Determine if it's a teacher page based on the pathname
    const isTeacherPage = pathname?.includes("/teacher");
     // Select routes based on whether it's a teacher page or not
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return ( 
        <div className="flex flex-col w-full">
             {/* Map through routes and render SidebarItem components */}
            {routes.map((route) => (
                <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            ))}
        </div>
     );
}
export default SidebarRoutes;