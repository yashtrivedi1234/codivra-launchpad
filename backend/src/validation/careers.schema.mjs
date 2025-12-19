import { z } from "zod";

export const careersApplicationSchema = z.object({
  job_title: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  linkedin_url: z.string().url().nullable().optional(),
  portfolio_url: z.string().url().nullable().optional(),
  cover_letter: z.string().nullable().optional(),
});


