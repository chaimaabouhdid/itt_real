"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormMessage,
    FormLabel,
    FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Define the form schema using Zod
const formSchema = z.object({
    title: z.string().min(1,{ 
        message: "Title is required!" 
    }),
});

// Define the CreateCoursePage functional component
const CreateCoursePage = () => {
    // Initialize the useRouter hook to access the Next.js router
    const router = useRouter();

    // Initialize the useForm hook with the form schema and default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

// Destructure values from the useForm hook
const { isSubmitting, isValid } = form.formState;

// Define the onSubmit function to handle form submission
const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Send a POST request to create a new course
    try{
        const response = await axios.post("/api/courses", values);
        // Redirect to the newly created course page
        router.push(`/teacher/courses/${response.data.id}`);
        // Display success toast message
        toast.success("Course Created Successfully!");
    } catch (error) {
        // Log the error and display error toast message
        console.log(error);
        toast.error("Something went wrong!");
    }
    // Log form values to console
    console.log(values);
}
    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center
        md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Create Course
                </h1>
                <p className="text-sm text-slate-600">
                What name would you prefer for your course? Rest assured, you have the option to modify it at a later time.
                </p>
                {/* Render the form */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        {/* Render the form fields */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled = {isSubmitting}
                                            placeholder="example. 'Leadership'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What subjects or topics will you cover in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                             {/* Render the Cancel button */}
                            <Link href ="/">
                                <Button
                                type="button"
                                variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                             {/* Render the Continue button */}
                            <Button
                            className="bg-emerald-700 text-white"
                            type="submit"
                            disabled={ !isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
export default CreateCoursePage;