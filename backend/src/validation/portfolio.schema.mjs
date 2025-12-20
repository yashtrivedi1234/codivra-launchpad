import { z } from "zod";

export const createPortfolioSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  category: z.string().min(2).max(100),
  image: z.string().url().optional().or(z.literal("")),
  link: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

export const updatePortfolioSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().min(10).max(500).optional(),
  category: z.string().min(2).max(100).optional(),
  image: z.string().url().optional().or(z.literal("")),
  link: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});
