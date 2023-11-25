import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return ( 
        <div className="p-6">
            <Link href="/teacher/createCourse">
            <Button
            className="bg-emerald-700 text-white"
            >
                New Course
            </Button>
            </Link>
        </div>
     );
}
export default CoursesPage;