import prisma from "../../libs/db";
import { dayRangeUTC } from "../../utils/dateRange";

export function updateActionTaken(id: number, actionTaken: boolean) {
  return prisma.alertLogs.update({
    where: { id },
    data: { actionTaken },
  });
}

export async function listAlertLogs(date: string, page?: number, pageSize?: number) {
  const { start, end } = dayRangeUTC(date);
  const where = { time: { gte: start, lt: end } };

  const data =
    page && pageSize
      ? await prisma.alertLogs.findMany({
          where,
          orderBy: { time: "asc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        })
      : await prisma.alertLogs.findMany({ where, orderBy: { time: "asc" } });

  const total = await prisma.alertLogs.count({ where });

  return { data, total };
}
