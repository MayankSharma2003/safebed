import React from 'react';
import type { Bed } from '../beds/types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { updateActionTaken } from '../alerts/api';
import { triggerAlert } from '../alerts/triggerAlert';
import { toast } from "react-toastify"
import { FormattedMessage } from 'react-intl';

type props = {
    bed: Bed
}

const BedItem: React.FC<props> = observer(({ bed }) => {
    const { alertStore } = useStore();
    const alert = alertStore.getAlertByBedId(bed.id);

    const handleAcknowledge = async () => {
        if (!alert) return;

        triggerAlert(alert.matId);

        await updateActionTaken(alert.alertId, alert, triggerAlert);

        const toastId = alertStore.getToastId(alert.alertId);
        if (toastId) {
            toast.dismiss(toastId);
            alertStore.removeToastId(alert.alertId);
        }

        alertStore.clearActiveAlert();
    };


    return (
        <div className={`grid ${bed.status === "alert" ? "grid-rows-2" : ""}`}>
            <div className={`p-4 rounded-lg flex items-center justify-between transition-all ${bed.status === "alert" ? "bg-red-50 border-l-4 border-red-700 animate-pulse [animation-duration:0.2s]" : "bg-slate-50 border-l-4 border-transparent"}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-colors ${bed.status === "alert" ? "bg-white text-[#b61722] border-red-200 shadow-sm" : "bg-white text-blue-600 border-slate-200"}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: bed.status === "alert" ? "'FILL' 1" : "'FILL' 0" }}>
                            {bed.status === "alert" ? "bolt" : "king_bed"}
                        </span>
                    </div>
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-tighter ${bed.status === "alert" ? "text-red-700" : "text-slate-500"}`}>
                            {bed.bed}
                        </p>
                        <p className="font-semibold text-slate-900 leading-tight">
                            {bed.userName || "Unassigned"}
                        </p>
                    </div>
                </div>

                {bed.bed === 'BED-1' || bed.bed === 'BED-5' || bed.bed === 'BED-6' || bed.bed === 'BED-9' || bed.bed === 'BED-12' || bed.bed === 'BED-7' 
                ? 
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-amber-200 text-amber-900`}>
                    <FormattedMessage id="high_fall_risk" />
                </span>
                : <></>}
                
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${bed.status === "alert" ? "bg-[#da3437] text-white" : "bg-green-100 text-green-700"}`}>
                    {bed.status === "normal" ? <FormattedMessage id="normal" /> : <FormattedMessage id="alert" />}
                </span>
            </div>
            <div className='items-center'>
                {bed.status === "alert" && (
                    <button
                        onClick={handleAcknowledge}
                        className="w-full p-3 h-fit mt-4 bg-[#b61722] text-white py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#930013] transition-colors"
                    >
                        <FormattedMessage id="acknowledge_alert" />
                    </button>
                )}
            </div>
        </div>
    );
});

export default BedItem;