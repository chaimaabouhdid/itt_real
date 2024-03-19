import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
  req: Request,
) {
  try {
     // Authenticate user
    const { userId } = auth();
    // Retrieve course title from request body
    const { title } = await req.json();

    // Check if user is authenticated and is a teacher
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Create a new course in the database
    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    // Return JSON response indicating successful course creation
    return NextResponse.json(course);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}