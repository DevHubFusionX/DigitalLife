import { useEffect } from 'react';
import { ArrowRight, Compass, Eye, Layers, Share2, Globe } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export default function AboutPage({ onOpenBooking }: AboutPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Business Growth Strategists & MSME Consultants | Digitalife Ehub";
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Meet the business development service providers and MSME structural gap experts at Digitalife Ehub. We build corporate accountability systems and organic client acquisition strategies.');

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'business development service providers, business growth strategists, value over skills monetization, product first business approach, small business consultants, MSME structural gap experts, enterprise builders, corporate accountability systems, organic client acquisition strategy');
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Business Clarity & Strategic Planning",
      description: "Define your business direction, target market, positioning, value proposition, and growth roadmap.",
      icon: <Compass className="w-5 h-5 text-slate-800" />
    },
    {
      num: "02",
      title: "Brand Positioning & Visibility",
      description: "Position your brand to communicate credibility, attract the right audience, and build authority.",
      icon: <Eye className="w-5 h-5 text-slate-800" />
    },
    {
      num: "03",
      title: "Business Structure & Operations",
      description: "Design operational frameworks, workflow systems, role clarity, and SOPs to transition from chaos to scale.",
      icon: <Layers className="w-5 h-5 text-slate-800" />
    },
    {
      num: "04",
      title: "Social Media Management",
      description: "Strategic content scheduling and storytelling designed to capture mindshare and build online presence.",
      icon: <Share2 className="w-5 h-5 text-slate-800" />
    },
    {
      num: "05",
      title: "Website Design & Development",
      description: "A conversion-focused digital storefront built to communicate credibility and capture opportunities.",
      icon: <Globe className="w-5 h-5 text-slate-800" />
    }
  ];

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-28 pb-20">
      
      {/* Brand Story Hero */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center md:text-left">
        <span className="text-[#3e4095] text-xs font-black uppercase tracking-wider mb-4 block">
          Purpose & Positioning
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 leading-tight mb-4">
          Brand Story & Positioning
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl font-bold">
          The narrative that connects our purpose to our people.
        </p>
      </section>

      {/* Main About & Core Identity Section */}
      <section className="py-12 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* About Digitalife Ehub */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#3e4095] tracking-tight">
              About Digitalife Ehub
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
              Digitalife Ehub is a business development and brand management firm focused on empowering MSMEs, SMEs, early-stage entrepreneurs, and informal businesses to build structured, scalable, and visible enterprises.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              We operate at the critical intersection of strategy, structure, and visibility — bridging the gap between raw entrepreneurial potential and structured, scalable business success.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              We exist because a fundamental market failure has gone unaddressed: over 80% of small businesses dominate Nigeria's labour market, yet contribute less than 50% of national economic output. The root cause is not lack of effort or ambition — it is poor visibility, structural deficiency, and severely limited access to strategic support.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
              Digitalife Ehub is the answer. We are building structured, thriving businesses that compete, scale, and win in today's digital economy.
            </p>

            {/* Core Identity Statement Box */}
            <div className="mt-6 bg-[#3e4095]/5 border border-[#3e4095]/10 rounded-3xl p-6 md:p-8 flex flex-col gap-3 shadow-sm">
              <h3 className="text-base font-black text-[#3e4095] tracking-wider uppercase">
                Our Core Identity Statement
              </h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-bold">
                Digitalife Ehub is not just a consultancy — it is a business growth platform that provides the tools, training, mentorship, and strategic framework that Nigerian and African entrepreneurs need to build businesses that are seen, structured, and scalable.
              </p>
            </div>
          </div>

          {/* Quick Stats / Info Widget */}
          <div className="lg:col-span-4 bg-[#faf7ee] border border-black/5 rounded-3xl p-6 flex flex-col gap-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
              Platform Pillars
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-[#3e4095]">EDUCATION</span>
                <p className="text-[11px] text-slate-600 font-semibold">Actionable frameworks designed for local market realities.</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-[#3e4095]">MENTORSHIP</span>
                <p className="text-[11px] text-slate-600 font-semibold">Consulting resources & expertise for operational hurdles.</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-[#3e4095]">TECHNOLOGY</span>
                <p className="text-[11px] text-slate-600 font-semibold">Structured digital workflows, tools, and template suites.</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-[#3e4095]">COMMUNITY</span>
                <p className="text-[11px] text-slate-600 font-semibold">A safe space of growth-minded builders and peers.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Narrative Section: The Problem We Solve & How Digitalife Ehub Was Founded */}
      <section className="py-16 bg-[#faf7ee] border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black text-[#3e4095]">The Problem We Solve</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Nigeria is a nation of entrepreneurs. Across every city, street, and social media feed, there are thousands of brilliant, hardworking business owners building something meaningful. Yet year after year, the data tells a sobering story: small businesses dominate the labour market but dramatically underperform their potential economic contribution.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              The root causes are predictable: founders building without a blueprint. Businesses operating on instinct rather than systems. Talented people who cannot get seen past algorithm walls. Growth plateauing because structure was never built in. The ambition is there. The grind is real. What's missing is the framework, the visibility, and the strategic support.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-black text-[#3e4095]">How Digitalife Ehub Was Founded</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Digitalife Ehub was founded on a simple but powerful conviction: that the tools, training, and strategic support that large corporations take for granted should be accessible to every small business owner. That a fashion brand in Lagos and a logistics company in Kano should be able to access the same quality of strategic thinking as the multinationals they compete with.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Digitalife Ehub was built to be that equalizer — a structured ecosystem that gives growing businesses a clear direction to follow, systems to implement, experts to consult, and a partner to grow with.
            </p>
          </div>

        </div>
      </section>

      {/* Critical Growth Pillars */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 block">
            What We Do
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-950">
            Critical Growth Pillars
          </h2>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {pillars.map((pillar) => (
            <div 
              key={pillar.num}
              className="py-8 border-b border-black/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#3e4095]/5 px-2 transition-colors duration-200"
            >
              <div className="md:col-span-1 text-slate-400 font-bold text-sm">
                {pillar.num}
              </div>
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="p-2 bg-slate-900/5 rounded-lg text-slate-800">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-950">{pillar.title}</h3>
              </div>
              <div className="md:col-span-7 text-slate-600 text-sm leading-relaxed font-semibold">
                {pillar.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anthem / Call to Action */}
      <section className="py-16 max-w-5xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-slate-800">
            "When businesses grow with structure, communities grow with them."
          </p>
          
          <div className="h-px bg-black/10 w-24" />

          <button
            onClick={onOpenBooking}
            className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold px-8 py-4 rounded-full text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md border-none"
          >
            Book a Growth Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
