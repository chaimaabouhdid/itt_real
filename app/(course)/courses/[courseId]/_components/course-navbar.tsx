import { Chapter, Course, UserProgress } from "@prisma/client"
import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

// Defining the props interface for the CourseNavbar component
interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

// Exporting the CourseNavbar component
export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    // Rendering the container for the course navbar
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />      
    </div>
  )
}