import "./../globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import Header from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Campaign Manager",
  description: "Mini ADSBIN Campaign Manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Header />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
