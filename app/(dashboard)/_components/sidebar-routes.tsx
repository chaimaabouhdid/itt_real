"use client";

import { Compass, Users2, Mail, List, MonitorCheck, LayoutGrid, BarChartBig } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

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
const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChartBig,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]
export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
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