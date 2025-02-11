import {
   Container,
   Filters,
   ProductsGroupList,
   Title,
   TopBar,
} from "@/components/shared";

export default function Home() {
   return (
      <>
         <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-extrabold" />
         </Container>
         <TopBar />
         <Container className="pb-14 mt-10">
            <div className="flex gap-[80px]">
               <div className="w-[250px]">
                  <Filters />
               </div>
               <div className="flex-1">
                  <div className="flex flex-col gap-16">
                     <ProductsGroupList
                        title="Пиццы"
                        items={[
                           {
                              id: 1,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 2,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 3,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 4,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 5,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 6,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                        ]}
                        categoryId={1}
                     />
                     <ProductsGroupList
                        title="Комбо"
                        items={[
                           {
                              id: 1,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 2,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 3,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 4,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 5,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                           {
                              id: 6,
                              name: "Комбо",
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              items: [{ price: 100 }],
                              price: 100,
                           },
                        ]}
                        categoryId={2}
                     />
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
