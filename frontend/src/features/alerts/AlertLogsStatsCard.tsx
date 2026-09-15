import { FormattedMessage } from "react-intl";
import type { AlertLogRecord } from "./api";

interface LogStatsProps {
    total: number;
    alerts: AlertLogRecord[];
}

const LogStats = ({ total, alerts }: LogStatsProps) => {
    const unaddressed = alerts.filter(a => !a.actionTaken).length;
    const responseRate = total > 0 ? Math.round(((alerts.length - unaddressed) / alerts.length) * 100) : 0;

    const stats = [
        { id: "1", label: <FormattedMessage id="addressed"/>, value: alerts.length - unaddressed, icon: "analytics", color: "text-blue-600", bg: "bg-blue-50" },
        { id: "2", label: <FormattedMessage id="unaddressed"/>, value: unaddressed, icon: "warning", color: "text-red-600", bg: "bg-red-50" },
        { id: "3", label: <FormattedMessage id="response_percentage"/>, value: `${responseRate}%`, icon: "speed", color: "text-green-600", bg: "bg-green-50" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat) => (
                <div key={stat.id} className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <h4 className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</h4>
                    </div>
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LogStats;