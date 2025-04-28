import "./globals.css";
import type { Metadata } from "next";
import { dir } from "i18next";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import Header from "@/components/Header"; 

export const metadata: Metadata = {
  title: "Campaign Manager",
  description: "Mini ADSBIN Campaign Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir={dir("en")}>
      <body className="antialiased">
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
