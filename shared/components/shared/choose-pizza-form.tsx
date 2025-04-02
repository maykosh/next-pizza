"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { Ingredient, ProductItem } from "@prisma/client";
import { GroupVariants } from "./group-variants";
import {
   mapPizzaType,
   PizzaSize,
   pizzaSizes,
   PizzaType,
   pizzaTypes,
} from "@/shared/constants/pizza";
import { ProductImage } from "./product-image";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from "@/shared/lib";

interface Props {
   imageUrl: string;
   name: string;
   ingredients: Ingredient[];
   productItems: ProductItem[];
   onClickAddCart?: VoidFunction;
   className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ ...props }) => {
   const {
      imageUrl,
      name,
      ingredients,
      productItems,
      // onClickAddCart,
      className,
   } = props;

   const [size, setSize] = React.useState<PizzaSize>(20);
   const [type, setType] = React.useState<PizzaType>(1);

   const [selectedIngredients, { toggle: addIngredient }] = useSet(
      new Set<number>([])
   );

   const totalPrice = calcTotalPizzaPrice({ selectedIngredients, size, type, productItems, ingredients });

   const onClickAddCart = () => {
      const pizza = {
         size,
         type,
         ingredients: Array.from(selectedIngredients),
      };
      console.log(pizza);
   };

   const availableSize = getAvailablePizzaSizes({ productItems, type });

   return (
      <div className={cn(className, "flex flex-1")}>
         <ProductImage imageUrl={imageUrl} size={size} />
         <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <p className="text-gray-400 mb-2">{`${size} см, ${mapPizzaType[type]} тесто`}</p>
            <div className="flex flex-col gap-4">
               <GroupVariants
                  items={availableSize}
                  selectedValue={String(size)}
                  onClick={(value) => setSize(Number(value) as PizzaSize)}
               />
               <GroupVariants
                  items={pizzaTypes}
                  selectedValue={String(type)}
                  onClick={(value) => setType(Number(value) as PizzaType)}
               />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3 h-[300px] overflow-y-auto p-3">
               {ingredients.map((ingredient) => (
                  <IngredientItem
                     ingredients={ingredient}
                     key={ingredient.id}
                     active={selectedIngredients.has(ingredient.id)}
                     onClick={() => addIngredient(ingredient.id)}
                  />
               ))}
            </div>

            <Button
               onClick={onClickAddCart}
               className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
            >
               Добавить в корзину за {totalPrice} ₽
            </Button>
         </div>
      </div>
   );
};
