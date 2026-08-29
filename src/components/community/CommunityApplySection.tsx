import { ArrowRight, Target } from 'lucide-react';

interface CommunityApplySectionProps {
  onApplyClick: () => void;
}

export default function CommunityApplySection({ onApplyClick }: CommunityApplySectionProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6">
            Apply to VClan
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-6">
            Lock your<br />seat.
          </h2>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
            <Target className="w-4 h-4 text-[#3e4095]" />
            Applications are direct via WhatsApp and reviewed immediately.
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-md">
          <h3 className="text-xl font-bold text-slate-950 mb-3">Apply via WhatsApp</h3>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
            Skip forms. Chat directly with our cohort coordinator to apply and lock your seat for the next cohort.
          </p>
          <button
            type="button"
            onClick={onApplyClick}
            className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-black py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            Apply via WhatsApp <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
