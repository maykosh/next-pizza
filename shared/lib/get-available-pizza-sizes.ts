import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

interface IProps {
   productItems: ProductItem[];
   type: PizzaType;
}

/**
 * это функция для фильтрации доступных размеров пиццы
 * @param productItems - список вариаций
 * @param type - тип теста
 * @returns {Array} - список доступных размеров
 */
export const getAvailablePizzaSizes = (props: IProps): Variant[] => {
   const { productItems, type } = props;
   const filterPizzasByType = productItems.filter(
      (item) => item.pizzaType === type
   );
   return pizzaSizes.map((item) => ({
      name: item.name,
      value: item.value,
      disabled: !filterPizzasByType.some(
         (pizza) => pizza.size === Number(item.value)
      ),
   }));
};
