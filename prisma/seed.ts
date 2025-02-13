import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomNumber = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = ({
   productId,
   size,
   pizzaType,
}: {
   productId: number;
   pizzaType?: 1 | 2;
   size?: 20 | 30 | 40;
}) => {
   return {
      productId,
      size,
      pizzaType,
      price: randomNumber(190, 600),
      // carbs: randomNumber(10, 30),
      // fats: randomNumber(5, 15),
      // kcal: randomNumber(180, 300),
      // proteins: randomNumber(20, 45),
      // weight: randomNumber(400, 650),
   } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
   await prisma.user.createMany({
      data: [
         {
            fullName: "User",
            email: "user@gmail.com",
            password: hashSync("user", 10),
            verified: new Date(),
            role: "USER",
         },
         {
            fullName: "Iska",
            email: "iska@gmail.com",
            password: hashSync("iska", 10),
            createdAt: new Date(),
            role: "ADMIN",
            verified: new Date(),
         },
      ],
   });

   await prisma.category.createMany({
      data: categories,
   });
   await prisma.ingredient.createMany({
      data: ingredients,
   });

   await prisma.product.createMany({
      data: products,
   });
   const pizza1 = await prisma.product.create({
      data: {
         name: "Пепперони фреш",
         imageUrl:
            "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
         categoryId: 1,
         ingredients: {
            connect: ingredients.slice(0, 5),
         },
      },
   });
   const pizza2 = await prisma.product.create({
      data: {
         name: "Сырная",
         imageUrl:
            "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
         categoryId: 1,
         ingredients: {
            connect: ingredients.slice(5, 10),
         },
      },
   });
   const pizza3 = await prisma.product.create({
      data: {
         name: "Чоризо фреш",
         imageUrl:
            "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
         categoryId: 1,
         ingredients: {
            connect: ingredients.slice(10, 40),
         },
      },
   });
   await prisma.productItem.createMany({
      data: [
         // Пицца "Пепперони фреш"
         generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

         // Пицца "Сырная"
         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

         // Пицца "Чоризо фреш"
         generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
         generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

         // Остальные продукты
         generateProductItem({ productId: 1 }),
         generateProductItem({ productId: 2 }),
         generateProductItem({ productId: 3 }),
         generateProductItem({ productId: 4 }),
         generateProductItem({ productId: 5 }),
         generateProductItem({ productId: 6 }),
         generateProductItem({ productId: 7 }),
         generateProductItem({ productId: 8 }),
         generateProductItem({ productId: 9 }),
         generateProductItem({ productId: 10 }),
         generateProductItem({ productId: 11 }),
         generateProductItem({ productId: 12 }),
         generateProductItem({ productId: 13 }),
         generateProductItem({ productId: 14 }),
         generateProductItem({ productId: 15 }),
         generateProductItem({ productId: 16 }),
         generateProductItem({ productId: 17 }),
      ],
   });

   await prisma.cart.createMany({
      data: [
         {
            userId: 1,
            totalAmount: 0,
            token: "11111",
         },
         {
            userId: 2,
            totalAmount: 0,
            token: "222222",
         },
      ],
   });

   await prisma.cartItem.create({
      data: {
         productItemId: 1,
         cartId: 1,
         quantity: 2,
         ingredients: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
         },
      },
   });
}
async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}
async function main() {
   try {
      await down();
      await up();
   } catch (error) {
      console.log(error);
   }
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
   });
