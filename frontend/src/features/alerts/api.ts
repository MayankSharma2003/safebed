import { axios } from "../../config/axios";
import type { Alert } from "./store";

export type AlertLogRecord = {
    id: number;
    time: number;
    actionTaken: boolean;
    updatedAt: number;
    userId: number;
};

type AlertLogsResponse = {
    data: AlertLogRecord[];
    total: number;
};

export const updateActionTaken = async (
    alertId: number | undefined,
    data: Alert,
    triggerAlert: (bed: number) => void
): Promise<void> => {
    try {
        await axios.patch("/api/updateActionTaken", {
            id: alertId,
            actionTaken: true,
        });
        triggerAlert(data.matId);
    } catch (error) {
        console.error(error);
    }
};

export const getAlertLogs = async (
    date: string,
    page?: number,
    pageSize?: number,
): Promise<AlertLogsResponse> => {
    try {
        const res = await axios.get<AlertLogsResponse>("/api/alertLogs", {
            params: { date, page, pageSize }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return { data: [], total: 0 };
    }
};
