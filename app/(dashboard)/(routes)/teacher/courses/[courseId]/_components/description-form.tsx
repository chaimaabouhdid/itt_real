"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// Define props interface for DescriptionForm component
interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
};

// Define form schema for validation using Zod
const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required!",
  }),
});

// Define the DescriptionForm component
export const DescriptionForm = ({
  initialData,
  courseId
}: DescriptionFormProps) => {
  // State to track whether the form is in editing mode or not
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle the editing mode
  const toggleEdit = () => setIsEditing((current) => !current);

  // Router instance for navigation
  const router = useRouter();

  // Form hook to manage form state and validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    },
  });

  // Destructuring form state variables
  const { isSubmitting, isValid } = form.formState;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send a PATCH request to update the course description
      await axios.patch(`/api/courses/${courseId}`, values);
      // Show success toast
      toast.success("Updated Successfully!");
      // Exit editing mode
      toggleEdit();
      // Refresh the page
      router.refresh();
    } catch {
      // Show error toast if something goes wrong
      toast.error("Something went wrong!");
    }
  }

  // Render the component JSX
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description
          {/* Button to toggle editing mode */}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
       {/* Render the description text or placeholder */}
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.description && "text-slate-500"
        )}>
          {initialData.description || "No description"}
        </p>
      )}
       {/* Render the form for editing description */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     {/* Textarea input for description */}
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course covers...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                {/* Button to submit the form */}
              <Button
              className="bg-emerald-700 text-white"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}