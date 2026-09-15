import type { Bed } from "../beds/types";
import type { BedActivityLog } from "./api";

type ChartItem = {
  name: string;
  value: [string, number, number, string, string | null, string | null];
};

function convertToISO(dateStr: string, timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);

  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);

  return date.toISOString();
}

export const transformToChartData = (
  logs: BedActivityLog[],
  beds: Bed[],
  date: string,
): ChartItem[] => {
  const grouped: Record<string, BedActivityLog[]> = {};

  logs.forEach((log) => {
    if (!grouped[log.userId]) grouped[log.userId] = [];
    grouped[log.userId].push(log);
  });

  const result: ChartItem[] = [];

  Object.entries(grouped).forEach(([userId, userLogs]) => {

    const user = beds.find(
      (b) => String(b.id) === String(userId)
    );

    if (!user) {
      console.warn("User not found for userId:", userId);
      return;
    }

    const bedName = `${user.userName.toUpperCase()} - ${user.bed.toUpperCase()}`

    const first = userLogs[0];
    const firstTime = new Date(first.time);

    const start_time = convertToISO(first.time.split("T")[0], "00:00")

    const firstHour =
      firstTime.getHours() + firstTime.getMinutes() / 60;

    const initialAction =
      first.action === "HIGH" ? "On bed" : "Not on bed";

    if (firstHour > 0) {
      result.push({
        name: bedName,
        value: [
          bedName,
          0,
          firstHour,
          initialAction,
          start_time,
          first.time
        ]
      });
    }

    userLogs.sort(
      (a, b) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    for (let i = 0; i < userLogs.length; i++) {

      const current = userLogs[i];
      const next = userLogs[i + 1];

      const start = new Date(current.time);
      const end = next ? new Date(next.time) : null;
      const now = new Date();

      const startHour =
        start.getHours() + start.getMinutes() / 60;

      const endHour = end
        ? end.getHours() + end.getMinutes() / 60
        : (now.toISOString().split("T")[0] == date) ? now.getHours() + now.getMinutes() / 60 : 24;

      const actionLabel =
        current.action === "HIGH" ? "Not on bed" : "On bed";

      result.push({
        name: bedName,
        value: [
          bedName,
          startHour,
          endHour,
          actionLabel,
          current.time,
          next?.time || null
        ]
      });
    }
  });

  return result;
};
