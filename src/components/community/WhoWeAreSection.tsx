export default function WhoWeAreSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095]">
            Who We Are
          </span>
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
          ].map((p) => (
            <div
              key={p.l}
              className="flex flex-col gap-1 border-t border-black/5 pt-4 first:border-0 first:pt-0"
            >
              <span className="text-xs font-black text-[#3e4095]">{p.l}</span>
              <p className="text-[11px] text-slate-600 font-semibold">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
