import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

// Define the CourseLayout component
const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  // Retrieve the user ID from authentication
  const { userId } = auth();

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/")
  }

  // Fetch course details including chapters and user progress
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  // Redirect to the homepage if the course is not found
  if (!course) {
    return redirect("/");
  }

  // Calculate overall progress for the course
  const progressCount = await getProgress(userId, course.id);

  // Render the CourseLayout component
  return (
    <div className="h-full">
      {/* Course Navbar */}
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
       {/* Course Sidebar (visible only on larger screens) */}
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      {/* Main content area */}
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout