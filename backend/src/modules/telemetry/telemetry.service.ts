import prisma from "../../libs/db";

// Duplicate HIGH readings from the same mat within this window are ignored
// while the previous alert is still unacknowledged.
const DUPLICATE_ALERT_WINDOW_MS = 10000;

type MatReading = {
  espId: string;
  status: string;
};

export type MatReadingResult = {
  userId: number;
  alertId: number | null;
} | null;

export async function recordMatReading({ espId, status }: MatReading): Promise<MatReadingResult> {
  const mapping = await prisma.esp_to_user_mapping.findFirst({
    where: { esp: { espId } },
    select: { userId: true },
  });

  if (!mapping) {
    throw new Error(`No user mapped to mat ${espId}`);
  }

  const { userId } = mapping;

  const lastAlert = await prisma.alertLogs.findFirst({
    where: { userId },
    orderBy: { time: "desc" },
  });

  if (lastAlert) {
    const elapsedSinceLastAlert = Date.now() - new Date(lastAlert.time).getTime();
    const isWithinDuplicateWindow =
      elapsedSinceLastAlert >= 0 && elapsedSinceLastAlert < DUPLICATE_ALERT_WINDOW_MS;

    if (isWithinDuplicateWindow && lastAlert.actionTaken === false) {
      return null;
    }
  }

  if (status === "HIGH") {
    const [alertLog] = await prisma.$transaction([
      prisma.alertLogs.create({ data: { userId } }),
      prisma.bedActivity.create({ data: { userId, action: status } }),
    ]);

    return { userId, alertId: alertLog.id };
  }

  await prisma.bedActivity.create({ data: { userId, action: status } });

  return { userId, alertId: null };
}
