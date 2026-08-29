import { Calendar } from 'lucide-react';
import { LightLines } from '../ui/light-lines';
import { getWhatsAppUrl, WA_MESSAGES } from '../../lib/whatsapp';

interface CommunityHeroProps {
  onExploreProgramsClick: () => void;
}

export default function CommunityHero({ onExploreProgramsClick }: CommunityHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden pt-32 pb-16 px-6 sm:px-12 bg-slate-950">
      {/* LightLines Background */}
      <LightLines
        gradientFrom="#060713"
        gradientTo="#0c0e29"
        lightColor="#ffd148"
        lineColor="#ffd148"
        linesOpacity={0.08}
        lightsOpacity={0.4}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-12">
        {/* Top Headline Grid */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-black text-white leading-none tracking-tight">
            Visibility Clan.
          </h1>

          {/* Split layout for line 2 and description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-4xl sm:text-6xl lg:text-[6.5rem] font-black text-[#ffd148]/90 leading-none tracking-tight block">
                Structured &amp; Seen.
              </span>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed max-w-sm">
                The premier business growth ecosystem for African builders. Find clarity, implement operational structure, and scale brand visibility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={getWhatsAppUrl(WA_MESSAGES.joinCommunity)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#ffd148] hover:bg-[#e6bd3e] text-slate-950 font-extrabold px-8 py-4 rounded-full text-xs transition-all shadow-md group border-none no-underline"
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/10 flex items-center justify-center font-black">
              →
            </span>
            Join our Community
          </a>
          <button
            type="button"
            onClick={onExploreProgramsClick}
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white font-bold px-8 py-4 rounded-full text-xs transition-all bg-transparent cursor-pointer"
          >
            Explore Cohort Programs
          </button>
        </div>
      </div>

      {/* Bottom stats & featured badge footer row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-10 mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Stats on the left */}
        <div className="flex flex-wrap gap-8 sm:gap-12">
          <div>
            <p className="text-white font-black text-lg tracking-tight">1,200+</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Active Builders
            </p>
          </div>
          <div>
            <p className="text-white font-black text-lg tracking-tight">4 Pillars</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Education · Mentorship · Tech · Tribe
            </p>
          </div>
          <div>
            <p className="text-white font-black text-lg tracking-tight">6–10 Wks</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Clarity to Structure
            </p>
          </div>
        </div>

        {/* Featured Cohort Badge Card on the right */}
        <div className="bg-slate-900/60 border border-white/5 p-3 rounded-2xl flex items-center gap-3 max-w-sm">
          <div className="w-8 h-8 bg-[#ffd148]/10 rounded-lg flex items-center justify-center text-[#ffd148] shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">
              New Cohort
            </p>
            <p className="text-slate-400 text-[11px] font-semibold mt-1 leading-snug">
              Applications open for Summer 2026 cohort programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
