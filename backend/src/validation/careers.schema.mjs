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

const jobDetailsSchema = z.object({
  title: z.string().min(2),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(10),
  requirements: z.array(z.string().min(1)).min(1),
  responsibilities: z.array(z.string().min(1)).min(1),
  is_active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const createJobSchema = jobDetailsSchema;

export const updateJobSchema = jobDetailsSchema.partial();
