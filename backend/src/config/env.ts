import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_URL: required("DATABASE_URL"),
  MQTT_BROKER_URL: process.env.MQTT_BROKER_URL || "mqtt://broker.hivemq.com:1883",
  MQTT_USERNAME: process.env.MQTT_USERNAME,
  MQTT_PASSWORD: process.env.MQTT_PASSWORD,
  MQTT_TOPIC: process.env.MQTT_TOPIC || "safebed/mayanksharma2003/mats/status",
};
