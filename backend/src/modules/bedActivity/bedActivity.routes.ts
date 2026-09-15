import { Router } from "express";
import { bedLogsQuerySchema, saveDataSchema } from "./bedActivity.validation";
import * as bedActivityService from "./bedActivity.service";

export const bedActivityRouter = Router();

bedActivityRouter.get("/bedLogs", async (req, res) => {
  const { date } = bedLogsQuerySchema.parse(req.query);
  const bedLogs = await bedActivityService.listBedLogs(date);
  res.json(bedLogs);
});

bedActivityRouter.post("/saveData", async (req, res) => {
  const data = saveDataSchema.parse(req.body);
  await bedActivityService.recordManualEntry(data);
  res.status(201).json({ message: "Created" });
});
