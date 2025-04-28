"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCampaign } from "@/lib/api";
import { useTranslations } from "next-intl";

export default function CreateCampaignPage() {
  const t = useTranslations("Create-campaign");

  const [formData, setFormData] = useState({
    name: "",
    targetUrl: "",
    startDate: "",
    endDate: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: createCampaign,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert(t("upload_prompt"));
      return;
    }

    const mediaForm = new FormData();
    mediaForm.append("file", file);
    const mediaRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/media-assets`,
      {
        method: "POST",
        body: mediaForm,
      }
    );
    const mediaData = await mediaRes.json();
    if (!mediaRes.ok) {
      alert(t("upload_error"));
      return;
    }

    const payload = {
      ...formData,
      mediaAssetId: mediaData.id,
    };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-lg mx-auto">
      {["name", "targetUrl", "startDate", "endDate"].map((field) => (
        <input
          key={field}
          type={field.includes("Date") ? "date" : "text"}
          name={field}
          value={(formData as Record<string, string>)[field]}
          onChange={handleChange}
          placeholder={t(field)}
          className="border border-gray-300 p-2 w-full rounded"
        />
      ))}

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 w-full rounded"
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? t("creating") : t("create_campaign")}
      </button>

      {mutation.isSuccess && (
        <p className="text-green-600">{t("campaign_created")}</p>
      )}
      {mutation.isError && <p className="text-red-600">{t("error_loading")}</p>}
    </form>
  );
}
