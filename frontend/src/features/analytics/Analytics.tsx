import { observer } from "mobx-react-lite";
import AnalyticsTable from "./AnalyticsTable";
import AnalyticsStatCard from "./AnalyticsStatCard";
import { TOTAL_BED } from "../../config/constants";
import { useAnalyticsData } from "./useAnalyticsData";
import { FormattedMessage } from "react-intl";
import {useIntl} from "react-intl";

const Analytics = observer(() => {
    const intl = useIntl();
    const { date, setDate, grouped } = useAnalyticsData();

    return (
        <main className="ml-64 min-h-screen overflow-y-auto  bg-[#f7f9fb] p-8 pb-20">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 -mt-4">
                <div>
                    <h3 className="text-2xl font-bold font-headline text-slate-900"><FormattedMessage id="analytics_heading" /></h3>
                    <p className="text-slate-500 text-sm"><FormattedMessage id="analytics_subheading" /></p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 font-manrope">
                <AnalyticsStatCard
                    title = {intl.formatMessage({id: "total_patients"})}
                    value={TOTAL_BED}
                    percentage={100}
                    colorClass="blue"
                    icon="groups"
                />
                <AnalyticsStatCard
                    title={intl.formatMessage({id: "stable"})}
                    value={grouped.good.length}
                    percentage={((grouped.good.length/TOTAL_BED)*100).toFixed(2)}
                    colorClass="green"
                    icon="check_circle"
                />
                <AnalyticsStatCard
                    title={intl.formatMessage({id: "needs_monitoring"})}
                    value={grouped.moderate.length}
                    percentage={((grouped.moderate.length/TOTAL_BED)*100).toFixed(2)}
                    colorClass="amber"
                    icon="monitoring"
                />
                <AnalyticsStatCard
                    title={intl.formatMessage({id: "critical"})}
                    value={grouped.poor.length}
                    percentage={((grouped.poor.length/TOTAL_BED)*100).toFixed(2)}
                    colorClass="red"
                    icon="warning"
                />
            </div>

            <AnalyticsTable grouped={grouped} />
        </main>
    );
});

export default Analytics;
