import type { Prisma } from "@prisma/client";
import prisma from "../../libs/db";
import { dayRangeUTC } from "../../utils/dateRange";

export function listBedLogs(date: string) {
  const { start, end } = dayRangeUTC(date);

  return prisma.bedActivity.findMany({
    where: { time: { gte: start, lt: end } },
  });
}

// A manual entry marked "action taken" records the acknowledgement this long
// after the alert itself, so the two timestamps are distinguishable.
const MANUAL_ENTRY_ACTION_TAKEN_DELAY_MS = 2 * 60 * 1000;

type ManualEntryInput = {
  user: number;
  date: string;
  action: string;
  actionTaken?: string;
};

export function recordManualEntry({ user, date, action, actionTaken }: ManualEntryInput) {
  const time = new Date(date);

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.bedActivity.create({
      data: { userId: user, time, action },
    });

    if (action === "HIGH") {
      const wasActionTaken = actionTaken === "Yes";

      await tx.alertLogs.create({
        data: {
          userId: user,
          time,
          actionTaken: wasActionTaken,
          updatedAt: wasActionTaken ? new Date(time.getTime() + MANUAL_ENTRY_ACTION_TAKEN_DELAY_MS) : time,
        },
      });
    }
  });
}
