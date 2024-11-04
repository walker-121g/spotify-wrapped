import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email(),
  content: z.string().min(10).max(500),
});

export type ContactSchema = z.infer<typeof contactSchema>;
