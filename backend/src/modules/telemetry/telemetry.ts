import { io } from "../../libs/socket";
import { logger } from "../../utils/logger";
import { connectMqttClient } from "./mqtt.client";
import { recordMatReading } from "./telemetry.service";

type MatPayload = {
  id: string;
  status: string;
};

export function startTelemetryListener() {
  connectMqttClient(async (_topic, message) => {
    let payload: MatPayload;

    try {
      payload = JSON.parse(message.toString());
    } catch (error) {
      logger.error("Failed to parse MQTT payload", { raw: message.toString(), error });
      return;
    }

    logger.info("Mat reading received", { matId: payload.id, status: payload.status });

    try {
      const result = await recordMatReading({ espId: payload.id, status: payload.status });

      if (result?.alertId != null) {
        io.emit("device_update", { matId: result.userId, alertId: result.alertId });
      }
    } catch (error) {
      logger.error("Failed to process mat reading", { matId: payload.id, error });
    }
  });
}
