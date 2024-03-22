"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// Define prop types for FileUpload component
interface FileUploadProps {
  // Function to handle file change
  onChange: (url?: string) => void;
  // Endpoint for file upload
  endpoint: keyof typeof ourFileRouter;
};

// Define FileUpload component
export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
     // Render UploadDropzone component with specified endpoint
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Call onChange function with uploaded file URL
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        // Display error message if upload fails
        toast.error(`${error?.message}`);
      }}
    />
  )
}