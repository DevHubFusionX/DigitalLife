import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import heroManImg from '../assets/hero_man.png';
import officeFlatlayImg from '../assets/office_flatlay.png';
import lemonsImg from '../assets/lemons.png';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#fffdf5]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Column: Headline and Call-to-Actions */}
        <div className="lg:col-span-5 flex flex-col justify-center" id="home">
          <span className="text-[#ffd148] text-xs font-bold uppercase tracking-wider mb-3 block">
            Building People. Brands. Purpose.
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            From Hustle to Structured Growth.
          </h1>

          <p className="text-[#717b72] text-sm md:text-[16px] leading-relaxed mb-8 max-w-lg font-medium">
            Gain clarity, boost your visibility, and build a strong operational structure in 6–10 weeks with our hands-on business development support.
          </p>          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-16">
            <button
              onClick={onOpenBooking}
              className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-full text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm w-full sm:w-auto"
            >
              Book Your Free Growth Clarity Session <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/services"
              className="text-slate-900 font-bold text-sm underline underline-offset-4 hover:text-slate-700 transition-colors pl-2 sm:pl-0"
            >
              Our Services
            </Link>
          </div>

          {/* Brand Trust Section */}
          <div className="flex flex-col gap-3">
            <span className="text-[#717b72] text-[10px] font-black tracking-widest uppercase">
              Trusted by high-performance MSMEs &amp; Founders
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-60 text-slate-800 font-bold text-xs">
              <span className="flex items-center gap-1.5 bg-slate-900/5 px-3 py-1.5 rounded-lg border border-black/5">
                <span className="w-1.5 h-1.5 bg-[#3e4095] rounded-full animate-pulse" />
                Vanguard Ops
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/5 px-3 py-1.5 rounded-lg border border-black/5">
                <span className="w-1.5 h-1.5 bg-[#ffd148] rounded-full animate-pulse" />
                FlowScale Studio
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/5 px-3 py-1.5 rounded-lg border border-black/5">
                <span className="w-1.5 h-1.5 bg-[#bfd6c6] rounded-full animate-pulse" />
                Sovereign Partners
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Responsive Bento Grid Layout */}
        <div className="lg:col-span-7 mt-10 lg:mt-0">

          {/* Mobile-only layout (visible below md) */}
          <div className="block md:hidden space-y-6">
            {/* Smiling man card */}
            <div className="relative w-full h-[280px] rounded-3xl bg-[#bfd6c6] overflow-hidden shadow-md">
              <img src={heroManImg} className="w-full h-full object-cover object-center" alt="Professional podcasting" />
              {/* Overlapping trending-up circle badge */}
              <div className="absolute top-6 right-6 z-10 w-12 h-12 bg-black text-[#ffd148] rounded-full flex items-center justify-center border-4 border-[#fffdf5] shadow-lg">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Side-by-side subcards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Flatlay office card */}
              <div className="h-[160px] rounded-2xl overflow-hidden shadow-sm">
                <img src={officeFlatlayImg} className="w-full h-full object-cover object-center" alt="Collaborative workspace" />
              </div>
              {/* Lemons card */}
              <div className="h-[160px] rounded-2xl bg-[#ebd137] p-4 flex flex-col justify-between overflow-hidden shadow-sm relative">
                <div className="z-10">
                  <div className="text-[26px] font-extrabold text-white leading-none mb-0.5">6-10</div>
                  <div className="text-[8px] text-white/95 leading-tight font-bold">
                    Weeks to build operations structure
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 left-0 h-[60px] overflow-hidden rounded-b-2xl">
                  <img src={lemonsImg} className="w-full h-full object-cover object-bottom" alt="Lemons" />
                </div>
              </div>
            </div>

            {/* Black chart card */}
            <div className="bg-black text-white p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 border border-white/5">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-[#ffd148] uppercase font-bold tracking-wider">Imagine This...</span>
                <p className="text-xs font-bold text-slate-100 leading-tight">Clear direction, organized operations, strong brand presence, and consistent growth.</p>
              </div>
              <div className="flex items-end gap-1 h-10 shrink-0">
                <div className="w-2 h-5 bg-[#ffd148]/25 rounded-t-[2px]" />
                <div className="w-2 h-7 bg-[#ffd148]/50 rounded-t-[2px]" />
                <div className="w-2 h-10 bg-[#ffd148] rounded-t-[2px]" />
              </div>
            </div>
          </div>

          {/* Desktop/Tablet layout (visible md and up) */}
          <div className="hidden md:block relative w-full h-[520px] md:h-[580px] lg:h-[550px]">
            {/* Main vertical card (smiling man with headphones) */}
            <div className="absolute left-[5%] top-6 w-[55%] h-[400px] md:h-[430px] rounded-3xl bg-[#bfd6c6] overflow-hidden flex items-end shadow-lg shadow-black/5">
              <img src={heroManImg} className="w-full h-full object-cover object-center" alt="Professional podcasting" />
              {/* Overlapping trending-up circle badge */}
              <div className="absolute top-16 right-[-24px] z-10 w-14 h-14 bg-black text-[#ffd148] rounded-full flex items-center justify-center border-[5px] border-[#fffdf5] shadow-lg">
                <TrendingUp className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Overlapping bottom-left black chart card */}
            <div className="absolute left-0 bottom-4 z-20 w-[270px] bg-black text-white p-4.5 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-white/5">
              <div className="flex flex-col gap-1.5">
                <div className="text-[9px] text-[#ffd148] uppercase font-bold tracking-wider">Imagine This...</div>
                <div className="text-sm font-bold text-slate-100 leading-tight">Clear direction, organized operations, strong brand presence, and consistent growth.</div>
              </div>
              {/* Bar chart indicator */}
              <div className="flex items-end gap-1.5 h-12 shrink-0 pr-1">
                <div className="w-2.5 h-6 bg-[#ffd148]/25 rounded-t-[2px]" />
                <div className="w-2.5 h-9 bg-[#ffd148]/50 rounded-t-[2px]" />
                <div className="w-2.5 h-12 bg-[#ffd148] rounded-t-[2px]" />
              </div>
            </div>

            {/* Right stacked cards column */}
            <div className="absolute right-[5%] top-0 w-[33%] flex flex-col gap-4">
              {/* Top-Right: Flatlay office card */}
              <div className="w-full h-[200px] md:h-[220px] rounded-3xl overflow-hidden shadow-lg shadow-black/5">
                <img src={officeFlatlayImg} className="w-full h-full object-cover object-center" alt="Collaborative workspace" />
              </div>

              {/* Bottom-Right: Yellow lemons card */}
              <div className="w-full h-[240px] md:h-[260px] rounded-3xl bg-[#ebd137] p-5 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/5 relative">
                <div className="z-10">
                  <div className="text-[34px] md:text-[38px] font-extrabold text-white leading-none mb-1">6-10</div>
                  <div className="text-[10px] md:text-[11px] text-white/95 leading-tight font-bold max-w-35">
                    Weeks to build a strong operational structure with hands-on support
                  </div>
                </div>

                {/* Separator line */}
                <div className="h-[2px] bg-white/20 w-full z-10 my-2" />

                {/* Lemons image absolute positioning in bottom of yellow card */}
                <div className="absolute bottom-0 right-0 left-0 h-[100px] md:h-[110px] overflow-hidden rounded-b-3xl">
                  <img src={lemonsImg} className="w-full h-full object-cover object-bottom" alt="Lemons" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
