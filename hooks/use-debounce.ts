import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?:number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
     // Set a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 500);

    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
};