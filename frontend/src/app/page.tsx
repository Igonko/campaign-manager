"use client";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main className="max-w-2xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold mb-4">{t("welcome")}</h2>
      <p className="text-gray-600">{t("description")}</p>
      <p className="mt-4">
        <span className="font-medium">{t("instruction")}</span>
      </p>
    </main>
  );
}
