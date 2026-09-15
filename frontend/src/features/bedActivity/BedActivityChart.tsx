import ReactECharts from "echarts-for-react";
import { transformToChartData } from "./transformChartData";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useIntl } from "react-intl";
import type { BedActivityLog } from "./api";
import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from "echarts";

type Props = {
    data: BedActivityLog[];
    date: string;
};

type ChartPointValue = [string, number, number, string, string | null, string | null];

const BedTimelineChart: React.FC<Props> = observer(({ data, date }) => {
    const intl = useIntl()
    const { bedsStore } = useStore();

    if (!bedsStore.beds.length) {
        return <div className="flex items-center justify-center text-slate-400 animate-pulse">Loading Bed Data...</div>;
    }

    const chartData = transformToChartData(data, bedsStore.beds, date);
    const users = [...new Set(chartData.map((d) => d.name))];

    const formatTime = (dateStr: string | null) => {
        if (!dateStr) return "24:00";
        const d = new Date(dateStr);
        return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    };

    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            borderRadius: 12,
            padding: 12,
            borderWidth: 0,
            shadowBlur: 15,
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            formatter: (params: { value: ChartPointValue }) => {
                const [user, , , action, startRaw, endRaw] = params.value;
                const color = action === "Not on bed" ? "text-rose-500" : "text-emerald-500";
                const value: string = action === "Not on bed" ? "not_on_bed" : "on_bed"
                return `
                    <div style="font-family: sans-serif;">
                        <div style="color: #94a3b8; font-size: 10px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">${user}</div>
                        <div style="color: #1e293b; font-size: 14px; font-weight: 800;">${formatTime(startRaw)} - ${formatTime(endRaw)}</div>
                        <div style="font-size: 11px; font-weight: 700;" class="${color}">${intl.formatMessage({id: value})}</div>
                    </div>
                `;
            }
        },
        grid: {
            left: 30,
            right: 40,
            top: 0,
            bottom: 40,
            containLabel: true
        },
        xAxis: {
            type: "value",
            min: 0,
            max: 24,
            interval: 2,
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
            axisLabel: { 
                color: '#94a3b8', 
                fontWeight: '700', 
                fontSize: 10,
                formatter: (value: number) => `${value}:00` 
            }
        },
        yAxis: {
            type: "category",
            data: users,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { 
                color: '#334155', 
                fontWeight: '800', 
                fontSize: 12,
                margin: 20
            }
        },
        series: [
            {
                type: "custom",
                renderItem: function (_params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
                    const category = api.value(0);
                    const start = api.coord([api.value(1), category]);
                    const end = api.coord([api.value(2), category]);
                    const height = (api.size!([0, 1]) as number[])[1] * 0.5;

                    return {
                        type: "rect",
                        shape: {
                            x: start[0],
                            y: start[1] - height / 2,
                            width: Math.max(end[0] - start[0], 3),
                            height: height,
                            r: [4, 4, 4, 4]
                        },
                        style: {
                            fill: api.value(3) === "Not on bed" ? "#da3437" : "#007432",
                        }
                    };
                },
                encode: { x: [1, 2], y: 0 },
                data: chartData.map((d) => ({ value: d.value })),
                markLine: (date === new Date().toISOString().split("T")[0]) ? {
                    silent: true,
                    animation: false,
                    symbol: "none",
                    lineStyle: { type: "dashed", color: "#3b82f6", width: 2 },
                    data: [{
                        xAxis: new Date().getHours() + new Date().getMinutes() / 60,
                        label: {
                            formatter: intl.formatMessage({id: "now"}),
                            position: "end",
                            backgroundColor: "#3b82f6",
                            color: "#fff",
                            padding: [4, 8],
                            borderRadius: 6,
                            fontSize: 10,
                            fontWeight: "bold"
                        }
                    }]
                } : undefined,
            }
        ]
    };

    return <ReactECharts option={option} style={{ height: 500 }} />;
});

export default BedTimelineChart;