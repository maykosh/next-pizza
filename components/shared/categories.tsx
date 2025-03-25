"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCategoryStore } from "@/store";
import { Category } from "@prisma/client";

interface Props {
   items: Category[];
   className?: string;
}

export const Categories: React.FC<Props> = ({ className, items }) => {
   const categoryActiveId = useCategoryStore((state) => state.activeId);
   return (
      <div
         className={cn(
            "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
            className
         )}
      >
         {items.map((category) => (
            <Link
               key={category.id}
               className={cn(
                  "flex items-center font-bold h-11 rounded-2xl px-5",
                  categoryActiveId === category.id &&
                     "bg-white shadow-md shadow-gray-200 text-primary"
               )}
               href={`/#${category.name}`}
            >
               <button>{category.name}</button>
            </Link>
         ))}
      </div>
   );
};
