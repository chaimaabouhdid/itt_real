"use client";

import { CheckCircle, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Defining the props interface for the CourseSidebarItem component
interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

// Exporting the CourseSidebarItem component
export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  // Using useRouter hook to access Next.js router functionality
  const router = useRouter();
  // Determining the icon based on completion
  const Icon = isLocked ? PlayCircle : (isCompleted ? CheckCircle : PlayCircle);
  // Checking if the sidebar item is active based on the current pathname
  const isActive = pathname?.includes(id);
   // Function to handle click event on the sidebar item
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }
  // Rendering the sidebar item as a button element
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-slate-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      {/* Rendering the icon and label */}
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
       {/* Rendering a border indicator for the active item */}
      <div className={cn(
        "ml-auto opacity-0 border-2 border-slate-900 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-slate-700"
      )} />
    </button>
  )
}