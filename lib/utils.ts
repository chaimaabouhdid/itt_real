import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
   // Merge class names using clsx to ensure compatibility with various input formats
  return twMerge(clsx(inputs))
}
