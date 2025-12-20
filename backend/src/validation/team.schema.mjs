import { z } from "zod";

export const createTeamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().min(3).max(100),
  bio: z.string().min(10).max(500),
  image: z.string().url().optional().or(z.literal("")),
  email: z
    .string()
    .email()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  social_links: z
    .object({
      linkedin: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
      twitter: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
      github: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
    })
    .optional(),
});

export const updateTeamMemberSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.string().min(3).max(100).optional(),
  bio: z.string().min(10).max(500).optional(),
  image: z.string().url().optional().or(z.literal("")),
  email: z
    .string()
    .email()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  social_links: z
    .object({
      linkedin: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
      twitter: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
      github: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
    })
    .optional(),
});
