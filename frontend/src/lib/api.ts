export interface Campaign {
  name: string;
  targetUrl: string;
  mediaAssetId: string;
  startDate: string;
  endDate: string;
}

export type MediaAsset = {
  id: string;
  type: "image" | "video";
  url: string;
};

export type CampaignWithAsset = {
  id: string;
  name: string;
  targetUrl: string;
  startDate: string;
  endDate: string;
  mediaAsset: MediaAsset;
};


export async function createCampaign(data: Campaign) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create campaign");
  }

  return res.json();
}

export async function fetchCampaigns(): Promise<CampaignWithAsset[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns`,
    {
      next: { revalidate: 5 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}
