"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCategoryStore } from "@/store";

interface Props {
   className?: string;
}

const categories = [
   { id: 1, name: "Пиццы" },
   { id: 2, name: "Комбо" },
   { id: 3, name: "Закуски" },
   { id: 4, name: "Коктейли" },
   { id: 5, name: "Кофе" },
   { id: 6, name: "Напитки" },
   { id: 7, name: "Десерты" },
   { id: 8, name: "Десерты" },
];

export const Categories: React.FC<Props> = ({ className }) => {
   const categoryActiveId = useCategoryStore((state) => state.activeId);
   return (
      <div
         className={cn(
            "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
            className
         )}
      >
         {categories.map((category) => (
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
