import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handler function for POST requests to add an attachment to a course
export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();

     // Extract the URL of the attachment from the request body
    const { url } = await req.json();

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

    // Create a new attachment with the provided URL, attachment name, and courseId
    const attachment = await db.attachment.create({
      data: {
        url,
        // Extract the name from the URL
        name: url.split("/").pop(),
        courseId: params.courseId,
      }
    });
 // Return success response with the created attachment
    return NextResponse.json(attachment);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}