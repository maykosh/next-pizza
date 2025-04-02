import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";

export const metadata: Metadata = {
   title: "Next Pizza | Главная",
   description: "Generated by create next app",
};

export default function HomeLayout({
   children,
   modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
   return (
      <>
         <Header />
         <main>
            {children}
            {modal}
         </main>
      </>
   );
}
