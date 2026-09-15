import { Router } from "express";
import { usersRouter } from "./modules/users/users.routes";
import { alertsRouter } from "./modules/alerts/alerts.routes";
import { bedActivityRouter } from "./modules/bedActivity/bedActivity.routes";
import { mappingRouter } from "./modules/mapping/mapping.routes";

export const routes = Router();

routes.use(usersRouter);
routes.use(alertsRouter);
routes.use(bedActivityRouter);
routes.use(mappingRouter);
