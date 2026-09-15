import { rootStore } from "../../stores/RootStore";

export const triggerAlert = (id: number) => {
    rootStore.bedsStore.updateStatus(id)
};