import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

// Define the CoursesPage component
const CoursesPage = async () => {
  // Retrieve the userId from the authentication context
  const { userId } = auth();

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Retrieve the courses associated with the authenticated user
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
       {/* Render the DataTable component with the retrieved courses */}
      <DataTable columns={columns} data={courses} />
    </div>
   );
}
 
export default CoursesPage;