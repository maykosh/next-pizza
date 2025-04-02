import {
   Container,
   Filters,
   ProductsGroupList,
   Title,
   TopBar,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
   const categories = await prisma.category.findMany({
      include: {
         products: {
            include: {
               ingredients: true,
               productItem: true,
            },
         },
      },
   });

   return (
      <>
         <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-extrabold" />
         </Container>
         <TopBar categories={categories.filter((c) => c.products.length > 0)} />
         <Container className="pb-14 mt-10">
            <div className="flex gap-[80px]">
               <div className="w-[250px]">
                  <Filters />
               </div>
               <div className="flex-1">
                  <div className="flex flex-col gap-16">
                     {categories.map(
                        (category) =>
                           category.products.length > 0 && (
                              <ProductsGroupList
                                 key={category.id}
                                 title={category.name}
                                 items={category.products}
                                 categoryId={category.id}
                              />
                           )
                     )}
                  </div>

                  <div className="flex items-center gap-6 mt-12">
                     {/* <Pagination pageCount={3} /> */}
                     <span className="text-sm text-gray-400">5 из 65</span>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
