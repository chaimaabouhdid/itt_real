"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

// Define the props interface for the Preview component
interface PreviewProps {
  value: string;
};

// Define the Preview component
export const Preview = ({
  value,
}: PreviewProps) => {
 // Dynamically load the ReactQuill component, excluding it from server-side rendering
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    // Render the ReactQuill component with the bubble theme
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  );
};