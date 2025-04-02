"use client";
import React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { cn } from "@/shared/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store";
// import { Ingredient, Product, ProductItem } from "@prisma/client";
// export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };
interface Props {
   title: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   items: any[];
   className?: string;
   listClassName?: string;
   categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
   title,
   items,
   className,
   listClassName,
   categoryId,
}) => {
   const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
   const intersectionRef = React.useRef<HTMLDivElement>(null);
   const intersection = useIntersection(
      intersectionRef as React.RefObject<HTMLDivElement>,
      {
         threshold: 0.4,
      }
   );
   React.useEffect(() => {
      if (intersection?.isIntersecting) {
         setActiveCategoryId(categoryId);
      }
   }, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);
   return (
      <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size="lg" className="font-extrabold mb-5" />
         <div className={cn(listClassName, "grid grid-cols-3 gap-[50px]")}>
            {items.map((item) => (
               <ProductCard
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  price={item.productItem[0].price}
               />
            ))}
         </div>
      </div>
   );
};
