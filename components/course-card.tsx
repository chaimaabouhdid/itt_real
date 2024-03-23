import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";

// Define props interface for CourseCard component
interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  category: string;
};

// Define CourseCard component
export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  category
}: CourseCardProps) => {
  return (
    // Link to the course detail page
    <Link href={`/courses/${id}`}>
       {/* Container for the course card */}
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        {/* Container for the course image */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
           {/* Display the course image */}
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
         {/* Container for course information */}
        <div className="flex flex-col pt-2">
           {/* Display the course title */}
          <div className="text-lg md:text-base font-medium group-hover:text-emerald-700 transition line-clamp-2">
            {title}
          </div>
           {/* Display the course category */}
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          {/* Display the number of chapters in the course */}
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
               {/* Display the BookOpen icon */}
               <IconBadge size="sm" icon={BookOpen} />
              {/* Display the number of chapters */}
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
           {/* Display the course progress */}
          {progress !== null ? (
  <CourseProgress
    variant={progress === 100 ? "success" : "default"}
    size="sm"
    value={progress}
  />
) : (
  <p className="text-md md:text-sm font-medium text-slate-700">
    No progress available
  </p>
)}
        </div>
      </div>
    </Link>
  )
}