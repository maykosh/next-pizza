import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ModalPage({
   params: { id },
}: {
   params: { id: string };
}) {
   const product = await prisma.product.findFirst({
      where: {
         id: Number(id),
      },
      include: {
         ingredients: true,
         productItem: true,
      },
   });

   if (!product) return notFound();

   return <ChooseProductModal product={product} />;
}
