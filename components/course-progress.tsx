import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Define props interface for CourseProgress component
interface CourseProgressProps {
  value: number;
  variant?: "default" | "success",
  size?: "default" | "sm";
};

// Define colors based on variant
const colorByVariant = {
  default: "text-slake-700",
  success: "text-emerald-700",
}

// Define sizes based on variant
const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

// Define CourseProgress component
export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
       {/* Render Progress component with specified props */}
      <Progress
        className="h-2"
        value={value}
        variant={variant}
      />
       {/* Render text indicating completion percentage */}
      <p className={cn(
        "font-medium mt-2 text-slake-700",
        colorByVariant[variant || "default"],
        sizeByVariant[size || "default"],
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}