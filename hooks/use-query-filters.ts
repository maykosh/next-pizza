import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
   const router = useRouter();
   
   React.useEffect(() => {
      const params = {
         priceFrom: filters.priceFrom,
         priceTo: filters.priceTo,
         pizzaTypes: Array.from(filters.pizzaTypes),
         sizes: Array.from(filters.size),
         ingredients: Array.from(filters.selectedIngredients),
      };
      const query = qs.stringify(params, { arrayFormat: "comma" });
      router.push(`?${query}`, { scroll: false });
   }, [         
      filters.pizzaTypes,
      filters.priceFrom,
      filters.priceTo,
      filters.selectedIngredients,
      filters.size,
      router,
   ]);
};
