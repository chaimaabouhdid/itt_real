import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";

// Define the props interface for SearchPage component
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

// Define the SearchPage functional component
const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  // Retrieve the authenticated user's ID
  const { userId } = auth();

  // Redirect to the home page if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Retrieve categories from the database
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  // Retrieve courses based on the search parameters
  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
    {/* Render the search input component */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      {/* Render categories and courses list */}
      <div className="p-6 space-y-4">
         {/* Render the categories component */}
        <Categories
          items={categories}
        />
          {/* Render the courses list component */}
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;