import { observer } from "mobx-react-lite";
import LogStats from "./AlertLogsStatsCard";
import AlertTable from "./AlertLogsTable";
import { useAlertLogsData } from "./useAlertLogsData";
import { FormattedMessage } from 'react-intl';

export const AlertLogs = observer(() => {
    const { bedsStore, alerts, date, setDate, page, setPage, pageSize, total } = useAlertLogsData();

    return (
        <main className="ml-64 min-h-screen overflow-y-auto bg-[#f7f9fb] p-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 -mt-4">
                <div>
                    <h3 className="text-2xl font-bold font-headline text-slate-900"><FormattedMessage id="alert_logs" /></h3>
                    <p className="text-slate-500 text-sm"><FormattedMessage id="alert_logs_subheading" /></p>
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

            <LogStats total={total} alerts={alerts} />

            <AlertTable
                alerts={alerts}
                bedsStore={bedsStore}
                page={page}
                total={total}
                pageSize={pageSize}
                onPageChange={(p) => setPage(p)}
            />
        </main>
    )
})
