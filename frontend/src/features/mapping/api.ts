import {axios} from "../../config/axios";

export type MatToBedMapping = {
    espId: number;
    userId: number;
    esp: {
        id: number;
        espId: string;
        matId: string;
    };
    users: {
        id: number;
        userName: string;
        age: number;
        building: string;
        floor: string;
        room: string;
        bed: string;
    };
};

const getMatToBedMapping = async (): Promise<MatToBedMapping[]> => {
    const res = await axios.get<MatToBedMapping[]>("/api/mattobedmapping");
    return res.data;
}

export default getMatToBedMapping;
