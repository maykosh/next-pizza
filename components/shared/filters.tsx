"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
   className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading,onToggle,selectedIds } = useFilterIngredients();
   
   return (
      <div className={cn(className)}>
         <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

         <div className="flex flex-col gap-4">
            <FilterCheckbox text="Можно собирать" value="1" name={"традиционное"} />
            <FilterCheckbox text="Новинки" value="2" name={"тонкое"} />
         </div>

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
               <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={1000}
                  defaultValue={0}
               />
               <Input type="number" min={100} max={1000} placeholder="1000" />
            </div>
            <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
         </div>

         <CheckboxFiltersGroup
            title={"Ингредиенты"}
            className="mt-5"
            limit={6}
            items={ingredients}
            defaultItems={ingredients.slice(0, 6)}
            loading={loading}
            onClickCheckbox={onToggle}
            selectedIds={selectedIds}
            name={"ingredients"}
         />
      </div>
   );
};
