import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generating UploadButton, UploadDropzone, and Uploader components based on the OurFileRouter type
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();