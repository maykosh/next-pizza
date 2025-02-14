import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Ingredient } from "@prisma/client";

export const getIngredients = async (): Promise<Ingredient[]> => {
   const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.GET_INGREDIENTS);

   return data;
};
