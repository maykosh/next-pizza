"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { IProduct } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
   className?: string;
   product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
   const router = useRouter();
   const isPizzaForm = Boolean(product.productItem[0].pizzaType);

   return (
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
         <DialogContent
            className={cn(
               "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
               className
            )}
         >
            <DialogTitle className="w-0 h-0 sr-only "></DialogTitle>
            {isPizzaForm ? (
               <ChoosePizzaForm
                  imageUrl={product.imageUrl}
                  name={product.name}
                  ingredients={product.ingredients}
                  productItems={product.productItem}
               />
            ) : (
               <ChooseProductForm
                  imageUrl={product.imageUrl}
                  name={product.name}
               />
            )}
         </DialogContent>
      </Dialog>
   );
};
