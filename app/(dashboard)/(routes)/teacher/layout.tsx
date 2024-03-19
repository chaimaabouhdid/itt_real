import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Define the TeacherLayout functional component
const TeacherLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // Get the user ID from authentication
  const { userId } = auth();

  // Check if the user is a teacher
  if (!isTeacher(userId)) {
    // If not a teacher, redirect to the homepage
    return redirect("/");
  }
  
  // If the user is a teacher, render the children components
  return <>{children}</>
}
 
export default TeacherLayout;