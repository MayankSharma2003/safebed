import { Router } from "express";
import * as mappingService from "./mapping.service";

export const mappingRouter = Router();

mappingRouter.get("/mattobedmapping", async (_req, res) => {
  const data = await mappingService.listMatToBedMapping();
  res.json(data);
});
