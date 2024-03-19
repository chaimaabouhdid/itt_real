"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Define props interface for SidebarItem component
interface SidebarItemProps{
    icon: LucideIcon;
    label: string;
    // URL to navigate to when clicked
    href: string;
}

// Define the SidebarItem component
export const SidebarItem = ({
    icon: Icon,
    label,
    href, }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    // Determine if the item is active based on the current pathname and href
    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith('${href}/');
    // Handle click event to navigate to the specified href
    const onClick = () => {
        router.push(href);
    }
    return ( 
        <button 
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-emerald-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-emerald-700"
            )}>
        {/* Render the icon */}
        <div className="flex items-center gap-x-2 py-4">
            <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-900")}
            />
             {/* Render the label */}
            {label}
        </div>
        <div
        // Render a border on the right side of the active menu item
        className={cn("ml-auto opacity-0 border-2 border-slate-900 h-full transition-all", isActive && "opacity-100")}
        />
        </button>
     );
}
export default SidebarItem;