"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the props interface for the TitleForm component
interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
};

// Define a schema for form validation using zod
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
});

// Define the TitleForm component
export const TitleForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  // State to track whether the form is in editing mode or not
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle the editing mode
  const toggleEdit = () => setIsEditing((current) => !current);

  // Router instance for navigation
  const router = useRouter();

  // React hook form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

   // Destructuring form state
  const { isSubmitting, isValid } = form.formState;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send a PATCH request to update the course title
      await axios.patch(`/api/courses/${courseId}`, values);
       // Show success toast
      toast.success("Updated Successfully!");
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
        Title
         {/* Button to toggle editing mode */}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
        {/* Render title if not in editing mode */}
      {!isEditing && (
        <p className="text-sm mt-2" >
          {initialData.title}
        </p>
      )}
       {/* Render form if in editing mode */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Form field for editing title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Team Work' "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           {/* Button to save changes */}
            <div className="flex items-center gap-x-2">
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