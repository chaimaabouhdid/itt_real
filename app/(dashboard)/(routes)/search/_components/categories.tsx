"use client";

import { Category } from "@prisma/client";
import {
  FcBusinessman,
  FcConferenceCall,
  FcVoicePresentation,
  FcClock,
  FcCollaboration,
  FcMindMap,
  FcPortraitMode ,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

// Define the props interface for Categories component
interface CategoriesProps {
  items: Category[];
}

// Define a mapping of category names to icon components
const iconMap: Record<Category["name"], IconType> = {
  "Communication Skills": FcVoicePresentation,
  "Leadership": FcBusinessman ,
  "Teamwork": FcCollaboration,
  "Problem-solving": FcPortraitMode ,
  "Time Management": FcClock,
  "Networking": FcConferenceCall ,
  "Emotional Intelligence": FcMindMap,
};

// Define the Categories functional component
export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
       {/* Iterate over each category item */}
      {items.map((item) => (
        // Render a CategoryItem component for each category
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}