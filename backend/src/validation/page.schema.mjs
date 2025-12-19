import { z } from "zod";

export const upsertPageSectionSchema = z.object({
  page: z.string().min(1),
  key: z.string().min(1),
  data: z.record(z.any()).or(z.any()),
});


