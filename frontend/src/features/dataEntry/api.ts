import {axios} from '../../config/axios';

type ManualEntryPayload = {
    user: number | string;
    date: string;
    action: string;
    actionTaken: string;
};

export const saveData = async (data: ManualEntryPayload) => {
    const result = await axios.post("/api/saveData", data)
    return result.status;
}
