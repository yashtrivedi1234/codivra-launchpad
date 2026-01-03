import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().url("Icon must be a valid URL").optional(),
});

export const updateServiceSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  icon: z.string().min(1).max(50).optional(),
});
