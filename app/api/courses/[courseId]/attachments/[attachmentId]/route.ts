import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Check if the authenticated user owns the course
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    // Return unauthorized response if the user is not the owner of the course
    if (!courseOwner) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Delete the attachment associated with the course
    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      }
    });

    // Return JSON response indicating successful deletion
    return NextResponse.json(attachment);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
