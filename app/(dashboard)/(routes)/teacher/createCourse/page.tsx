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

const formSchema = z.object({
    title: z.string().min(1,{ 
        message: "Title is required!" 
    }),
});

const CreateCoursePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

const { isSubmitting, isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //this is to catch the error.
    try{
        const response = await axios.post("/api/courses", values);
        router.push(`/teacher/courses/${response.data.id}`);
        toast.success("Course created successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
    }
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
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
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
                            <Link href ="/">
                                <Button
                                type="button"
                                variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
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