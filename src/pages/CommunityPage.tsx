import { useEffect } from 'react';
import { ArrowRight, Target, Calendar, Briefcase, TrendingUp, Palette } from 'lucide-react';
import { LightLines } from '../components/ui/light-lines';
import { openWhatsApp, getWhatsAppUrl, WA_MESSAGES } from '../lib/whatsapp';

export default function CommunityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Visibility Clan · VClan | Digitalife Ehub';
  }, []);

  const handleApplyClick = () => {
    openWhatsApp("Hi Digitalife Ehub, I would like to apply for the next VClan cohort program.");
  };

  const handleCardClick = (title: string, program: string) => {
    openWhatsApp(`Hi Digitalife Ehub, I would like to apply for the "${program}" cohort program for ${title}.`);
  };

  return (
    <div className="bg-[#fffdf5]">

      {/* ─── NEW IMAGE-INSPIRED DITTO HERO ─────────────────────── */}
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
                  Structured & Seen.
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
              <span className="w-5 h-5 rounded-full bg-slate-950/10 flex items-center justify-center font-black">→</span>
              Join our Community
            </a>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
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
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Active Builders</p>
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight">4 Pillars</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Education · Mentorship · Tech · Tribe</p>
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight">6–10 Wks</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Clarity to Structure</p>
            </div>
          </div>

          {/* Featured Cohort Badge Card on the right */}
          <div className="bg-slate-900/60 border border-white/5 p-3 rounded-2xl flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 bg-[#ffd148]/10 rounded-lg flex items-center justify-center text-[#ffd148] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none">New Cohort</p>
              <p className="text-slate-400 text-[11px] font-semibold mt-1 leading-snug">
                Applications open for Summer 2026 cohort programs.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ─── WHO WE ARE ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095]">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              More than a community.<br />A structured growth ecosystem.
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
              Visibility Clan (VClan) is a premium business growth community purpose-built to help young entrepreneurs, MSMEs, and startups across Nigeria and Africa find the clarity, structure, and visibility they need to compete, scale, and win in today's digital economy.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              VClan operates at the critical intersection of education, mentorship, technology, and community — bridging the gap between raw entrepreneurial potential and structured, scalable business success.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              We exist because a fundamental market failure has gone unaddressed: over 80% of small businesses dominate Nigeria's labour market, yet contribute less than 50% of national economic output. The root cause is not lack of effort or ambition — it is poor visibility, structural deficiency, and severely limited access to mentorship and resources.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              VClan is the answer. We are building a tribe of visible, structured, and thriving business owners who learn together, grow together, and support one another on the journey from obscurity to authority.
            </p>

            <div className="bg-[#3e4095]/5 border border-[#3e4095]/10 rounded-3xl p-6 md:p-8 flex flex-col gap-3">
              <h3 className="text-base font-black text-[#3e4095] tracking-wider uppercase">Our Core Identity</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">
                Visibility Clan is not just a community — it is a business growth platform that provides the tools, training, mentorship, and network that Nigerian and African entrepreneurs need to build businesses that are seen, structured, and scalable.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#faf7ee] border border-black/5 rounded-3xl p-6 flex flex-col gap-5">
            <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase">Platform Pillars</h3>
            {[
              { l: 'EDUCATION', d: 'Actionable frameworks built for local market realities.' },
              { l: 'MENTORSHIP', d: 'Consulting resources & expertise for operational hurdles.' },
              { l: 'TECHNOLOGY', d: 'Structured digital workflows, tools, and template suites.' },
              { l: 'COMMUNITY', d: 'A safe space of growth-minded builders and peers.' },
            ].map(p => (
              <div key={p.l} className="flex flex-col gap-1 border-t border-black/5 pt-4 first:border-0 first:pt-0">
                <span className="text-xs font-black text-[#3e4095]">{p.l}</span>
                <p className="text-[11px] text-slate-600 font-semibold">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM & ORIGIN ──────────────────────────────────── */}
      <section className="py-20 bg-[#faf7ee] border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black text-[#3e4095]">The Problem We Solve</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Nigeria is a nation of entrepreneurs. Across every city, street, and social media feed, there are thousands of hardworking business owners building something meaningful. Yet year after year, the data tells a sobering story: small businesses dominate the labour market but dramatically underperform their potential economic contribution.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              The root causes are predictable: founders building without a blueprint. Businesses operating on instinct rather than systems. Talented people who cannot get seen past algorithm walls. Growth plateauing because structure was never built in. The ambition is there. The grind is real. What's missing is the framework, the visibility, and the tribe.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black text-[#3e4095]">How VClan Was Born</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Visibility Clan was founded on a simple but powerful conviction: that the tools, training, and tribe that large corporations take for granted should be accessible to every small business owner. That a fashion brand in Lagos and a logistics company in Kano should be able to access the same quality of strategic thinking as the multinationals they compete with.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              VClan was built to be that equalizer — a structured ecosystem that gives growing businesses a place to learn, a system to follow, mentors to consult, and a community to grow with.
            </p>
          </div>
        </div>
      </section>

      {/* ─── COHORT PROGRAMS ───────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-black/5" id="programs">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-4 block">VClan Cohorts</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                Structured programs.<br />Real transformation.
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-semibold max-w-xs">
              Select a cohort program below to get started.
            </p>
          </div>

          {/* Screenshot-Inspired Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: MSMEs & SMEs */}
            <div 
              onClick={() => handleCardClick('MSMEs & SMEs', 'SOP & Operations Architecture')}
              className="bg-white border border-black/5 rounded-4xl p-8 md:p-10 flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 text-lg font-bold tracking-tight">
                      MSMEs & SMEs
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                      Operations Cohort
                    </p>
                  </div>
                </div>

                {/* Program Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-sm">
                      SOP & Operations Architecture
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                      <span>4 Weeks</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">8 seats</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                    The heartbeat of our community. Small businesses transitioning from informal hustle to structured scaling through our growth frameworks. Map workflows, eliminate bottlenecks, and write SOPs your team actually follows.
                  </p>

                  {/* Outcomes list */}
                  <div className="space-y-2 pt-4 border-t border-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Outcomes:</p>
                    <div className="space-y-2">
                      {[
                        'Delivery pipeline mapping',
                        'Self-executing SOPs',
                        'CRM & automation setup',
                        'Delegation metrics'
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
              onClick={() => handleCardClick('Early-Stage Founders', 'Founder Freedom & Delegation')}
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
                      Founder Freedom & Delegation
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                      <span>3 Weeks</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">5 seats</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                    Visionaries building the foundations of tomorrow with purpose and strategic clarity. Step out of daily operations with frameworks that run without you.
                  </p>

                  {/* Outcomes list */}
                  <div className="space-y-2 pt-4 border-t border-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Outcomes:</p>
                    <div className="space-y-2">
                      {[
                        'Time audit framework',
                        'Task escalation matrix',
                        'KPI management',
                        'Assistant training'
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
              onClick={() => handleCardClick('Creative Partners', 'Authority Brand & Inbound Engine')}
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
                      Brand & Visibility Cohort
                    </p>
                  </div>
                </div>

                {/* Program Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-slate-900 font-extrabold text-sm">
                      Authority Brand & Inbound Engine
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-bold">
                      <span>6 Weeks</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      <span className="text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">12 seats</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                    Designers and strategists who power the brand visibility pillar for our ecosystem. Build a high-authority content system that attracts leads without ad spend.
                  </p>

                  {/* Outcomes list */}
                  <div className="space-y-2 pt-4 border-t border-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Outcomes:</p>
                    <div className="space-y-2">
                      {[
                        'Positioning clarity',
                        'Case study creation',
                        'Content engine setup',
                        'Referral automation'
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

      {/* ─── APPLY ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6">Apply to VClan</p>
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
              onClick={handleApplyClick}
              className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-black py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              Apply via WhatsApp <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
