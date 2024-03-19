import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Hourglass } from "lucide-react";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";

// Define the Dashboard component as an asynchronous function
export default async function Dashboard() {
   // Get the user ID using Clerk auth
  const { userId } = auth();

   // Redirect to the home page if the user is not logged in
  if (!userId) {
    return redirect("/");
  }

  // Fetch dashboard courses for the logged-in user
  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

   // Render the dashboard UI
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         {/* Render info cards for in-progress and completed courses */}
       <InfoCard
          icon={Hourglass}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
        {/* Render the list of courses */}
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}