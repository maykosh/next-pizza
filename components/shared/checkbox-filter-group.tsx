"use client";
import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";

type Item = FilterChecboxProps;

interface Props {
   title: string;
   items: Item[];
   defaultItems: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   className?: string;
   onChange?: (values: string[]) => void;
   defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
   title,
   items,
   defaultItems,
   limit = 5,
   searchInputPlaceholder = "Поиск...",
   className,
   onChange,
   defaultValue,
}) => {
   const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
   const [showAll, setShowAll] = React.useState(false);
   const [searchValue, setSearchValue] = React.useState("");

   const list = showAll
      ? items.filter((item) =>
           item.text
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        )
      : defaultItems.slice(0, limit);

   const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
   };

   return (
      <div className={className}>
         <p className="font-bold mb-3">{title}</p>

         <div className="mb-5">
            <Input
               value={searchValue}
               onChange={onChangeSearchValue}
               placeholder={searchInputPlaceholder}
               className="bg-gray-50  border-none"
            />
         </div>

         <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, i) => (
               <FilterCheckbox
                  key={i}
                  text={item.text}
                  value={item.value}
                  endAdornment={item.endAdornment}
                  checked={false}
                  onCheckedChange={(idx) => console.log(idx)}
               />
            ))}
         </div>
         {items.length > limit && (
            <div
               className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}
            >
               <button
                  className={"text-sm text-primary mt-4"}
                  onClick={() => setShowAll(!showAll)}
               >
                  {showAll ? "Скрыть" : "Показать все"}
               </button>
            </div>
         )}
      </div>
   );
};
