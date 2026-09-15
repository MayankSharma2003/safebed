import { makeAutoObservable, runInAction } from "mobx";
import { getBeds } from "./api";
import type { Bed } from "./types";


export class BedsStore {
    beds: Bed[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadBeds = async () => {
        this.loading = true;

        try {
            const data = await getBeds();
            // /api/users has no status column: status is a client-only flag driven by live alerts, so every load starts each bed back at "normal".
            const beds = data.map(bed => ({ ...bed, status: "normal" }));
            runInAction(() => {
                this.beds = beds;
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateStatus = (id: number) => {
        this.beds = this.beds.map(bed =>
            bed.id === id ? { ...bed, status: bed.status === "alert" ? "normal" : "alert" } : bed
        )
    }

    setBeds = (beds: Bed[]) => {
        this.beds = beds;
    }
}