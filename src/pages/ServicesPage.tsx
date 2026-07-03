import { useEffect } from 'react';
import { Compass, Share2, Layers, Globe, BookOpen, ArrowRight, Check } from 'lucide-react';
import TwistingRibbon from '../components/ui/twisting-ribbon';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services | SOP Development & Small Business Formalization | Digitalife Ehub";
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Explore our professional SOP development services, small business formalization programs, corporate workflow designs, and standard operating procedures templates.');

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'SOP development services, small business formalization, corporate workflow design, business system structuring, standard operating procedures template, strategic brand positioning, social media management with structure, e-commerce web development for small business, custom website design to convert, business roadmap consultation');
  }, []);

  const services = [
    {
      num: "01",
      title: "Business Clarity & Strategic Planning",
      subtitle: "Growth begins with direction and stability.",
      icon: <Compass className="w-5 h-5 text-slate-800" />,
      bullets: [
        "Clear business direction",
        "Ideal target market mapping",
        "Positioning and value proposition",
        "Practical growth roadmap",
        "Revenue and expansion strategy"
      ],
      perfectFor: "Founders and businesses feeling stuck, overwhelmed, or unsure about their next strategic move."
    },
    {
      num: "02",
      title: "Social Media Management",
      subtitle: "Visibility with structure — not noise.",
      icon: <Share2 className="w-5 h-5 text-slate-800" />,
      bullets: [
        "Clear content strategy",
        "Structured posting systems",
        "Brand-aligned storytelling",
        "Audience engagement approach",
        "Performance-focused growth direction"
      ],
      perfectFor: "Businesses ready to establish market authority and attract the right high-value audience."
    },
    {
      num: "03",
      title: "Formalization, Structure & Operations",
      subtitle: "From informal hustle to structured enterprise.",
      icon: <Layers className="w-5 h-5 text-slate-800" />,
      bullets: [
        "Business formalization guidance",
        "Operational system design",
        "Workflow structuring",
        "Role and responsibility clarity",
        "SOP development",
        "Internal growth framework setup"
      ],
      perfectFor: "Entrepreneurs ready to transition into serious, sustainable, and delegated operations."
    },
    {
      num: "04",
      title: "Website Design & Development",
      subtitle: "Your digital storefront. Built to convert.",
      icon: <Globe className="w-5 h-5 text-slate-800" />,
      bullets: [
        "Reflect your brand authority",
        "Clearly communicate your services",
        "List Products & eCommerce features",
        "Guide visitors toward action",
        "Support visibility and growth"
      ],
      perfectFor: "Businesses ready to be taken seriously and command credibility online."
    },
    {
      num: "05",
      title: "Business Development Trainings",
      subtitle: "Empowering people to build stronger businesses.",
      icon: <BookOpen className="w-5 h-5 text-slate-800" />,
      bullets: [
        "Business clarity foundations",
        "Growth strategy roadmapping",
        "Structure and systems implementation",
        "Brand positioning strategies",
        "Sustainable scaling practices"
      ],
      perfectFor: "Entrepreneurial communities, NGOs, development programs, and business clusters."
    }
  ];

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-28 pb-20">
      
      {/* 1. Header Section */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <span className="text-[#ffd148] text-xs font-bold uppercase tracking-wider mb-4 block">
          Our Capabilities
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight mb-6">
          Support for sustainable growth.
        </h1>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl font-medium">
          Every service we provide is designed to move you from confusion to clarity, from hustle to structure, and from invisibility to influence. We help you build foundations that last.
        </p>
      </section>

      {/* 2. Creative Staggered Layout with Sticky Column (Exactly 1 CTA here) */}
      <section className="py-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Sticky Left Sidebar with CTA #1 */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="border border-black/10 rounded-4xl p-8 bg-white shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3e4095] mb-2 block">Take Action</span>
              <h2 className="text-xl font-bold text-slate-950 mb-3">Ready to build with structure?</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Book a consultation with our strategy and systems team to map out your implementation roadmap.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-full text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                Book a Strategy Session <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Services List */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {services.map((service) => (
              <div 
                key={service.num}
                id={service.num === "05" ? "trainings" : undefined}
                className="border-b border-black/10 pb-10 flex flex-col gap-4 relative"
              >
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900/5 rounded-lg text-slate-800">
                      {service.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400">Service {service.num}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-950 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{service.subtitle}</p>

                {/* Bullets grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm font-semibold">
                      <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Perfect for subtext */}
                <div className="text-xs text-slate-400 font-semibold italic mt-2">
                  <span className="font-extrabold not-italic text-[10px] text-slate-500 uppercase tracking-wider mr-1.5">Perfect for:</span>
                  {service.perfectFor}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Promise Callout with CTA #2 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="relative w-full rounded-[40px] overflow-hidden bg-linear-to-br from-[#0f1712] via-[#090f0b] to-[#040605] px-8 py-16 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-white/5 shadow-2xl">
          
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <TwistingRibbon
              segments={200}
              waveSpeed={0.01}
              waveAmplitude={0.5}
              twistCycles={3}
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="text-[#ffd148] text-xs font-bold uppercase tracking-wider mb-2 block">Our Promise</span>
            <h3 className="text-white text-2xl font-bold tracking-tight mb-3">Clarity. Structure. Visibility.</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-semibold">
              We focus on what truly moves your business forward. If you're ready to build intentionally, we're ready to partner with you.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="relative z-10 w-full md:w-auto bg-[#ffd148] hover:bg-[#ffd148]/90 text-black font-extrabold px-8 py-4 rounded-full text-xs transition-all cursor-pointer shadow-lg text-center"
          >
            Claim Free Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
