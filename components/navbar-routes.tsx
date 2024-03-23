"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

// Define the NavbarRoutes component
export const NavbarRoutes = () => {
    const {userId} = useAuth();
    const pathname = usePathname();
    const isTeacherUI = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchUI = pathname?.includes("/search");

    return ( 
        <>
         {/* Render SearchInput component if the current route is the search UI */}
          {isSearchUI && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
        <div className="flex gap-x-2 ml-auto">
           {/* Conditional rendering based on route and user authentication */}
            {isTeacherUI || isCoursePage ? (
                <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                </Link>
             ) : isTeacher(userId) ? (
               // Render "Welcome, Teacher!" button if user is a teacher
              <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                  Welcome, Teacher!
                </Button>
              </Link>
            ) : null}
             {/* Render UserButton component for user authentication */}
            <UserButton
              afterSignOutUrl="/"
            />
          </div>
        </>
      )
    }