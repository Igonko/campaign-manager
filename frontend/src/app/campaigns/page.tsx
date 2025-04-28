import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchCampaigns } from "@/lib/api";
import CampaignTable from "./CampaignTable";
import { getDictionary } from "@/lib/getDictionary";

export default async function CampaignListPage() {
  const dict = await getDictionary("en");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{dict["campaigns"]}</h1>
        <CampaignTable />
      </div>
    </HydrationBoundary>
  );
}
