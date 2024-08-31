import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { SheetProvider } from "@/providers/sheet-provider";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});
export const metadata: Metadata = {
  title: "ReScan",
  description: "Receipt Scanner and Spending Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <SheetProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
