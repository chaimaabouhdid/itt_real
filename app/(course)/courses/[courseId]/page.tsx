import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Define the CourseIdPage component
const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  // Fetch course details including published chapters
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  // Redirect to the homepage if the course is not found
  if (!course) {
    return redirect("/");
  }
  // Redirect to the first chapter of the course
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;