import { observer } from "mobx-react-lite";
import { FormattedMessage } from 'react-intl';
import type { AlertLogRecord } from "./api";
import type { BedsStore } from "../beds/store";

interface AlertTableProps {
    alerts: AlertLogRecord[];
    bedsStore: BedsStore;
    page: number;
    total: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
}

const AlertTable = observer(({ alerts, bedsStore, page, total, pageSize, onPageChange }: AlertTableProps) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="bg-white rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] overflow-hidden border border-slate-100 mt-4">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className='sticky top-0 overflow-x-scroll'> 
                        <tr className="bg-[#0058be] text-white font-headline">
                            <th className="px-6 py-4 font-semibold text-sm"><FormattedMessage id='username' /></th>
                            <th className="px-6 py-4 font-semibold text-sm"><FormattedMessage id='building' /></th>
                            <th className="px-6 py-4 font-semibold text-sm"><FormattedMessage id='floor/room' /></th>
                            <th className="px-6 py-4 font-semibold text-sm"><FormattedMessage id='bed' /></th>
                            <th className="px-6 py-4 font-semibold text-sm"><FormattedMessage id='status' /></th>
                            <th className="px-6 py-4 font-semibold text-sm text-right"><FormattedMessage id='time' /></th>
                            <th className="px-6 py-4 font-semibold text-sm text-right"><FormattedMessage id='action_time' /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {alerts.map((alert) => {
                            const bed = bedsStore.beds.find((b) => b.id === alert.userId);
                            const isResolved = alert.actionTaken;

                            return (
                                <tr key={alert.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0058be] font-bold text-xs">
                                                {bed?.userName?.substring(0, 2).toUpperCase() || "NA"}
                                            </div>
                                            <span className="font-bold text-slate-800">{bed?.userName || "Unknown"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{bed?.building || "-"}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-bold text-slate-700">{bed?.floor}</span>
                                        <span className="text-slate-300 mx-1">/</span>
                                        <span className="font-mono font-bold text-slate-700">{bed?.room}</span>
                                    </td>
                                    <td className="px-6 py-4 font-mono font-bold text-[#0058be]">{bed?.bed}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                            isResolved ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700 animate-pulse"
                                        }`}>
                                            {isResolved ? <FormattedMessage id="action_taken" /> : <FormattedMessage id="no_action_taken" /> }
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-500">
                                        {new Date(alert.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: "2-digit" ,timeZone: "Asia/Tokyo"})}
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-400">
                                        {alert.updatedAt !== alert.time 
                                            ? new Date(alert.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: "2-digit" ,timeZone: "Asia/Tokyo"}) 
                                            : "—"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {alerts.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-medium"><FormattedMessage id="no_record_found" /></div>
                )}
            </div>

            <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <span className="text-sm text-slate-500 font-medium">
                    <FormattedMessage id='page' /> <span className="text-slate-800">{page}</span> of {totalPages || 1}
                </span>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_left</span> <FormattedMessage id='previous' />
                    </button>
                    <button 
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="flex items-center gap-1 px-4 py-2 bg-[#0058be] text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        <FormattedMessage id='next' /> <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default AlertTable;