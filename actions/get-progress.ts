import { db } from "@/lib/db";

// Exporting an asynchronous function named getProgress which calculates the progress percentage for a user in a specific course
export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    // Finding all published chapters associated with the course from the database
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      }
    });

    // Extracting IDs of published chapters
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

     // Counting the number of completed chapters for the user
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      }
    });

    // Calculating the progress percentage
    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    // If an error occurs during the process, log it and return 0 as progress
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}