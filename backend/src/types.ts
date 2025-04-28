export type MediaAsset = {
  id: string;
  type: 'image' | 'video';
  url: string;
};

export type Campaign = {
  id: string;
  name: string;
  targetUrl: string;
  mediaAsset: MediaAsset;
  startDate: string; // ISO string
  endDate: string;   // ISO string
};
