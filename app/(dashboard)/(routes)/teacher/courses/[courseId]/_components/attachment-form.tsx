"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, X, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

// Define the schema for the form validation
const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
   // State to track whether the form is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track the ID of the attachment being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Function to toggle the editing state of the form
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

   // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send POST request to add the attachment
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Updated Successfully!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      // Send DELETE request to remove the attachment
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted Successfully!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        {/* Display the attachments section header */}
      <div className="font-medium flex items-center justify-between">
        Attachments
         {/* Button to toggle attachment editing */}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
       {/* Display attachments if not editing */}
      {!isEditing && (
        <>
         {/* Display message if no attachments */}
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet. Click above to add one.
            </p>
          )}
           {/* Display attachments list */}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-slate-200 border-emerald-200 border text-slate-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                   {/* Display loading spinner while deleting attachment */}
                  {deletingId === attachment.id && (
                    <div>
                      <MoreHorizontal className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                    {/* Button to delete attachment */}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
       {/* Display attachment upload form if editing */}
      {isEditing && (
        <div>
           {/* File upload component */}
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
           {/* Instructional message for adding files */}
          <div className="text-xs text-muted-foreground mt-4">
            Add any files that you want to share with your students.
          </div>
        </div>
      )}
    </div>
  )
}