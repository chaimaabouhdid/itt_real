"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  courseId,
  isPublished
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the publish/unpublish action
  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
         // Unpublish the course
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        // Publish the course
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        // Show confetti animation for publishing
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  
  // Function to handle the delete action
  const onDelete = async () => {
    try {
      setIsLoading(true);

      // Delete the course
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted Successfully!");
      // Refresh the page after deletion
      router.refresh();
      // Redirect to the courses page
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Published courses cannot be deleted. Unpublish the course first!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {/* Button to publish/unpublish the course */}
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
       {/* Button to confirm deletion of the course */}
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}