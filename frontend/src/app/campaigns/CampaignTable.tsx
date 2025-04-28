"use client";

import { useQuery } from "@tanstack/react-query";
import { CampaignWithAsset, fetchCampaigns } from "@/lib/api";
import { useTranslation } from "react-i18next";

export default function CampaignTable() {
  const { t } = useTranslation("common");

  const { data, isLoading, isError } = useQuery<CampaignWithAsset[]>({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  if (isLoading) return <p>{t("loading")}</p>;
  if (isError || !data) return <p>{t("error_loading")}</p>;

  return (
    <table className="w-full border text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border text-black">{t("name")}</th>
          <th className="p-2 border text-black">{t("targetUrl")}</th>
          <th className="p-2 border text-black">{t("media")}</th>
          <th className="p-2 border text-black">{t("startDate")}</th>
          <th className="p-2 border text-black">{t("endDate")}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((campaign) => (
          <tr key={campaign.id}>
            <td className="p-2 border">{campaign.name}</td>
            <td className="p-2 border">
              <a
                href={campaign.targetUrl}
                className="text-blue-600 underline"
                target="_blank"
              >
                {t("visit")}
              </a>
            </td>
            <td className="p-2 border">
              {campaign.mediaAsset.type === "image" ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${campaign.mediaAsset.url}`}
                  alt="media"
                  className="h-10 w-auto"
                />
              ) : (
                <video
                  src={campaign.mediaAsset.url}
                  className="h-10 w-auto"
                  controls
                />
              )}
            </td>
            <td className="p-2 border">{campaign.startDate}</td>
            <td className="p-2 border">{campaign.endDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
