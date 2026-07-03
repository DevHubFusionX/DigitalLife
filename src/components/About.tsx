import { motion } from 'framer-motion';
import { ArrowUpRight, Palette, BarChart3, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onOpenBooking: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  const capabilities = [
    {
      id: 'clarity',
      badge: 'Clarity',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      title: 'Business Clarity & Strategic Planning',
      desc: 'Growth begins with direction and stability. We help you define your clear business direction, ideal target market, value proposition, and a practical roadmap for sustainable growth.',
      bullets: ['Target Market Identification', 'Value Proposition refinement', 'Revenue & expansion strategy'],
      visual: (
        <div className="w-full h-28 bg-[#fffdf5] rounded-2xl p-4 flex flex-col justify-between border border-black/5 relative overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Growth Roadmap</span>
            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
              +142% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          {/* SVG Graph line */}
          <div className="absolute inset-x-0 bottom-0 h-16">
            <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-emerald" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill */}
              <path
                d="M0 60 C30 50, 60 20, 90 35 C120 50, 150 10, 200 5 L200 60 Z"
                fill="url(#gradient-emerald)"
              />
              {/* Stroke */}
              <motion.path
                d="M0 60 C30 50, 60 20, 90 35 C120 50, 150 10, 200 5"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 'social',
      badge: 'Visibility',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      title: 'Social Media Management',
      desc: 'Visibility with structure — not noise. We manage your brand presence with a clear content strategy, structured posting, and storytelling that converts visibility into revenue.',
      bullets: ['Content strategy', 'Structured posting', 'Audience engagement approach'],
      visual: (
        <div className="w-full h-28 bg-[#fffdf5] rounded-2xl p-4 border border-black/5 relative overflow-hidden group-hover:border-indigo-500/30 transition-all duration-300 flex flex-col gap-2.5">
          {/* Header of browser */}
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          {/* Mock boxes */}
          <div className="flex gap-3">
            <div className="w-1/3 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <div className="h-2 bg-slate-200 rounded-full w-full" />
              <div className="h-2 bg-slate-200 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'structure',
      badge: 'Structure',
      badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      title: 'Formalization, Structure & Operations',
      desc: 'From informal hustle to structured enterprise. We support businesses in formalization, operational system design, role and responsibility clarity, and SOP development.',
      bullets: ['Business formalization', 'Workflow structuring & SOPs', 'Internal growth frameworks'],
      visual: (
        <div className="w-full h-28 bg-[#fffdf5] rounded-2xl p-4 border border-black/5 relative overflow-hidden group-hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Efficiency rate</span>
            <BarChart3 className="w-4 h-4 text-amber-600" />
          </div>
          {/* Mini funnel visual */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-full h-2 bg-amber-500/10 border border-amber-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[85%]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500 w-8">85%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full h-2 bg-amber-500/10 border border-amber-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 w-[38%]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500 w-8">38%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'website',
      badge: 'Web design',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      title: 'Website Design & Development',
      desc: 'Your digital storefront. Built to convert. We design and develop websites, e-commerce stores, and portfolios that reflect your brand authority and guide visitors toward action.',
      bullets: ['Credibility & authority', 'Clear service presentation', 'Action-oriented layouts'],
      visual: (
        <div className="w-full h-28 bg-[#fffdf5] rounded-2xl p-4 border border-black/5 relative overflow-hidden group-hover:border-indigo-500/30 transition-all duration-300 flex flex-col gap-2.5">
          {/* Header of browser */}
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          {/* Mock boxes */}
          <div className="flex gap-3">
            <div className="w-1/3 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <div className="h-2 bg-slate-200 rounded-full w-full" />
              <div className="h-2 bg-slate-200 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'trainings',
      badge: 'Trainings',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      title: 'Business Development Trainings',
      desc: 'Empowering people to build stronger businesses. We deliver structured trainings for MSMEs, SMEs, communities, and NGOs focused on practical, actionable frameworks.',
      bullets: ['Practical frameworks', 'Sustainable scaling strategy', 'Structure & systems focus'],
      visual: (
        <div className="w-full h-28 bg-[#fffdf5] rounded-2xl p-4 flex flex-col justify-between border border-black/5 relative overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Knowledge retention</span>
            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
              +142% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          {/* SVG Graph line */}
          <div className="absolute inset-x-0 bottom-0 h-16">
            <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-emerald-2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill */}
              <path
                d="M0 60 C30 50, 60 20, 90 35 C120 50, 150 10, 200 5 L200 60 Z"
                fill="url(#gradient-emerald-2)"
              />
              {/* Stroke */}
              <motion.path
                d="M0 60 C30 50, 60 20, 90 35 C120 50, 150 10, 200 5"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#fffdf5]" id="about">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Tagline */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-0.5 bg-slate-900" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#717b72]">
            About Us
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Sticky Title & Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Who We Are
            </h2>
            <p className="text-[#717b72] text-sm md:text-base leading-relaxed mb-8 font-semibold">
              Digitalife Ehub is a business development and brand management firm focused on empowering MSMEs, SMEs, early-stage entrepreneurs, and informal businesses to build structured, scalable, and visible enterprises.
            </p>

            {/* Cultural Checkpoints */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                'Strategic thinkers',
                'System builders',
                'Growth partners.'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#ffd148] shrink-0 mt-0.5" />
                  <span className="text-slate-800 text-sm font-semibold">{text}</span>
                </div>
              ))}
            </div>

            {/* Contact Callout */}
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ x: 6 }}
              className="inline-flex items-center gap-2 text-slate-900 font-bold text-sm hover:text-[#ffd148] transition-colors group cursor-pointer bg-transparent border-none p-0"
            >
              Book a 30 minutes clarity call
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>

          {/* Right Column: High Fidelity Capability Cards Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {capabilities.map((cap) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white md:bg-white/60 border border-black/5 rounded-3xl p-6 md:p-8 md:backdrop-blur-md shadow-sm relative group transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center"
              >
                {/* Text Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-md border ${cap.badgeColor}`}>
                      {cap.badge}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#717b72] leading-relaxed font-semibold mb-4 max-w-md">
                    {cap.desc}
                  </p>
                  {/* Capabilities list */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {cap.bullets.map((b, idx) => (
                      <span key={idx} className="text-[10px] md:text-xs font-bold text-slate-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900/30" /> {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Micro-Interactive Visual Side */}
                <div className="w-full md:w-56 shrink-0 self-stretch flex items-center justify-center">
                  {cap.visual}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
