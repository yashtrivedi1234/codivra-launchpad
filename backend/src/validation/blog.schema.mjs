import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(2).max(200),
  content: z.string().min(20),
  category: z.string().min(2).max(100),
  image: z.string().url().optional().or(z.literal("")),
});

export const updateBlogSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  content: z.string().min(20).optional(),
  category: z.string().min(2).max(100).optional(),
  image: z.string().url().optional().or(z.literal("")),
});
