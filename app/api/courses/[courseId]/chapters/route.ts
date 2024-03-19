import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handler function for POST requests to create a new chapter in a course
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
     // Authenticate user
    const { userId } = auth();

    const { title } = await req.json();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Find the course owner
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    // If the course owner is not found, return 401 Unauthorized
    if (!courseOwner) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Find the last chapter in the course to determine the position of the new chapter
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    // Calculate the position of the new chapter
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

     // Create a new chapter with the provided title and courseId, and assign the calculated position
    const chapter = await db.chapter.create({
      data: {
        // Extract the title from the request body
        title,
        courseId: params.courseId,
        position: newPosition,
      }
    });

    // Return success response with the created chapter
    return NextResponse.json(chapter);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}