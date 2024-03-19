import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

// Defining a custom type combining Course, Category, and progress-related data
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
  progress: number | null;
};

// Defining a type to represent the structure of courses on the dashboard
type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

// Exporting an asynchronous function named getDashboardCourses which retrieves courses for the user's dashboard, categorized as completed and in-progress
export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    // Fetch all courses with categories and published chapters
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          }
        }
      }
    });

    // Initialize an array to store courses with progress
    const coursesWithProgress: CourseWithProgressWithCategory[] = [];

    // Calculate progress for each course
    for (const course of courses) {
       // Retrieving progress percentage for the current user and course
      const progress = await getProgress(userId, course.id);
      // Constructing a CourseWithProgressWithCategory object for the current course
      const courseWithProgress: CourseWithProgressWithCategory = {
        ...course,
        progress,
        category: course.category || null, // Handle null category
      };
      coursesWithProgress.push(courseWithProgress);
    }

    // Categorize courses into completed and in-progress, excluding courses with progress equal to 0
    const completedCourses = coursesWithProgress.filter((course) => course.progress === 100);
    const coursesInProgress = coursesWithProgress.filter((course) => course.progress !== 100 && course.progress !== 0);

    // Returning the categorized courses
    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    // If an error occurs during the process, log it and return empty arrays
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
