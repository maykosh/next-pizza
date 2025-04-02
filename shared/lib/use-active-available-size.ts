import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";

interface IProps {
   availableSize: Variant[];
   setSize: React.Dispatch<React.SetStateAction<PizzaSize>>;
   type: PizzaType;
   size: PizzaSize;
}

export const useAvailablePizzaSize = (props: IProps) => {
   const { availableSize, setSize, type, size } = props;
   React.useEffect(() => {
      const isAvailableSize = availableSize.find(
         (item) => Number(item.value) === size && !item.disabled
      );
      const availablePizzaSize = availableSize.find((item) => !item.disabled);
      if (!isAvailableSize && availablePizzaSize)
         setSize(() => Number(availablePizzaSize?.value) as PizzaSize);
   }, [type]);
};
