"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const isTeacherUI = pathname?.startsWith("/teacher");
    const isStudentUI = pathname?.includes("/chapter");

    return ( 
        <div className="flex gap-x-2 ml-auto">
            {isTeacherUI || isStudentUI ? (
                <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                    Welcome, Teacher!
                </Button>
                </Link>
            )}
            <UserButton
            afterSignOutUrl="/"
            />
        </div>
     );
}