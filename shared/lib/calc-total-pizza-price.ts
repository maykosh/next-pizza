import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

interface IProps {
   selectedIngredients: Set<number>;
   size: PizzaSize;
   type: PizzaType;
   productItems: ProductItem[];
   ingredients: Ingredient[];
}

/**
 * @param type - тип теста выбранной пицы
 * @param size - размер выбранной пицы
 * @param productItems - список вариаций
 * @param ingredients - список ингредиенты
 * @param selectedIngredients - выбранные ингредиенты
 * @returns {number} общую стоимость
 */

export const calcTotalPizzaPrice = (props: IProps): number => {
   const { ingredients, selectedIngredients, size, type, productItems } = props;
   const pizzaPrice =
      productItems.find((item) => item.pizzaType === type && item.size === size)
         ?.price || 0;

   const totalIngredientsPrice = ingredients
      .filter((ingredient) => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0);

   return totalIngredientsPrice + pizzaPrice;
};
