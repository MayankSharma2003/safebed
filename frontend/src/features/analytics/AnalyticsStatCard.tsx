import React from 'react';
import { useIntl } from 'react-intl';

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number | string;
  colorClass: 'blue' | 'green' | 'amber' | 'red';
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, colorClass, icon }) => {

  const intl = useIntl()

  const barColors = {
    blue: "bg-blue-600",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-600",
  };

  const iconStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  const valueColors = {
    blue: "text-blue-700",
    green: "text-emerald-700",
    amber: "text-amber-700",
    red: "text-red-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group font-manrope">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
            {title}
          </p>
          <h3 className={`text-3xl font-black tracking-tight ${valueColors[colorClass]}`}>
            {value}
          </h3>
        </div>
        
        <div className={`w-12 h-12 rounded-xl ${iconStyles[colorClass]} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
          <span className="material-symbols-outlined text-[28px] font-light">
            {icon}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
             <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{intl.formatMessage({id: "capacity"})}</span>
             <span className="text-[10px] font-bold text-slate-500">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColors[colorClass]} transition-all duration-1000 ease-out`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;