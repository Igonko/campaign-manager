export async function getDictionary(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/locales/${locale}/common.json`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to load translations");
  }

  return res.json();
}
