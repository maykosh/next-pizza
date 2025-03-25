import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Title } from "./title";
import { CountButton } from "./count-button";
import { Button } from "../ui";
import {  Plus } from "lucide-react";
import Link from "next/link";

interface Props {
   id: number
   name: string;
   price: number;
   count?: number;
   imageUrl: string;
   className?: string;
}

export const ProductCard: React.FC<Props> = ({
   className,
   count,
   imageUrl,
   name,
   price,
   id
}) => {
   return (
      <div className={cn("flex flex-col justify-between",className)}>
         <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
            <Image className="w-[215px] h-[215px]" src={imageUrl} alt={name} width={215} height={215}/>
         </div>

         <Link href={`/products/${id}`}>
            <Title text={name} size="sm" className="mb-1 mt-3  font-bold" />
         </Link>

         <p className="text-sm text-gray-400">
            Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты,
            соус альфредо, чеснок
         </p>

         <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
               от <b>{price} ₽</b>
            </span>

            {count ? (
               <CountButton value={count} size="lg" />
            ) : (
               <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-1" />
                  Добавить
               </Button>
            )}
         </div>
      </div>
   );
};
