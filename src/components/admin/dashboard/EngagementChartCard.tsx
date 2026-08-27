interface ChartMonthData {
  label: string;
  paidHeight: string;
  freeHeight: string;
  paidCount: number;
  freeCount: number;
}

interface EngagementChartCardProps {
  chartData: ChartMonthData[];
  paidLeadsCount: number;
  freeLeadsCount: number;
  totalLeadsCount: number;
}

export default function EngagementChartCard({
  chartData,
  paidLeadsCount,
  freeLeadsCount,
  totalLeadsCount,
}: EngagementChartCardProps) {
  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[340px] sm:min-h-[360px]">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-slate-950">Resource Sales &amp; Downloads</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Monthly breakdown of paid checkouts vs. free unlocks
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#ff5f38]" /> Paid Sales
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-950" /> Free Unlocks
            </span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 font-extrabold mt-3 uppercase tracking-wider">
          Conversion Telemetry
        </p>

        {/* Dual Column Bars Area */}
        <div className="mt-4 flex items-end justify-between gap-1.5 sm:gap-2 h-44 pb-2 border-b border-slate-100 overflow-x-auto">
          {chartData.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2 grow min-w-[24px] group cursor-pointer">
              <div className="flex flex-col justify-end items-center gap-1 h-36 w-full max-w-[28px]">
                {/* Orange Top Bar (Paid Purchases) */}
                <div
                  className="w-full rounded-md bg-[#ff5f38] transition-all group-hover:scale-105"
                  style={{
                    height: d.paidHeight,
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.2) 3px, rgba(255,255,255,0.2) 6px)',
                  }}
                  title={`${d.label}: ${d.paidCount} Paid Sales`}
                />
                {/* Black Bottom Bar (Free SOP Unlocks) */}
                <div
                  className="w-full rounded-md bg-slate-950 transition-all group-hover:scale-105"
                  style={{ height: d.freeHeight }}
                  title={`${d.label}: ${d.freeCount} Free Unlocks`}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-950 transition-colors">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Y-axis Metric Scales */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2 flex-wrap gap-1">
        <span>0</span>
        <span>{paidLeadsCount} Paid</span>
        <span>{freeLeadsCount} Free</span>
        <span>{totalLeadsCount} Total</span>
      </div>
    </div>
  );
}
