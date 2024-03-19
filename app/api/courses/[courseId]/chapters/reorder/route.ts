import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

//Handler function for PUT requests to reorder chapters in a course.
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
     // Authenticate user
    const { userId } = auth();

     // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Extract the new order of chapters from the request body
    const { list } = await req.json();

    // Find the course owned by the user
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    // If course not found, return 401 Unauthorized
    if (!ownCourse) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Update the position of each chapter according to the new order
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

     // Return success response
    return new NextResponse("Success!", { status: 200 });
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error!", { status: 500 }); 
  }
}