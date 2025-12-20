import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  service: z.string().min(2, "Service is required"),
  message: z.string().min(1, "Message is required"),
  phone: z.string().optional(),
});
