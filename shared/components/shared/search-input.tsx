"use client";
import { useDebounse } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { products } from "@/prisma/constants";
import { API } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useClickAway } from "react-use";

interface IProps {
   className?: string;
}

export const SearchInput: React.FC<IProps> = ({ className }) => {
   const [focused, setFocused] = React.useState(false);
   const [searchQuery, setSearchQuery] = React.useState("");
   const deboncedSearchQuery = useDebounse(searchQuery);
   const [items, setItems] = React.useState<Product[]>([]);

   const ref = React.useRef(null);
   useClickAway(ref, () => {
      setFocused(false);
   });

   React.useEffect(() => {
      API.products.search(deboncedSearchQuery).then((items) => {
         setItems(items);
      });
   }, [deboncedSearchQuery]);

   const onClickItem = () => {
      setFocused(false);
      setSearchQuery("");
      setItems([]);
   };

   return (
      <>
         {focused && (
            <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
         )}
         <div
            ref={ref}
            className={cn(
               "flex rounded-2xl flex-1 justify-between   relative h-11 z-30",
               className
            )}
         >
            <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
            <input
               className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
               type="text"
               placeholder="Найти пиццу..."
               onFocus={() => setFocused(true)}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
            {products.length > 0 && (
               <div
                  className={cn(
                     "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                     focused && "visible opacity-100 top-12"
                  )}
               >
                  {items.map((item) => (
                     <Link
                        onClick={onClickItem}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                        href={`/products/${item.id}`}
                        key={item.id}
                     >
                        <Image
                           src={item.imageUrl}
                           alt={item.name}
                           width={50}
                           height={50}
                           className={"rounded-xl"}
                        />
                        <span>{item.name}</span>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </>
   );
};
