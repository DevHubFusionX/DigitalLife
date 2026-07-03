import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SELAR_CLARITY_CALL_URL } from '../lib/whatsapp';

export default function Hero() {
  return (
    <section className="relative pt-36 pb-28 overflow-hidden bg-[#fffdf5]">
      {/* Subtle decorative elements for a premium feel */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-[#ffd148]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#3e4095]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center" id="home">
        <span className="text-[#3e4095] text-xs font-black uppercase tracking-widest mb-4 bg-[#3e4095]/5 px-4 py-2 rounded-full">
          Building People. Brands. Purpose.
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-slate-900 leading-[1.1] mb-8 max-w-4xl">
          From Hustle to<br />
          <span className="text-[#3e4095]">Structured Growth.</span>
        </h1>

        <p className="text-[#717b72] text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-medium">
          Gain clarity, boost your visibility, and build a strong operational structure in 6–10 weeks with our hands-on business development support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20 w-full sm:w-auto">
          <a
            href={SELAR_CLARITY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-full text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg hover:shadow-xl w-full sm:w-auto no-underline tracking-wider"
          >
            BOOK YOUR FREE CLARITY SESSION <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/services"
            className="bg-white hover:bg-slate-50 border border-black/10 text-slate-900 font-bold px-8 py-4 rounded-full text-xs flex items-center justify-center transition-all shadow-sm w-full sm:w-auto no-underline tracking-wider"
          >
            OUR SERVICES
          </Link>
        </div>

        {/* Brand Trust Section */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[#717b72] text-[10px] font-black tracking-widest uppercase">
            Trusted by high-performance MSMEs &amp; Founders
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 opacity-70 text-slate-800 font-bold text-xs">
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#3e4095] rounded-full animate-pulse" />
              Vanguard Ops
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#ffd148] rounded-full animate-pulse" />
              FlowScale Studio
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full animate-pulse" />
              Sovereign Partners
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
