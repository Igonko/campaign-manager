"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <header className="w-full shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎯 Campaign Manager</h1>
      <nav className="flex gap-4">
        <Link
          href="/"
          className={clsx("hover:underline", {
            "font-semibold text-blue-600": pathname === "/",
          })}
        >
          {t("home_link")}
        </Link>
        <Link
          href="/campaigns"
          className={clsx("hover:underline", {
            "font-semibold text-blue-600": pathname === "/campaigns",
          })}
        >
          {t("campaigns_link")}
        </Link>
        <Link
          href="/create-campaign"
          className={clsx("hover:underline", {
            "font-semibold text-blue-600": pathname === "/create-campaign",
          })}
        >
          {t("create_link")}
        </Link>
      </nav>
    </header>
  );
}
