import { useState, useEffect } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

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
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3e4095]/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Top label */}
        <div className="relative z-10 flex items-center gap-3 max-w-7xl mx-auto w-full">
          <span className="w-8 h-px bg-[#ffd148]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ffd148]">
            Digitalife Ehub · Premium Community
          </span>
        </div>

        {/* Big name */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-20">
          <h1 className="text-[clamp(4rem,14vw,11rem)] font-black text-white leading-none tracking-tighter">
            Visibility<br />
            <span className="text-[#3e4095]">Clan</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-slate-400 text-base leading-relaxed font-semibold">
              A premium growth community for entrepreneurs and MSMEs across Nigeria and Africa — where clarity meets structure, and structure creates visibility.
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

        {/* Bottom strip stats */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '1,200+', l: 'Members' },
            { n: '4 Pillars', l: 'Education · Mentorship · Tech · Community' },
            { n: '6–10 Wks', l: 'Clarity-to-structure timeline' },
            { n: 'Nigeria & Africa', l: 'Region served' },
          ].map(s => (
            <div key={s.n}>
              <p className="text-white font-black text-lg tracking-tight">{s.n}</p>
              <p className="text-slate-500 text-[11px] font-semibold mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT VCLAN IS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6">What VClan Is</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Not just a community.<br />A structured ecosystem.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-16 space-y-8">
            <p className="text-slate-500 text-base leading-relaxed font-semibold border-l-2 border-[#ffd148] pl-5">
              VClan was founded on a simple conviction: the tools, training, and strategic support that large corporations take for granted should be accessible to every small business owner.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '01', t: 'Education', d: 'Frameworks built for your market, not textbooks.' },
                { n: '02', t: 'Mentorship', d: 'Direct expert access at every growth stage.' },
                { n: '03', t: 'Technology', d: 'Tools and workflows that scale with you.' },
                { n: '04', t: 'Community', d: 'A tribe of builders who move together.' },
              ].map(p => (
                <div key={p.n} className="p-5 bg-slate-50 rounded-2xl border border-black/5">
                  <span className="text-[10px] font-black text-slate-300 block mb-2">{p.n}</span>
                  <h4 className="text-sm font-black text-slate-950 mb-1">{p.t}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ──────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-28 px-6" id="programs">
        <div className="max-w-7xl mx-auto">
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

          {/* Accordion */}
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
                        <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                          {t.seats} seats
                        </span>
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
                    <div className="grid grid-cols-1 gap-2">
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
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6">Apply to VClan</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-6">
              Lock your<br />seat.
            </h2>
            {selected && (
              <div className="border-l-2 border-[#3e4095] pl-4 space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Selected Program</p>
                <p className="text-base font-black text-slate-950">{selected.title}</p>
                <p className="text-xs text-slate-400 font-semibold">{selected.weeks} · {selected.seats} seats remaining</p>
              </div>
            )}
            <p className="text-slate-400 text-sm font-semibold leading-relaxed mt-6">
              Applications are reviewed within 24 hours. Choose a cohort above, then submit below.
            </p>
          </div>

          <div>
            {!submitted ? (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@business.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-black py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border-none mt-2"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    : <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  }
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
