"use client";

import { Compass, Users2, Layout, Mail, Sidebar, MonitorCheck } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes =[
    {
        icon: Layout,
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
]
export const SidebarRoutes = () => {
    const routes = guestRoutes;
    return ( 
        <div className="flex flex-col w-full">
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