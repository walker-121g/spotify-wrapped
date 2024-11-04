import { z } from "zod";

export const wrapSchema = z.object({
  name: z.string().min(4).max(255),
  period: z.enum(["short_term", "medium_term", "long_term"]),
  _user: z.string().email().optional(),
});

export type WrapSchema = z.infer<typeof wrapSchema>;
