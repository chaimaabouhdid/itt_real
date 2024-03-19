"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

// Define props interface for ImageForm component
interface ImageFormProps {
  initialData: Course
  courseId: string;
};

// Define form schema for validation using zod
const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required!",
  }),
});

// Define the ImageForm component
export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  // State to track whether the form is in editing mode or not
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle the editing mode
  const toggleEdit = () => setIsEditing((current) => !current);

  // Router instance for navigation
  const router = useRouter();

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send a PATCH request to update the course image URL
      await axios.patch(`/api/courses/${courseId}`, values);
      // Show success toast
      toast.success("Uploaded Successfully!");
      // Exit editing mode
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

   // Render the component JSX
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Image
         {/* Button to toggle editing mode */}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {/* Render the image or icon based on editing mode and existence of image URL */}
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {/* Render the file upload component if in editing mode */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}