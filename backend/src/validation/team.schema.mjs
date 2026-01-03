import { z } from "zod";

export const createTeamMemberSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().min(3).max(100),
  image: z.string().url().optional().or(z.literal("")),
});

export const updateTeamMemberSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.string().min(3).max(100).optional(),
  image: z.string().url().optional().or(z.literal("")),
});
