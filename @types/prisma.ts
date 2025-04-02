import { Ingredient, Product, ProductItem } from "@prisma/client";

export type IProduct = Product & {
    productItem: ProductItem[];
   ingredients: Ingredient[];
};
