import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card";

// Define type for CourseWithProgressWithCategory, which extends Course type with category, chapters, and progress properties
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

// Define props interface for CoursesList component
interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

// Define CoursesList component
export const CoursesList = ({
  items
}: CoursesListProps) => {
  return (
    <div>
      {/* Render grid layout for course cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {/* Map through each course item and render CourseCard component */}
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
        {/* Render message if no courses are found */}
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}