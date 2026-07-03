import { useEffect } from 'react';
import { ArrowRight, Compass, Eye, Layers, Share2, Globe } from 'lucide-react';
import { openWhatsApp, WA_MESSAGES, SELAR_CLARITY_CALL_URL } from '../lib/whatsapp';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Digitalife Ehub — Business Development & Brand Management';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Digitalife Ehub is a business development and brand management firm empowering MSMEs, SMEs, and early-stage entrepreneurs to build structured, scalable, and visible enterprises.');

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'business development service providers, business growth strategists, MSME structural gap experts, enterprise builders, corporate accountability systems, organic client acquisition strategy, business structure consultant');
  }, []);

  const pillars = [
    {
      num: '01',
      title: 'Business Clarity & Strategic Planning',
      description: 'We help you define your direction, refine your vision, and build a practical roadmap for sustainable growth.',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      num: '02',
      title: 'Brand Positioning & Visibility Strategy',
      description: 'We position your brand to communicate authority, attract the right audience, and increase opportunities.',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      num: '03',
      title: 'Business Structure & Operational Systems',
      description: 'We design operational frameworks, workflows, and systems that eliminate chaos and improve efficiency.',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      num: '04',
      title: 'Social Media Management',
      description: 'Strategic content scheduling and storytelling designed to capture mindshare, build authority, and drive sales.',
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      num: '05',
      title: 'Website Design & Development',
      description: 'Websites, digital campaigns, and online presence that convert visibility into revenue and credibility.',
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const impacts = [
    'Transitioning from informal to structured operations',
    'Building clarity around their business direction',
    'Designing sustainable business models',
    'Activating digital presence for visibility and growth',
    'Strengthening operational systems for efficiency',
  ];

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-28 pb-24">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6 block">
              About Digitalife Ehub
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-none">
              Building<br />
              <span className="text-[#3e4095]">People.</span><br />
              Brands.<br />
              <span className="text-[#ffd148]">Purpose.</span>
            </h1>
          </div>
          <div className="space-y-6">
            {/* Imagine This */}
            <div className="space-y-3">
              {[
                'Clear direction',
                'Organized operations',
                'Strong brand presence',
                'Consistent growth systems',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-[#ffd148] font-black text-base">✔</span>
                  <span className="text-slate-700 font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">
              Imagine running a business with all of this in place. That's exactly what we help you build.
            </p>
            <button
              onClick={() => openWhatsApp(WA_MESSAGES.getStarted)}
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#3e4095] text-white font-black px-7 py-4 rounded-full text-xs transition-all border-none cursor-pointer"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ffd148] mb-6 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Strategic thinkers.<br />System builders.<br />Growth partners.
            </h2>
          </div>
          <div className="space-y-5 md:pt-14">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold">
              Digitalife Ehub is a business development and brand management firm focused on empowering MSMEs, SMEs, early-stage entrepreneurs, and informal businesses to build structured, scalable, and visible enterprises.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-semibold">
              We are not just advisors. We build with you — bringing clarity to your direction, structure to your operations, and visibility to your brand.
            </p>
            <a
              href={SELAR_CLARITY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#ffd148] text-white hover:text-[#ffd148] font-bold px-6 py-3.5 rounded-full text-xs transition-all bg-transparent cursor-pointer no-underline"
            >
              Book a 30-Minute Clarity Call <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            We work across the critical<br />growth pillars that matter.
          </h2>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="py-8 border-b border-black/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#3e4095]/2 px-2 transition-colors duration-200 group"
            >
              <div className="md:col-span-1 text-slate-300 font-bold text-sm">{p.num}</div>
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="p-2 bg-slate-900/5 rounded-lg text-slate-700 group-hover:bg-[#3e4095]/10 group-hover:text-[#3e4095] transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-sm font-extrabold text-slate-950">{p.title}</h3>
              </div>
              <div className="md:col-span-7 text-slate-500 text-sm leading-relaxed font-semibold">
                {p.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => openWhatsApp(WA_MESSAGES.getStarted)}
            className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-[#3e4095] text-white font-black px-7 py-4 rounded-full text-xs transition-all border-none cursor-pointer"
          >
            Start Your Growth Journey <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ─── OUR IMPACT ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#faf7ee] border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] block">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Impact measured<br />in transformation.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              At Digitalife Ehub, impact is measured in transformation. We have supported entrepreneurs in:
            </p>
            <blockquote className="border-l-2 border-[#ffd148] pl-4 mt-4">
              <p className="text-slate-600 text-sm font-semibold italic leading-relaxed">
                "When businesses grow with structure, communities grow with them."
              </p>
            </blockquote>
          </div>
          <div className="flex flex-col gap-3">
            {impacts.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-white border border-black/5 rounded-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148] shrink-0 mt-1.5" />
                <span className="text-slate-700 text-sm font-semibold leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY DIGITALIFE ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-6 block">Why Digitalife Ehub?</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-8">
          Because we don't just advise.<br />We build with you.
        </h2>
        <p className="text-slate-500 text-base leading-relaxed font-semibold max-w-2xl mx-auto mb-4">
          We understand the realities of growing businesses. We understand limited resources. We understand ambition mixed with uncertainty.
        </p>
        <p className="text-slate-500 text-base leading-relaxed font-semibold max-w-2xl mx-auto mb-12">
          Our approach is practical. Strategic. Tailored. No fluff. Just structured growth support that works.
        </p>
        <button
          onClick={() => openWhatsApp(WA_MESSAGES.getStarted)}
          className="inline-flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] text-white font-black px-8 py-4 rounded-full text-sm transition-all border-none cursor-pointer shadow-lg"
        >
          💡 Let's Build Your Next Level <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
