"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";
import { cn } from "@/lib/utils";

// Define the props interface for CategoryItem component
interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
};

// Define the CategoryItem functional component
export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
// Extract the current category ID and title from the search parameters
  const currentCategoryId = searchParams.get("categoryId");const currentTitle = searchParams.get("title");
// Check if the current category is selected
  const isSelected = currentCategoryId === value;

  // Function to handle click event on the category item
  const onClick = () => {
     // Construct the new URL based on the selected category
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });

    // Navigate to the new URL
    router.push(url);
  };

  return (
    // Render the category item button
    <button
      onClick={onClick}
      // Apply style to the category item based on the selection state
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-slate-700 transition",
        isSelected && "border-emerald-700 bg-slate-200/20 text-slate-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      {/* Render the category label */}
      <div className="truncate">
        {label}
      </div>
    </button>
  )
}