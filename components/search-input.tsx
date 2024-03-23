"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

// Define the SearchInput component
export const SearchInput = () => {
  // State variable to store the search input value
  const [value, setValue] = useState("")

  // Debounced value of the search input
  const debouncedValue = useDebounce(value);

  // Get the search parameters from the URL
  const searchParams = useSearchParams();

  // Get the router object from Next.js
  const router = useRouter();

  // Get the current pathname from Next.js
  const pathname = usePathname();

  // Get the current category ID from the search parameters
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
   // Update the URL query parameters when the debounced value or category ID changes
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    // Navigate to the new URL
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])

  return (
    <div className="relative">
      <Search
      // Styling for the search icon
        className="h-4 w-4 absolute top-3 left-3 text-slate-600"
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        // Placeholder text for the input
        placeholder="Search for a course"
      />
    </div>
  )
}