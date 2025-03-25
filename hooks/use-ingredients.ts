import React from "react";
import { API } from "@/services/api-client";
type IngredientItem = {
   text: string;
   value: string;
};

export const useIngredients = () => {
   const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
   const [loading, setLoading] = React.useState(false);

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

   return { ingredients, loading };
};
