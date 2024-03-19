import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handler function for PATCH requests to unpublish a course
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

    // Find the course owned by the user
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

     // If course not found, return 404 Not Found
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

     // Update the course to set isPublished to false
    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      }
    });

     // Return success response with the updated course
    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}