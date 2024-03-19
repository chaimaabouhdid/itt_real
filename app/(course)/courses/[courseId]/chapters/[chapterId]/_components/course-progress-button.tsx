"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";


// Defining the props interface for the CourseProgressButton component
interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  // ID of the next chapter
  nextChapterId?: string;
};


// Exporting the CourseProgressButton component
export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  // Using useRouter hook to access Next.js router functionality
  const router = useRouter();
  // Using useConfettiStore hook to access confetti functionality
  const confetti = useConfettiStore();
  // Using useState hook to manage loading state
  const [isLoading, setIsLoading] = useState(false);

   // Function to handle click event on the progress button
  const onClick = async () => {
    try {
      setIsLoading(true);

       // Updating chapter progress using an HTTP PUT request
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      // If chapter is marked as completed and there's no next chapter, trigger confetti
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

       // If chapter is marked as completed and there's a next chapter, navigate to it
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      // Showing success toast notification
      toast.success("Progress Updated Successfully!");
      // Refreshing the router to update UI
      router.refresh();
    } catch {
      // Showing error toast notification if an error occurs
      toast.error("Something went wrong!!!");
    } finally {
      // Setting loading state to false after completion
      setIsLoading(false);
    }
  }

  // Determining the icon based on completion status
  const Icon = isCompleted ? XCircle : CheckCircle

  // Rendering the progress button
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {/* Displaying button label based on completion status */}
      {isCompleted ? "Not completed" : "Mark as completed"}
      {/* Rendering the icon */}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}