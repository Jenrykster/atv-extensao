import Header from '@/components/Header';
import { auth } from '@/lib/auth';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ProtesteAqui",
  description: "Denuncie problemas públicos de forma democrática",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-[100vh] flex flex-col"}>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
