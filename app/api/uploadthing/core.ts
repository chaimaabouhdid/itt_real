import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
// Create an instance of Uploadthing
const f = createUploadthing();
 
// Function to handle authentication and authorization
const handleAuth = () => {
   // Get the userId from authentication
  const { userId } = auth();
  // Check if the user is authorized (in my case, if they are a teacher)
  const isAuthorized = isTeacher(userId);

   // If userId is not present or user is not authorized, throw an error
  if (!userId || !isAuthorized) throw new Error("Unauthorized!");
   // If authorized, return userId
  return { userId };
}

// Define the file router configuration
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
     // Define a route for uploading various types of course attachments
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
     // Define a route for uploading chapter videos
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
// Define a type for ourFileRouter
export type OurFileRouter = typeof ourFileRouter;