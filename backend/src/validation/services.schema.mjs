import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  icon: z.string().min(1).max(50),
  features: z.array(z.string().max(200)).optional().default([]),
});

export const updateServiceSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(1000).optional(),
  icon: z.string().min(1).max(50).optional(),
  features: z.array(z.string().max(200)).optional(),
});
