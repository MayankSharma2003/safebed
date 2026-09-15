import { useEffect, useState } from "react";
import { getBedLogs } from "../bedActivity/api";
import { useStore } from "../../hooks/useStore";
import { transformAnalyticsData } from "./transformAnalyticsData";
import { groupBySleepQuality } from "./groupBySleepQuality";

export const useAnalyticsData = () => {
    const { bedsStore } = useStore();
    const [bedLogs, setBedLogs] = useState<Awaited<ReturnType<typeof getBedLogs>>>([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        bedsStore.loadBeds();
    }, [bedsStore]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBedLogs(date);
            setBedLogs(data);
        };
        fetchData();
    }, [date]);

    const tableData = transformAnalyticsData(bedLogs, date, bedsStore.beds);

    return { date, setDate, grouped: groupBySleepQuality(tableData) };
};
