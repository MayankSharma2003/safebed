import { useEffect, useState } from "react";
import { getAlertLogs } from "./api";
import type { AlertLogRecord } from "./api";
import { useStore } from "../../hooks/useStore";

export const useAlertLogsData = () => {
    const { bedsStore } = useStore();
    const [alerts, setAlerts] = useState<AlertLogRecord[]>([])
    // const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
        const [date, setDate] = useState('2026-09-15');

    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data, total } = await getAlertLogs(date, page, pageSize);
            setAlerts(data);
            setTotal(total);
        };

        fetchData();
    }, [date, page, pageSize]);


    useEffect(() => {
        bedsStore.loadBeds();
    }, [bedsStore]);

    const changeDate = (newDate: string) => {
    setDate(newDate);
    setPage(1);
};

    return { bedsStore, alerts, date, setDate: changeDate, page, setPage, pageSize, total };
};
