"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filter-group";
import { useFilter, useIngredients, useQueryFilters } from "@/shared/hooks";

interface Props {
   className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading } = useIngredients();
   const filters = useFilter();
   useQueryFilters(filters);
   // const searchParams = useSearchParams()
   // const { ingredients, loading, onToggle, selectedIds } = useFilterIngredients(
   //    searchParams.get("ingredients")?.split(",") || []
   // );
   // const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
   //    priceFrom: Number(searchParams.get("priceFrom")) || 0,
   //    priceTo: Number(searchParams.get("priceTo")) || 1000,
   // });
   // const [size, { toggle: toggleSize }] = useSet(new Set<string>(searchParams.get("sizes")?.split(",") || []));
   // const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet( new Set<string>(searchParams.get("pizzaTypes")?.split(",") || []) );

   // const onChangePrice = (name: keyof PriceProps, value: number) => {
   //    setPrice((prev) => ({ ...prev, [name]: value }));
   // };

   return (
      <div className={cn(className)}>
         <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

         <CheckboxFiltersGroup
            title="Тип теста"
            name="pizzaTypes"
            className="mb-5"
            onClickCheckbox={filters.togglePizzaTypes}
            selected={filters.pizzaTypes}
            items={[
               { text: "Тонкое", value: "1" },
               { text: "Традиционное", value: "2" },
            ]}
         />
         <CheckboxFiltersGroup
            title="Размеры"
            name="sizes"
            className="mb-5"
            onClickCheckbox={filters.toggleSize}
            selected={filters.size}
            items={[
               { text: "20 см", value: "20" },
               { text: "30 см", value: "30" },
               { text: "40 см", value: "40" },
            ]}
         />

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
               <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={1000}
                  value={String(filters.priceFrom)}
                  onChange={(e) =>
                     filters.onChangePrice("priceFrom", Number(e.target.value))
                  }
               />
               <Input
                  type="number"
                  min={100}
                  max={1000}
                  placeholder="1000"
                  value={String(filters.priceTo)}
                  onChange={(e) =>
                     filters.onChangePrice("priceTo", Number(e.target.value))
                  }
               />
            </div>
            <RangeSlider
               min={0}
               max={1000}
               step={10}
               value={[filters.priceFrom || 0, filters.priceTo || 1000]}
               onValueChange={([from, to]) =>
                  filters.setPrice({ priceFrom: from, priceTo: to })
               }
            />
         </div>

         <CheckboxFiltersGroup
            title={"Ингредиенты"}
            className="mt-5"
            limit={6}
            items={ingredients}
            defaultItems={ingredients.slice(0, 6)}
            loading={loading}
            onClickCheckbox={filters.toggleIngredients}
            selected={filters.selectedIngredients}
            name={"ingredients"}
         />
      </div>
   );
};
