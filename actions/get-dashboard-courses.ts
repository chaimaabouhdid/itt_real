import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

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
      const progress = await getProgress(userId, course.id);
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

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
