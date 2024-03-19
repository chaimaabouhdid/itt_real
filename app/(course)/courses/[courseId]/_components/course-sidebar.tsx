import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";

// Defining the props interface for the CourseSidebar component
interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

// Exporting the CourseSidebar component as an asynchronous function
export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  // Extracting the userId from the authenticated user
  const { userId } = auth();
// If the user is not authenticated, redirect to the home page
  if (!userId) {
    return redirect("/");
  }
// Rendering the course sidebar
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        <div className="mt-10">
           {/* Rendering the CourseProgress component */}
          <CourseProgress variant="success" value={progressCount} />
        </div>
      </div>
      <div className="flex flex-col w-full">
         {/* Mapping over chapters to render CourseSidebarItem for each chapter */}
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
             // Checking if the chapter is completed based on user progress
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={chapter.isFree}
          />
        ))}
      </div>
    </div>
  );
};
