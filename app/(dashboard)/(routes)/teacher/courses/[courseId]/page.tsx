import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListOrdered, Paperclip, PoundSterling, Settings2 } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";



const CourseIdPage = async ({
    params
  }: {
    params: { courseId: string }
  }) => {
    const { userId } = auth();
  
    // Redirect to the home page if the user is not authenticated
    if (!userId) {
      return redirect("/");
    }
  
    // Fetch the course details from the database
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    
     // Fetch all available categories
    const categories = await db.category.findMany({
        orderBy: {
          name: "asc",
        },
      });
    
      // Redirect to the home page if the course is not found
      if (!course) {
        return redirect("/");
      }
    
      // Calculate completion status and fields count
      const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
      ];
    
      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;
    
      const completionText = `(${completedFields}/${totalFields})`;
    
      const isComplete = requiredFields.every(Boolean);

   return (
    <>
     {/* Display a warning banner if the course is unpublished */}
        {!course.isPublished && (
        <Banner
          label="This course is unpublished! It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Course Creation
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
                </div>
                {/* Component for course actions (publish, unpublish, delete) */}
                <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Settings2}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                     {/* Form for updating course title */}
                    <TitleForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                    {/* Form for updating course description */}
                    <DescriptionForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                     {/* Form for updating course image */}
                    <ImageForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                     {/* Form for updating course category */}
                    <CategoryForm
                    initialData={course}
                    courseId={course.id}
                    options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                    }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListOrdered} />
                            <h2 className="text-xl">
                            Chapters
                            </h2>
                        </div>
                         {/* Form for managing course chapters */}
                        <ChaptersForm
                        initialData = {course}
                        courseId = {course.id}
                        />
                    </div>
                    
                    <div>
                    <div className="flex items-center gap-x-2">
                            <IconBadge icon={Paperclip} />
                            <h2 className="text-xl">
                                Materials & Attachments
                            </h2>
                        </div>
                         {/* Form for managing course attachments */}
                        <AttachmentForm
                         initialData = {course}
                         courseId = {course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;