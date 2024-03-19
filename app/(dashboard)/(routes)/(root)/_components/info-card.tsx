import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge"

// Define the props interface for InfoCard component
interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

// Define the InfoCard functional component
export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {

  return (
    // Render a styled card with border, rounded corners, and flex layout
    <div className="border rounded-md flex items-center gap-x-2 p-3">
       {/* Render the IconBadge component to display the icon with badge */}
      <IconBadge 
      variant={variant} 
      icon={Icon}
      />
      {/* Display label and number of items */}
      <div>
         {/* Render the label */}
        <p className="font-medium">
          {label}
        </p>
         {/* Display the number of items with appropriate pluralization */}
        <p className="text-gray-500 text-sm">
           {/* Conditionally render "Course" or "Courses" based on the count */}
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}