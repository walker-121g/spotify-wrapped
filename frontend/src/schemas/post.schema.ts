import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(4).max(20),
  content: z.string().min(16).max(255),
});

export type PostSchema = z.infer<typeof postSchema>;
