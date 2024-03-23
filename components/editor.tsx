"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

// Define prop types for Editor component
interface EditorProps {
  // Function to handle editor content changes
  onChange: (value: string) => void;
  value: string;
};

// Define Editor component
export const Editor = ({
  onChange,
  value,
}: EditorProps) => {
  // Dynamically load ReactQuill component
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <div className="bg-white">
       {/* Render ReactQuill component */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};