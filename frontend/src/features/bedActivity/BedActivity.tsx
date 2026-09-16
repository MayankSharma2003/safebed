import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { getBedLogs } from "./api";
import type { BedActivityLog } from "./api";
import BedTimelineChart from "./BedActivityChart";
import { useStore } from "../../hooks/useStore";
import { FormattedMessage } from "react-intl";

export const BedActivity = observer(() => {
    const { bedsStore } = useStore();
    const [bedLogs, setBedLogs] = useState<BedActivityLog[]>([]);
    // const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
        const [date, setDate] = useState('2026-09-15');


    useEffect(() => {
        bedsStore.loadBeds();
    }, [bedsStore]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBedLogs(date);
            setBedLogs(data);
        };
        fetchData();
    }, [date]);

    return (
        <div className="flex min-h-screen overflow-y-auto bg-slate-50 font-sans">


            <main className="ml-64 flex-1 flex flex-col min-h-screen">
                <div className="p-8 max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center justify-between mb-8 -mt-4">
                        <div>
                            <h3 className="text-2xl font-bold font-headline text-slate-900"><FormattedMessage id="bed_activity_heading" /></h3>
                            <p className="text-slate-500 text-sm"><FormattedMessage id="bed_activity_subheading" /></p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                                <FormattedMessage id="select_date" />
                            </label>
                            <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-32 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                        <div className="p-4">
                            <div className="flex justify-end gap-6 mb-8 border-b border-slate-50 pb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest"><FormattedMessage id="on_bed" /></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"></div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest"><FormattedMessage id="not_on_bed" /></span>
                                </div>
                            </div>

                            <BedTimelineChart data={bedLogs} date={date} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
});
