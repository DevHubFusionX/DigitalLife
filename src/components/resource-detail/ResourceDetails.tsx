import { Check, ArrowRight } from 'lucide-react';

interface ResourceDetailsProps {
  deliverables?: string[];
  outcomes?: string[];
}

export default function ResourceDetails({ deliverables, outcomes }: ResourceDetailsProps) {
  return (
    <div className="lg:col-span-7 space-y-8">
      {/* Deliverables Card */}
      <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 bg-[#3e4095]/5 border border-[#3e4095]/10 px-4 py-2.5 rounded-full self-start w-fit">
          <Check className="w-4 h-4 text-white bg-slate-950 rounded-full p-0.5" />
          <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">
            What's Included In This Package
          </span>
        </div>

        {deliverables && deliverables.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-600">
                <span className="text-[#ffd148] font-bold mt-0.5 select-none mr-1.5">›</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 font-semibold italic">No deliverables listed.</p>
        )}
      </div>

      {/* Target Outcomes */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Target Outcomes &amp; Benefits</h3>
        {outcomes && outcomes.length > 0 ? (
          <ul className="space-y-3 p-0 list-none">
            {outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                <ArrowRight className="w-4 h-4 text-[#3e4095] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 font-semibold italic">No outcomes listed.</p>
        )}
      </div>
    </div>
  );
}
