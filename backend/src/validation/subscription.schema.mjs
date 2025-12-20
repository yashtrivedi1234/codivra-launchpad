import { z } from "zod";

export const subscriptionSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  source: z
    .string()
    .max(100)
    .optional()
    .transform((v) => (v && v.trim()) || undefined),
});
