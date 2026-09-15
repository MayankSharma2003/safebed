import mqtt, { MqttClient } from "mqtt";
import { env } from "../../config/env";
import { logger } from "../../utils/logger";

type MessageHandler = (topic: string, payload: Buffer) => void;

export function connectMqttClient(onMessage: MessageHandler): MqttClient {
  const client = mqtt.connect(env.MQTT_BROKER_URL, {
    username: env.MQTT_USERNAME,
    password: env.MQTT_PASSWORD,
  });

  client.on("connect", () => {
    logger.info("MQTT connected", { broker: env.MQTT_BROKER_URL });
    client.subscribe(env.MQTT_TOPIC);
  });

  client.on("reconnect", () => {
    logger.warn("MQTT reconnecting...");
  });

  client.on("error", (error) => {
    logger.error("MQTT client error", { error });
  });

  client.on("message", onMessage);

  return client;
}
