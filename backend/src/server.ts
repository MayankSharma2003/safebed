import { env } from "./config/env";
import { APP_NAME } from "./config/appConfig";
import express from "express";
import cors from "cors";
import type { Socket } from "socket.io";
import { io, app, server } from "./libs/socket";
import { routes } from "./routes";
import { startTelemetryListener } from "./modules/telemetry/telemetry";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

io.on("connection", (socket: Socket) => {
  logger.info("Frontend connected", { socketId: socket.id });
});

startTelemetryListener();

app.use(notFoundHandler);
app.use(errorHandler);

server.listen(env.PORT, () => {
  logger.info(`${APP_NAME} server running on port ${env.PORT}`);
});
