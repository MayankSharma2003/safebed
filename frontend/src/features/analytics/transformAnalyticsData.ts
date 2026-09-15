import type { Bed } from "../beds/types";
import type { BedActivityLog } from "../bedActivity/api";

export type AnalyticsRow = {
    userDetails: Bed,
    lowHours: number,
    highHours: number,
    totalHours: number
}

export const transformAnalyticsData = (
    logs: BedActivityLog[],
    date: string,
    beds: Bed[]
): AnalyticsRow[] => {
    const result: AnalyticsRow[] = [];

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const now = new Date();
    const isToday = now.toISOString().split("T")[0] === date;

    const calculationEnd = isToday ? now : dayEnd;

    const grouped: Record<string, BedActivityLog[]> = {};
    logs.forEach(log => {
        if (!grouped[log.userId]) grouped[log.userId] = [];
        grouped[log.userId].push(log);
    });

    Object.entries(grouped).forEach(([userId, userLogs]) => {
        const user = beds.find((b) => String(b.id) === String(userId));
        if (!user) return;

        userLogs.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        let lowMs = 0;
        let highMs = 0;

        const firstLogTime = new Date(userLogs[0].time);
        const morningGap = firstLogTime.getTime() - dayStart.getTime();

        if (morningGap > 0) {
            lowMs += morningGap;
        }

        for (let i = 0; i < userLogs.length; i++) {
            const start = new Date(userLogs[i].time);
            let end: Date;

            if (i === userLogs.length - 1) {
                end = calculationEnd;
            } else {
                end = new Date(userLogs[i + 1].time);
            }

            const diff = end.getTime() - start.getTime();
            if (diff > 0) {
                if (userLogs[i].action === "HIGH") highMs += diff;
                else lowMs += diff;
            }
        }

        result.push({
            userDetails: user,
            lowHours: lowMs,
            highHours: highMs,
            totalHours: (lowMs + highMs)
        });
    });

    return result;
};
