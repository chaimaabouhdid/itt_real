import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";

// Define the ChapterIdPage component
const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  // Retrieve the user ID from authentication
  const { userId } = auth();
  
  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  } 

  // Fetch chapter details, course details, user progress, and other related data
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  // If chapter or course is not found, redirect to the homepage
  if (!chapter || !course) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree;

  // Determine if the chapter should be marked as completed on video end
  const completeOnEnd = !!!userProgress?.isCompleted;

  // Render the chapter page content
  return ( 
    <div>
      {/* Banner indicating chapter completion */}
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You have already completed this chapter 🎉"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
         {/* Video player component */}
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            isCompleted={!!userProgress?.isCompleted}
          />
        </div>
         {/* Chapter details */}
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
             {/* Chapter title */}
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {/* Course progress button */}
            {(
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            )}
          </div>
          <Separator />
          {/* Chapter description */}
          <div>
            <Preview value={chapter.description!} />
          </div>
          {/* Attachments */}
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-slate-200 border text-slate-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
   );
}
export default ChapterIdPage;