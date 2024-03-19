import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Initialize Mux Video API client
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

//Handler function for DELETE requests to delete a chapter from a course.
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();

     // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

     // Find the course owned by the user
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    // If course not found, return 401 Unauthorized
    if (!ownCourse) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

     // Find the chapter to be deleted
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    // If chapter not found, return 404 Not Found
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

     // If the chapter has a video, delete the associated Mux data
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }
    }

    // Delete the chapter from the database
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });

    // Check if there are any published chapters left in the course
    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    // If no published chapters left, update course's published status to false
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    // Return success response with the deleted chapter
    return NextResponse.json(deletedChapter);
  } catch (error) {
    // Log the error and return internal server error response
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//Handler function for PATCH requests to update a chapter in a course.
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();

    // Extract chapter values from request body
    const { isPublished, ...values } = await req.json();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

     // Find the course owned by the user
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    // If course not found, return 401 Unauthorized
    if (!ownCourse) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    // Update the chapter in the database
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      }
    });

     // If the chapter has a video, update Mux data
    if (values.videoUrl) {
      // Delete existing Mux data if it exists
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }

      // Create new Mux asset and associate it with the chapter
      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      });
    }

    // Return success response with the updated chapter
    return NextResponse.json(chapter);
  } catch (error) {
     // Log the error and return internal server error response
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error!", { status: 500 }); 
  }
}