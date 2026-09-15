/* eslint-disable no-console */

type LogMeta = Record<string, unknown> | undefined;

function format(level: string, message: string, meta?: LogMeta): unknown[] {
  const parts: unknown[] = [`[${new Date().toISOString()}] [${level}] ${message}`];
  if (meta) parts.push(meta);
  return parts;
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    console.log(...format("INFO", message, meta));
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(...format("WARN", message, meta));
  },
  error(message: string, meta?: LogMeta) {
    console.error(...format("ERROR", message, meta));
  },
};
