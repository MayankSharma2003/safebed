import { axios } from "../../config/axios";

export type BedActivityLog = {
    id: number;
    userId: string;
    action: string;
    time: string;
};

export const getBedLogs = async (date: string): Promise<BedActivityLog[]> => {
    try {
        const res = await axios.get<BedActivityLog[]>("/api/bedLogs", {
            params: { date }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
