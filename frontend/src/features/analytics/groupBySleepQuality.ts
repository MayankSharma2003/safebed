import type { AnalyticsRow } from "./transformAnalyticsData";
import type { TabType } from "./AnalyticsTable";

export type FormattedAnalyticsRow = AnalyticsRow & {
    lowHoursFormatted: number;
    lowMinutesFormatted: number;
    highHoursFormatted: number;
    highMinutesFormatted: number;
    totalHoursFormatted: number;
    totalMinutesFormatted: number
};

// Hours spent on the bed that separate the good / moderate / poor sleep bands.
const GOOD_SLEEP_HOURS_THRESHOLD = 11;
const MODERATE_SLEEP_HOURS_THRESHOLD = 9;

export const groupBySleepQuality = (
    tableData: AnalyticsRow[]
): Record<TabType, FormattedAnalyticsRow[]> => {
    const grouped: Record<TabType, FormattedAnalyticsRow[]> = {
        good: [],
        moderate: [],
        poor: []
    };

    tableData.forEach((data) => {

        const lowHoursFormatted = Math.floor(data.lowHours / (1000 * 60 * 60));
        const lowMinutesFormatted = Math.floor((data.lowHours / (1000 * 60)) % 60);

        const highHoursFormatted = Math.floor(data.highHours / (1000 * 60 * 60));
        const highMinutesFormatted = Math.floor((data.highHours / (1000 * 60)) % 60);

        const totalHoursFormatted = Math.floor(data.totalHours / (1000 * 60 * 60));
        const totalMinutesFormatted = Math.floor((data.totalHours / (1000 * 60)) % 60);

        const formatted: FormattedAnalyticsRow = {
            ...data,
            lowHoursFormatted,
            lowMinutesFormatted,
            highHoursFormatted,
            highMinutesFormatted,
            totalHoursFormatted,
            totalMinutesFormatted
        };

        if (lowHoursFormatted >= GOOD_SLEEP_HOURS_THRESHOLD) {
            grouped.good.push(formatted);
        }
        else if (lowHoursFormatted >= MODERATE_SLEEP_HOURS_THRESHOLD) {
            grouped.moderate.push(formatted);
        }
        else {
            grouped.poor.push(formatted);
        }
    });

    return grouped;
};
