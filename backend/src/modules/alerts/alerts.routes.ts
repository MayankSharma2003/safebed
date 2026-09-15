import { Router } from "express";
import { updateActionTakenSchema, alertLogsQuerySchema } from "./alerts.validation";
import * as alertsService from "./alerts.service";

export const alertsRouter = Router();

alertsRouter.patch("/updateActionTaken", async (req, res) => {
  const { id, actionTaken } = updateActionTakenSchema.parse(req.body);
  const alert = await alertsService.updateActionTaken(id, actionTaken);
  res.json(alert);
});

alertsRouter.get("/alertLogs", async (req, res) => {
  const { date, page, pageSize } = alertLogsQuerySchema.parse(req.query);
  const result = await alertsService.listAlertLogs(date, page, pageSize);
  res.json(result);
});
