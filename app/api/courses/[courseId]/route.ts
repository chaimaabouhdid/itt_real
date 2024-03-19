import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Initialize Mux instance
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

//Handler function for DELETE requests to delete a course.
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
     // Authenticate user
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

     // Find the course to be deleted
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
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
      return new NextResponse("Not found!", { status: 404 });
    }

     // Delete Mux assets associated with chapters
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

     // Delete the course from the database
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    // Return JSON response indicating successful course deletion
    return NextResponse.json(deletedCourse);
  } catch (error) {
     // Log the error and return internal server error response
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}

//Handler function for PATCH requests to update a course.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

     // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

     // Update the course in the database
    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values,
      }
    });

     // Return JSON response indicating successful course update
    return NextResponse.json(course);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}