import { z } from "zod";

export const bedLogsQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format"),
});

export const saveDataSchema = z.object({
  user: z.coerce.number().int().positive(),
  date: z.string(),
  action: z.string(),
  actionTaken: z.string().optional(),
});
