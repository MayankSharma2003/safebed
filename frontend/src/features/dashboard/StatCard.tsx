import React from 'react';

type StatCardVariant = 'default' | 'clinical';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: string;
  trend?: string;
  variant?: StatCardVariant;
  isAlert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subValue, 
  icon, 
  trend, 
  variant = 'default', 
  isAlert = false 
}) => {
  const containerStyles = variant === 'clinical' 
    ? 'bg-gradient-to-br from-[#0058be] to-[#2170e4] text-white shadow-lg shadow-blue-500/20' 
    : 'bg-white border border-slate-200/60 text-slate-900 shadow-sm';

  const iconBoxStyles = variant === 'clinical'
    ? 'bg-white/20 text-white'
    : isAlert 
      ? 'bg-red-50 text-[#b61722]' 
      : 'bg-blue-50 text-blue-600';

  const titleColor = variant === 'clinical' ? 'text-white/80' : 'text-slate-500';
  const subValueColor = variant === 'clinical' ? 'text-white/70' : 'text-slate-400';

  return (
    <div className={`${containerStyles} p-6 rounded-xl transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`${iconBoxStyles} p-2 rounded-lg flex items-center justify-center`}>
          <span className="material-symbols-outlined text-[24px]">
            {icon}
          </span>
        </div>

        {trend && (
          <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200/50">
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className={`${titleColor} text-sm font-medium mb-1 uppercase tracking-tight`}>
          {title}
        </p>
        <h3 className="text-3xl font-bold font-headline">
          {value}
          {subValue && (
            <span className={`${subValueColor} text-sm font-normal ml-1`}>
              {subValue}
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;