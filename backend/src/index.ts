import { Hono } from "hono";
import { z } from "zod";
import { campaigns, mediaAssets, mediaFileStore } from "./db";
import { nanoid } from "nanoid";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors({ origin: "*" }));

const createCampaignSchema = z.object({
  name: z.string().min(1),
  targetUrl: z.string().url(),
  mediaAssetId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

app.get("/api/v1/campaigns", (c) => {
  return c.json(campaigns);
});

app.post("/api/v1/campaigns", async (c) => {
  const body = await c.req.json();
  const parse = createCampaignSchema.safeParse(body);

  if (!parse.success) {
    return c.json({ error: parse.error.flatten() }, 400);
  }

  const { name, targetUrl, mediaAssetId, startDate, endDate } = parse.data;

  const media = mediaAssets.find((m) => m.id === mediaAssetId);
  if (!media) {
    return c.json({ error: "Invalid media asset ID" }, 400);
  }

  const newCampaign = {
    id: nanoid(),
    name,
    targetUrl,
    mediaAsset: media,
    startDate,
    endDate,
  };

  campaigns.push(newCampaign);

  return c.json(newCampaign, 201);
});

app.post("/api/v1/media-assets", async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("file");

  if (
    !file ||
    typeof file !== "object" ||
    typeof (file as any).arrayBuffer !== "function"
  ) {
    return c.json({ error: "Invalid file upload" }, 400);
  }

  const fileId = nanoid();
  const fileType = (file as any).type || "application/octet-stream";
  const buffer = await (file as any).arrayBuffer();
  const type: "video" | "image" = fileType.startsWith("video")
    ? "video"
    : "image";
  const fileUrl = `/uploads/${fileId}`;

  mediaFileStore[fileUrl] = {
    buffer,
    mime: fileType,
    type,
  };

  console.log("mediaFileStore: ", mediaFileStore);

  const mediaAsset = {
    id: fileId,
    url: fileUrl,
    type,
  };
  mediaAssets.push(mediaAsset);

  return c.json({
    id: fileId,
    url: fileUrl,
    type,
  });
});

// Serve uploaded media
app.get("/uploads/:fileid", async (c) => {
  const fileid = c.req.param("fileid");
  const filePath = `/uploads/${fileid}`;
  const file = mediaFileStore[filePath];

  if (!file) return c.notFound();

  return c.body(file.buffer, {
    headers: {
      "Content-Type": file.mime,
    },
  });
});

export default app;
