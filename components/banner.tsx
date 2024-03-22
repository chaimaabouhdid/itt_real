import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define banner variants using cva function
const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

// Define props interface for Banner component
interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

// Map variant to corresponding icon
const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};


// Define Banner component
export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  // Get the corresponding icon for the variant
  const Icon = iconMap[variant || "warning"];

  return  (
    // Render the banner with the corresponding variant styles
    <div className={cn(bannerVariants({ variant }))}>
      {/* Render the icon */}
      <Icon className="h-4 w-4 mr-2" />
       {/* Render the label */}
      {label}
    </div>
  );
};