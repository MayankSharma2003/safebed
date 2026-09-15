import { socketService } from "./socketClient";
import { rootStore } from "../stores/RootStore";

let isSocketInitialized = false;

export function initSocket() {
    const { bedsStore, alertStore } = rootStore;

    if (isSocketInitialized) {
        return;
    }

    isSocketInitialized = true;

    socketService.connect();

    socketService.on("device_update", (idS: { matId: number; alertId: number }) => {
        const bed = bedsStore.beds.find((b) => b.id === idS.matId);

        if (!bed) {
            console.warn("❌ Bed not found for:", idS.matId);
            return;
        }

        const alert = {
            matId: idS.matId,
            alertId: idS.alertId,
            bedId: bed.id,
            building: bed.building,
            floor: bed.floor,
            room: bed.room,
            bed: bed.bed,
            message: `Alert: Room ${bed.room}, Bed ${bed.bed.toUpperCase()}.`,
        };

        alertStore.addAlert(alert);
    });
}