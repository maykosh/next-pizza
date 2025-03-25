import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceProps {
   priceFrom?: number;
   priceTo?: number;
}

export interface Filters {
   selectedIngredients: Set<string>;
   priceFrom?: number;
   priceTo?: number;
   size: Set<string>;
   pizzaTypes: Set<string>;
}

export interface ReturnProps extends Filters {
   onChangePrice: (name: keyof PriceProps, value: number) => void;
   toggleIngredients: (id: string) => void;
   toggleSize: (id: string) => void;
   togglePizzaTypes: (id: string) => void;
   setPrice: React.Dispatch<React.SetStateAction<PriceProps>>;
}

export const useFilter = (): ReturnProps => {
   const searchParams = useSearchParams();

   /*фильтер  ингредиентов */
   const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
      new Set<string>(searchParams.get("ingredients")?.split(",") || [])
   );

   /* фильтр цены */
   const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
      priceFrom: Number(searchParams.get("priceFrom")) || 0,
      priceTo: Number(searchParams.get("priceTo")) || 1000,
   });

   /* фильтр размер */
   const [size, { toggle: toggleSize }] = useSet(
      new Set<string>(searchParams.get("sizes")?.split(",") || [])
   );

   /* фильтр тип */
   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
      new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
   );

   const onChangePrice = (name: keyof PriceProps, value: number) => {
      setPrice((prev) => ({ ...prev, [name]: value }));
   };

   return {
      selectedIngredients,
      toggleIngredients,
      priceFrom,
      priceTo,
      size,
      toggleSize,
      pizzaTypes,
      togglePizzaTypes,
      onChangePrice,
      setPrice,
   };
};
