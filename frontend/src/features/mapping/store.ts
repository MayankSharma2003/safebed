import { makeAutoObservable, runInAction } from "mobx";
import getMatToBedMapping from "./api";
import type { MatToBedMapping } from "./api";

export class MappingStore {
    mappingData: MatToBedMapping[] = [];
    loading = false;

    constructor(){
        makeAutoObservable(this)
    }

    getMatToBedMapping = async () => {
        this.loading = true;
        try{
            const data = await getMatToBedMapping();
            runInAction(() => {
                this.mappingData = data;
            })
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => {
                this.loading = false;
            } )
        }
    }

}
