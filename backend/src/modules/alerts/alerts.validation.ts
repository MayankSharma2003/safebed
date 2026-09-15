import { z } from "zod";

export const updateActionTakenSchema = z.object({
  id: z.coerce.number().int().positive(),
  actionTaken: z.boolean(),
});

export const alertLogsQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format"),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional(),
});
