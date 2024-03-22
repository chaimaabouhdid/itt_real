import { LucideIcon } from "lucide-react";
import { cva, type VariantProps }  from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define background variants using cva
const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-slate-100",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

// Define icon variants using cva
const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-emerald-700",
        success: "text-emerald-700",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

// Define prop types for background variants and icon variants
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

// Define props for IconBadge component
interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
};

// Define IconBadge component
export const IconBadge = ({
  icon: Icon,
  variant,
  size,
}: IconBadgeProps) => {
  return (
    // Render badge with background and icon
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  )
};