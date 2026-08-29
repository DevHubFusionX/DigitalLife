import { Briefcase, TrendingUp, Palette } from 'lucide-react';

interface CohortProgramsSectionProps {
  onCardClick: (title: string, program: string) => void;
}

export default function CohortProgramsSection({ onCardClick }: CohortProgramsSectionProps) {
  return (
    <section className="py-24 px-6 border-b border-black/5" id="programs">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-4 block">
              VClan Cohorts
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Structured programs.<br />Real transformation.
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-semibold max-w-xs">
            Select a cohort program below to get started.
          </p>
        </div>

        {/* 3-Column Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: MSMEs & SMEs */}
          <div
            onClick={() => onCardClick('MSMEs & SMEs', 'SOP & Operations Architecture')}
            className="bg-white border border-black/5 rounded-4xl p-8 md:p-10 flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-lg font-bold tracking-tight">MSMEs &amp; SMEs</h3>
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Operations Cohort
                  </p>
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm">
                    SOP &amp; Operations Architecture
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                    <span>4 Weeks</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">
                      8 seats
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                  The heartbeat of our community. Small businesses transitioning from informal hustle to structured scaling through our growth frameworks. Map workflows, eliminate bottlenecks, and write SOPs your team actually follows.
                </p>

                {/* Outcomes list */}
                <div className="space-y-2 pt-4 border-t border-black/5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Key Outcomes:
                  </p>
                  <div className="space-y-2">
                    {[
                      'Delivery pipeline mapping',
                      'Self-executing SOPs',
                      'CRM & automation setup',
                      'Delegation metrics',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148] shrink-0" />
                        <span className="text-slate-600 text-xs font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                FOUNDERS CIRCLE
              </span>
              <div className="h-px bg-black/5 flex-1" />
            </div>
          </div>

          {/* Card 2: Early-Stage Founders */}
          <div
            onClick={() => onCardClick('Early-Stage Founders', 'Founder Freedom & Delegation')}
            className="bg-white border border-black/5 rounded-4xl p-8 md:p-10 flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-lg font-bold tracking-tight">
                    Early-Stage Founders
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                    Leadership Cohort
                  </p>
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm">
                    Founder Freedom &amp; Delegation
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                    <span>3 Weeks</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">
                      5 seats
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                  Visionaries building the foundations of tomorrow with purpose and strategic clarity. Step out of daily operations with frameworks that run without you.
                </p>

                {/* Outcomes list */}
                <div className="space-y-2 pt-4 border-t border-black/5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Key Outcomes:
                  </p>
                  <div className="space-y-2">
                    {[
                      'Time audit framework',
                      'Task escalation matrix',
                      'KPI management',
                      'Assistant training',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148] shrink-0" />
                        <span className="text-slate-600 text-xs font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                LEADERSHIP CIRCLE
              </span>
              <div className="h-px bg-black/5 flex-1" />
            </div>
          </div>

          {/* Card 3: Creative Partners */}
          <div
            onClick={() => onCardClick('Creative Partners', 'Authority Brand & Inbound Engine')}
            className="bg-white border border-black/5 rounded-4xl p-8 md:p-10 flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-lg font-bold tracking-tight">
                    Creative Partners
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-wider text-pink-600">
                    Brand &amp; Visibility Cohort
                  </p>
                </div>
              </div>

              {/* Program Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm">
                    Authority Brand &amp; Inbound Engine
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                    <span>6 Weeks</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">
                      12 seats
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                  Designers and strategists who power the brand visibility pillar for our ecosystem. Build a high-authority content system that attracts leads without ad spend.
                </p>

                {/* Outcomes list */}
                <div className="space-y-2 pt-4 border-t border-black/5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Key Outcomes:
                  </p>
                  <div className="space-y-2">
                    {[
                      'Positioning clarity',
                      'Case study creation',
                      'Content engine setup',
                      'Referral automation',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148] shrink-0" />
                        <span className="text-slate-600 text-xs font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-black/5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                CREATIVE CLAN
              </span>
              <div className="h-px bg-black/5 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
