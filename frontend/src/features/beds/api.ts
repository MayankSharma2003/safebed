import {axios} from "../../config/axios";
import type { Bed } from "./types";


export const getBeds = async (): Promise<Bed[]> => {
    const res = await axios.get<Bed[]>("/api/users");
    return res.data;
}