import { useState, useEffect } from 'react';
import { ArrowRight, Check, Loader2, Target } from 'lucide-react';

interface Training {
  id: number;
  title: string;
  tag: string;
  weeks: string;
  seats: number;
  description: string;
  outcomes: string[];
}

const trainings: Training[] = [
  {
    id: 1,
    tag: 'Operations',
    title: 'SOP & Operations Architecture',
    weeks: '4 Weeks',
    seats: 8,
    description: 'Map workflows, eliminate bottlenecks, and write SOPs your team actually follows.',
    outcomes: ['Delivery pipeline mapping', 'Self-executing SOPs', 'CRM & automation setup', 'Delegation metrics'],
  },
  {
    id: 2,
    tag: 'Brand & Visibility',
    title: 'Authority Brand & Inbound Engine',
    weeks: '6 Weeks',
    seats: 12,
    description: 'Build a high-authority content system that attracts leads without ad spend.',
    outcomes: ['Positioning clarity', 'Case study creation', 'Content engine setup', 'Referral automation'],
  },
  {
    id: 3,
    tag: 'Leadership',
    title: 'Founder Freedom & Delegation',
    weeks: '3 Weeks',
    seats: 5,
    description: 'Step out of daily operations with frameworks that run without you.',
    outcomes: ['Time audit framework', 'Task escalation matrix', 'KPI management', 'Assistant training'],
  },
];

export default function CommunityPage() {
  const [open, setOpen] = useState<number | null>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Visibility Clan · VClan | Digitalife Ehub';
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const selected = trainings.find(t => t.id === open);

  return (
    <div className="bg-[#fffdf5]">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-slate-950 flex flex-col justify-between px-6 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3e4095]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 max-w-7xl mx-auto w-full">
          <span className="w-8 h-px bg-[#ffd148]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ffd148]">
            Digitalife Ehub · Premium Community
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-20">
          <h1 className="text-[clamp(4rem,14vw,11rem)] font-black text-white leading-none tracking-tighter">
            Visibility<br />
            <span className="text-[#3e4095]">Clan</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-slate-400 text-base leading-relaxed font-semibold">
              A premium business growth community purpose-built to help young entrepreneurs, MSMEs, and startups across Nigeria and Africa find the clarity, structure, and visibility they need to compete, scale, and win.
            </p>
            <div className="flex flex-col justify-end gap-3">
              <a
                href="https://slack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ffd148] hover:bg-[#f5c800] text-slate-950 font-black px-8 py-4 rounded-full text-xs transition-all w-fit"
              >
                Join VClan — It's Free <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-bold text-slate-500 hover:text-white transition-colors text-left cursor-pointer bg-transparent border-none w-fit"
              >
                Explore cohort programs ↓
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '1,200+', l: 'Founders & entrepreneurs' },
            { n: '4 Pillars', l: 'Education · Mentorship · Tech · Community' },
            { n: '6–10 Wks', l: 'Clarity-to-structure timeline' },
            { n: 'Nigeria & Africa', l: 'Region we serve' },
          ].map(s => (
            <div key={s.n}>
              <p className="text-white font-black text-lg tracking-tight">{s.n}</p>
              <p className="text-slate-500 text-[11px] font-semibold mt-0.5">{s.l}</p>
            </div>
          ))}
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
              Nigeria is a nation of entrepreneurs. Across every city, street, and social media feed, there are thousands of brilliant, hardworking business owners building something meaningful. Yet year after year, the data tells a sobering story: small businesses dominate the labour market but dramatically underperform their potential economic contribution.
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
      <section className="bg-slate-950 py-28 px-6" id="programs">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd148] mb-4">VClan Cohorts</p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Structured programs.<br />Real transformation.
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-semibold max-w-xs">
              Select a cohort below and apply to lock your seat.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {trainings.map((t) => (
              <div key={t.id} className="py-6 cursor-pointer" onClick={() => setOpen(open === t.id ? null : t.id)}>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 font-bold text-sm w-6 shrink-0">0{t.id}</span>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <span className="md:col-span-2 text-[9px] font-black uppercase tracking-widest text-[#ffd148] bg-[#ffd148]/10 px-2 py-1 rounded-full w-fit">
                      {t.tag}
                    </span>
                    <h3 className={`md:col-span-7 text-lg md:text-xl font-black tracking-tight transition-colors ${open === t.id ? 'text-[#ffd148]' : 'text-white'}`}>
                      {t.title}
                    </h3>
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400">{t.weeks}</span>
                        <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">{t.seats} seats</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${open === t.id ? 'bg-[#ffd148] border-[#ffd148] text-slate-950' : 'border-white/20 text-white'}`}>
                        <span className="text-sm font-black leading-none">{open === t.id ? '−' : '+'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {open === t.id && (
                  <div className="mt-8 ml-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <p className="text-slate-400 text-sm font-semibold leading-relaxed">{t.description}</p>
                    <div className="flex flex-col gap-2">
                      {t.outcomes.map((o, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="w-1 h-1 rounded-full bg-[#ffd148] shrink-0" />
                          <span className="text-slate-300 text-xs font-semibold">{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
            {selected && (
              <div className="border-l-2 border-[#3e4095] pl-4 space-y-1 mb-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Selected Program</p>
                <p className="text-base font-black text-slate-950">{selected.title}</p>
                <p className="text-xs text-slate-400 font-semibold">{selected.weeks} · {selected.seats} seats remaining</p>
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
              <Target className="w-4 h-4 text-[#3e4095]" />
              Applications reviewed within 24 hours.
            </div>
          </div>

          <div>
            {!submitted ? (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Full Name</label>
                  <input type="text" placeholder="Jane Doe" required value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Email Address</label>
                  <input type="email" placeholder="you@business.com" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-black py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border-none mt-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            ) : (
              <div className="pt-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">Welcome to VClan, {name}.</h3>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-sm">
                  Your application is in. Check your inbox within 24 hours for next steps.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
