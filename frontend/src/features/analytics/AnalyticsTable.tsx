import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import type { FormattedAnalyticsRow } from "./groupBySleepQuality";

export type TabType = "good" | "moderate" | "poor";

type props = {
    grouped: Record<TabType, FormattedAnalyticsRow[]>,
}

const AnalyticsTable: React.FC<props> = observer(({ grouped }) => {

    const [activeTab, setActiveTab] = useState<TabType>("good");

    const displayData = grouped[activeTab];

    const tabStyles = {
        good: activeTab === "good"
            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
            : "text-slate-600 hover:bg-slate-100",
        moderate: activeTab === "moderate"
            ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
            : "text-slate-600 hover:bg-slate-100",
        poor: activeTab === "poor"
            ? "bg-rose-600 text-white shadow-lg shadow-rose-200"
            : "text-slate-600 hover:bg-slate-100",
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center bg-slate-200/50 p-1.5 rounded-xl w-fit">
                    {(["good", "moderate", "poor"] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all flex items-center ${tabStyles[tab]}`}
                        >
                            {activeTab === tab && (
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2" />
                            )}
                            {<FormattedMessage id={tab} />}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 px-2 text-[11px] text-slate-500 border-l-2 border-slate-200 pl-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-700"><FormattedMessage id="good" />:</span>
                        <FormattedMessage id="good.desc" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="font-bold text-slate-700"><FormattedMessage id="moderate" />:</span>
                        <FormattedMessage id="moderate.desc" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="font-bold text-slate-700"><FormattedMessage id="poor" />:</span>
                        <FormattedMessage id="poor.desc" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0058be] text-white font-headline">
                            <th className="px-6 py-4"><FormattedMessage id="username" /></th>
                            <th className="px-6 py-4"><FormattedMessage id="floor/room" /></th>
                            <th className="px-6 py-4"><FormattedMessage id="bed" /></th>
                            <th className="px-6 py-4"><FormattedMessage id="on_bed" /></th>
                            <th className="px-6 py-4"><FormattedMessage id="not_on_bed" /></th>
                            <th className="px-6 py-4"><FormattedMessage id="total" /></th>
                            <th className="px-6 py-4 text-right"><FormattedMessage id="status" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {displayData.map((item) => {
                            const sleep = `${item.lowHoursFormatted}h ${item.lowMinutesFormatted}m`;
                            const awake = `${item.highHoursFormatted}h ${item.highMinutesFormatted}m`;
                            const total = `${item.totalHoursFormatted}h ${item.totalMinutesFormatted}m`
                            return (
                                <tr key={item.userDetails.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                                                {item.userDetails.userName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-slate-800">{item.userDetails.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                        {item.userDetails.floor} / {item.userDetails.room}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase">
                                            {item.userDetails.bed}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'good' ? 'bg-emerald-500' : activeTab === 'moderate' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                                            <span className="text-slate-700 font-bold text-sm">{sleep}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-rose-600 font-bold text-sm">{awake}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">{total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${activeTab === 'good' ? 'bg-emerald-100 text-emerald-700' :
                                            activeTab === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                            {<FormattedMessage id={activeTab} />}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {displayData.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-medium"><FormattedMessage id="no_record_found" /></div>
                )}
            </div>
        </div>
    );
})

export default AnalyticsTable;