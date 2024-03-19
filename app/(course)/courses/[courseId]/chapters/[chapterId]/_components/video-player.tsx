"use client";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

// Defining the props interface for the VideoPlayer component
interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  completeOnEnd: boolean;
  title: string;
  isLocked: boolean;
  isCompleted: boolean;
}

// Exporting the VideoPlayer component
export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  completeOnEnd,
  title,
  isCompleted,
}: VideoPlayerProps) => {
  // State to track if the video player is ready
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onEnd = async () => {
    try {
      setIsLoading(true);

      // Update chapter progress
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

       // Trigger confetti if chapter is completed and there's no next chapter
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      // Navigate to next chapter if available
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      // Show success toast notification
      toast.success("Progress Updated Successfully!");
      // Refresh router to update UI
      router.refresh();
    } catch {
      // Show error toast notification if an error occurs
      toast.error("Something went wrong!!!");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  }

// Rendering the video player component
  return (
    <div className="relative aspect-video">
       {/* Loading spinner while video player is not ready */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {/* MuxPlayer component for rendering the video */}
      <MuxPlayer
        title={title}
        className={cn(
          // Conditional class name to hide player if not ready
          !isReady && "hidden"
        )}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnd}
        autoPlay
        playbackId={playbackId}
      />
    </div>
  )
}
