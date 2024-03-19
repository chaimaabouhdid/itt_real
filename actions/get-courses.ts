import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

// Defining a custom type combining Course, Category, and progress-related data
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

// Defining the structure of the input parameters for the getCourses function
type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

// Exporting an asynchronous function named getCourses which retrieves courses with associated progress and category data based on provided parameters
  export const getCourses = async ({
    userId,
    title,
    categoryId
  }: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
      // Retrieving courses from the database with specified filters
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title
          },
          categoryId
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true
            },
            select: {
              id: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
  
       // Fetching progress data for each course asynchronously
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          // Retrieving progress percentage for the current user and course
          const progressPercentage = await getProgress(userId, course.id);
          
          // Returning course data along with progress percentage
          return {
            ...course,
            // Adding progress data to the course object
            progress: progressPercentage
          };
        })
      );
      // Returning courses with associated progress data
      return coursesWithProgress; 
  } catch (error) {
    // If an error occurs during the process, log it and return an empty array
    console.log("[GET_COURSES]", error);
    return [];
  }
}