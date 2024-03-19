import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

//Handler function for PATCH requests to publish a course.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
     // Authenticate user
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the course to be published
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

     // If course not found, return 404 Not Found
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Check if all required fields are present and at least one chapter is published
    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    // Update the course's publication status to true
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    // Return JSON response indicating successful course publication
    return NextResponse.json(publishedCourse);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}