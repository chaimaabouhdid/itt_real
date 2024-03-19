"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Define props interface for ChaptersList component
interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};

// Define the ChaptersList component
export const ChaptersList = ({
  items,
  onReorder,
  onEdit
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

   // Effect to set component mount status
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to update chapters when items prop changes
  useEffect(() => {
    setChapters(items);
  }, [items]);

  // Function to handle drag-and-drop end event
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

     // Clone the chapters array
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Calculate start and end indices for bulk update
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    // Update local state with reordered chapters
    setChapters(items);

     // Prepare data for bulk update
    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    // Invoke onReorder callback with bulk update data
    onReorder(bulkUpdateData);
  }

  // Return null if component is not mounted yet
  if (!isMounted) {
    return null;
  }

  // Return the drag-and-drop context
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Define a droppable area with ID "chapters" */}
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
             {/* Map through chapters and render each as a draggable item */}
            {chapters.map((chapter, index) => (
              <Draggable 
              // Define a draggable item with a unique key and draggable ID
                key={chapter.id} 
                draggableId={chapter.id} 
                index={index}
              >
                {(provided) => (
                  // Render the draggable item, provided props, and inner reference
                  <div
                  // Apply conditional styling based on chapter state
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-emerald-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-slate-700"
                    )}
                      // Attach inner reference for the draggable item
                    ref={provided.innerRef}
                    // Attach draggable props to handle dragging behavior
                    {...provided.draggableProps}
                  >
                    {/* Define a handle for dragging the item */}
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                       {/* Render the grip icon for dragging */}
                      <Grip
                        className="h-5 w-5"
                      />
                    </div>
                    {/* Render the title of the chapter */}
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {/* Render a badge for indicating if the chapter is free */}
                      {chapter.isFree && (
                        <Badge>
                          Free
                        </Badge>
                      )}
                      {/* Render a badge for indicating if the chapter is published or draft */}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-emerald-700"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {/* Render an edit icon for editing the chapter */}
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
             {/* Render a placeholder for the droppable area */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}