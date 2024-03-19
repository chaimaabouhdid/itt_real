import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handler function for PUT requests to update user progress on a chapter
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
     // Authenticate user
    const { userId } = auth();

    // Extract isCompleted value from request body
    const { isCompleted } = await req.json();

     // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    } 

    // Upsert user progress for the chapter
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      }
    })

     // Return success response with the updated user progress
    return NextResponse.json(userProgress);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}