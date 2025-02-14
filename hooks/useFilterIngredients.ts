"use client";
import { API } from "@/services/api-client";
import React from "react";
import { useSet } from "react-use";

type IngredientItem = {
   text: string;
   value: string;
};

interface ReturnProps {
   ingredients: IngredientItem[];
   loading: boolean;
   selectedIds: Set<string>;
   onToggle: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
   const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
   const [loading, setLoading] = React.useState(false);
   const [selectedIds, { toggle }] = useSet(new Set<string>([]));

   React.useEffect(() => {
      async function getIngredients() {
         try {
            setLoading(true);

            const ingredients = await API.ingredients.getIngredients();

            setIngredients(
               ingredients.map((ingredient) => ({
                  value: ingredient.id.toString(),
                  text: ingredient.name,
               }))
            );
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      }

      getIngredients();
   }, []);

   return { ingredients, loading, onToggle: toggle, selectedIds };
};
