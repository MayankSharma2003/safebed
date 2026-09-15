import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";

const ROOM_NUMBERS = ["101", "102", "103", "201", "202", "203"];

export const useHospitalMapRooms = () => {
    const { bedsStore } = useStore();

    useEffect(() => {
        const loadUsers = async () => {
            if (bedsStore.beds.length <= 0) {
                await bedsStore.loadBeds();
            }
            else {
                return;
            }
        }
        loadUsers();
    }, [bedsStore])

    return ROOM_NUMBERS.map((roomNumber) => ({
        roomNumber,
        roomBeds: bedsStore.beds.filter((b) => b.room === roomNumber),
    }));
};
