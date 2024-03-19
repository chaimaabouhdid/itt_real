import { db } from "@/lib/db";

// Defining the structure of the input parameters for the getChapter function
interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
  }
  
  // Exporting an asynchronous function named getChapter which retrieves chapter-related data based on provided parameters
  export const getChapter = async ({
    userId,
    courseId,
    chapterId,
  }: GetChapterProps) => {
    try {

    // Retrieving information about the course with the provided courseId from the database
        const course = await db.course.findUnique({
        where: {
          isPublished: true,
          id: courseId,
        },
      });

      // Retrieving information about the chapter with the provided chapterId
      const chapter = await db.chapter.findUnique({
        where: {
          id: chapterId,
          isPublished: true,
        },
      });

  // If chapter or course is not found, throw an error
      if (!chapter || !course) {
        throw new Error("Chapter or course not found");
      }

  // Retrieving Mux data associated with the chapter
      const muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });
  
      // Retrieving attachments associated with the course
      const attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
  
      // Retrieving information about the next chapter in the course
      const nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
  
       // Retrieving user progress for the current chapter
      const userProgress = await db.userProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
      });
  
      // Returning the retrieved data
      return {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
      };
    } catch (error) {
      // If an error occurs during the process, log it and return null values
      console.log("[GET_CHAPTER]", error);
      return {
        chapter: null,
        course: null,
        muxData: null,
        attachments: [],
        nextChapter: null,
        userProgress: null,
      };
    }
  };
  