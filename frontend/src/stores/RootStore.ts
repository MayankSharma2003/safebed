import { AlertStore } from "../features/alerts/store";
import { BedsStore } from "../features/beds/store";
import { MappingStore } from "../features/mapping/store";

export class RootStore {
    bedsStore: BedsStore;
    mappingStore: MappingStore;
    alertStore: AlertStore;

    constructor(){
        this.bedsStore = new BedsStore();
        this.mappingStore = new MappingStore();
        this.alertStore = new AlertStore();
    }
}

export const rootStore = new RootStore();