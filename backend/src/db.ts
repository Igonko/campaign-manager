import { Campaign, MediaAsset } from "./types";

export const campaigns: Campaign[] = [];
export const mediaAssets: MediaAsset[] = [];
export const mediaFileStore: Record<
  string,
  { buffer: ArrayBuffer; type: "image" | "video"; mime: string }
> = {};

