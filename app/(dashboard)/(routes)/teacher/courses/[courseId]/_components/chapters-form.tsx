"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
};

// Define the schema for the chapter form
const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({
  initialData,
  courseId
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Toggle state for chapter creation
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const router = useRouter();

 // Initialize form for chapter creation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

   // Handle chapter submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
       // Send POST request to create a new chapter
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created Successfully!");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  // Handle chapter reordering
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      // Send PUT request to update chapter order
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      });
      toast.success("Chapters Reordered Successfully!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  }

  // Redirect to edit chapter page
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {/* Show loading indicator while updating chapters */}
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <MoreHorizontal className="animate-spin h-6 w-6 text-emerald-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
          {/* Button to toggle chapter creation */}
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
       {/* Form for creating a new chapter */}
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Chapter 1: Introduction.'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {/* Submit button for creating a new chapter */}
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {/* List of existing chapters */}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
           {/* Show message if there are no chapters */}
          {!initialData.chapters.length && "No chapters"}
           {/* Render the chapters list component */}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
        {/* Instruction for reordering chapters */}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters in your course.
        </p>
      )}
    </div>
  )
}