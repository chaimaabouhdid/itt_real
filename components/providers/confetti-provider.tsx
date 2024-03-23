"use client";

import ReactConfetti from "react-confetti";
import { useConfettiStore } from "@/hooks/use-confetti-store";

// Define the ConfettiProvider component
export const ConfettiProvider = () => {
  // Get the confetti state from the useConfettiStore hook
  const confetti = useConfettiStore();

  // If confetti is not open, return null
  if (!confetti.isOpen) return null;

  // Render the ReactConfetti component with specified props when confetti is open
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  )
}