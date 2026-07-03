import { useState, useEffect } from 'react';
import { Users, Check, ArrowRight, MessageSquare, Loader2, Target } from 'lucide-react';

interface Training {
  id: number;
  title: string;
  duration: string;
  format: string;
  seatsLeft: number;
  description: string;
  curriculum: string[];
  audience: string;
}

export default function CommunityPage() {
  const [selectedCohort, setSelectedCohort] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('1-3 years');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainings: Training[] = [
    {
      id: 1,
      title: "Operations Architecture & SOP Blueprint",
      duration: "4 Weeks (Live Cohort)",
      format: "Weekly Audits + Slack Support",
      seatsLeft: 8,
      description: "Learn to systematically map your workflows, eliminate bottlenecks, write self-executing SOPs, and automate your client onboarding pipelines.",
      curriculum: [
        "Week 1: Mapping the delivery pipeline & identifying margin leaks.",
        "Week 2: Writing executable SOPs your team actually follows.",
        "Week 3: Tool selection, CRM setups, and database triggers.",
        "Week 4: Scaling fulfillment and delegation metrics."
      ],
      audience: "Founders, COOs, Operations Managers"
    },
    {
      id: 2,
      title: "Authority Brand & Inbound Engine Blueprint",
      duration: "6 Weeks (Guided Masterclass)",
      format: "Group Coaching + Notion Playbook",
      seatsLeft: 12,
      description: "Stop relying on cold outbound. Build a high-authority content system using expert case studies, whitepapers, and organic thought leadership.",
      curriculum: [
        "Week 1: Clarifying positioning & identifying high-ticket client profiles.",
        "Week 2: Drafting empirical case studies that demonstrate proof.",
        "Week 3: Setting up a bi-weekly content creation engine.",
        "Week 4: Optimizing conversion paths on your digital properties.",
        "Week 5: Outbound support systems & referral network automation.",
        "Week 6: Scaling marketing operations without massive ad budgets."
      ],
      audience: "B2B Consultants, Agencies, SaaS Founders"
    },
    {
      id: 3,
      title: "Founder Freedom & Smart Delegation",
      duration: "3 Weeks (Cohort)",
      format: "Live Workshops + Action Templates",
      seatsLeft: 5,
      description: "Decouple yourself from daily client operations. Learn delegation frameworks, build task escalation matrices, and hire your first operational analyst.",
      curriculum: [
        "Week 1: Time auditing and mapping delegation priorities.",
        "Week 2: Creating task matrices and training assistants.",
        "Week 3: Managing key performance metrics without micromanagement."
      ],
      audience: "Solopreneurs and early founders looking to step away from delivery"
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
    }, 1800);
  };

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-28 pb-24">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
        <div className="max-w-3xl space-y-6">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <span className="text-[10px] font-black uppercase text-[#3e4095] tracking-widest bg-[#3e4095]/5 px-2.5 py-1 rounded-full">
              Ecosystem Hub
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] font-black uppercase text-[#ffd148] tracking-widest bg-[#ffd148]/10 px-2.5 py-1 rounded-full">
              Community & Cohorts
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-none">
            The Scaling Collective & trainings
          </h1>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-semibold max-w-2xl">
            Empowering early-stage founders and operational leaders with structured cohorts, direct expert access, and collaborative scaling frameworks.
          </p>
        </div>
      </section>



      {/* 3. THE COMMUNITY COLLECTIVE SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Community Core details */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-black text-[#3e4095] tracking-widest uppercase block">PEER NETWORK</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Collaborate, Swap SOPs, and Share Tactics in Real-Time
          </h2>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">
            Our community is not a social network for bragging rights. It's a structured hub on Slack where operations officers, managers, and consultants trade templates, request stack reviews, and solve scaling issues.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex gap-2.5 items-start">
              <MessageSquare className="w-5 h-5 text-[#ffd148] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase">Direct Expert Q&A</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-normal mt-0.5">
                  Get structural answers from Brandon Smithwick and Valerie Chapman weekly.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <Users className="w-5 h-5 text-[#3e4095] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase">SOP Swap Library</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-normal mt-0.5">
                  Instantly access standard operational checklists shared by verified operations teams.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a 
              href="https://slack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#3e4095] text-white font-bold px-6 py-3.5 rounded-xl text-xs transition-colors"
            >
              Request Free Community Invite <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Modern Wireframe Visual */}
        <div className="lg:col-span-5">
          <div className="border border-black/5 bg-white rounded-3xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <span className="text-[9px] font-black text-slate-400 uppercase">Slack Channel Preview</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            
            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="p-3 bg-slate-50 border border-black/5 rounded-xl">
                <span className="font-bold text-[#3e4095] block mb-0.5">#general-ops</span>
                <p className="text-[11px] leading-relaxed">
                  \"Just swapped our client portal layout to Notion databases. Lead velocity SLA drops are down 40%! Templates in the swap drive.\"
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-black/5 rounded-xl">
                <span className="font-bold text-[#ffd148] block mb-0.5">#sop-review</span>
                <p className="text-[11px] leading-relaxed">
                  \"Can anyone review our video production checklist? SOP velocity seems sluggish (takes 1.5 days to execute).\"
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. ACTIVE TRAININGS SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24 border-t border-black/5 pt-20">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-black text-[#3e4095] tracking-widest uppercase block">COHORTS & PROGRAMMING</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
            High-Impact Growth Trainings
          </h2>
          <p className="text-slate-500 text-sm font-semibold max-w-xl mx-auto">
            Practical instruction mapping real tools and frameworks. No fluff, no slides. Build systems during class.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trainings.map(t => (
            <div 
              key={t.id}
              className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                selectedCohort === t.id 
                  ? 'border-[#3e4095] bg-[#3e4095]/[0.01] shadow-lg' 
                  : 'border-black/5 bg-white hover:border-black/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    {t.duration}
                  </span>
                  <span className="text-[8px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
                    {t.seatsLeft} SEATS LEFT
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-950 mb-2 leading-tight">
                  {t.title}
                </h3>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                  {t.description}
                </p>

                {/* Curriculum breakdown */}
                <div className="border-t border-black/5 pt-4 mb-6">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Syllabus Outline</h5>
                  <ul className="space-y-2">
                    {t.curriculum.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[10px] font-semibold text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#ffd148] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => setSelectedCohort(t.id)}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedCohort === t.id 
                      ? 'bg-[#3e4095] border-[#3e4095] text-white' 
                      : 'bg-transparent border-black/10 text-slate-700 hover:border-[#3e4095] hover:text-[#3e4095]'
                  }`}
                >
                  {selectedCohort === t.id ? 'Selected Program' : 'Select Program'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. DYNAMIC INTAKE REGISTRATION */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="border border-black/5 bg-white rounded-3xl p-8 shadow-md relative overflow-hidden">
          
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3e4095] to-[#ffd148]" />

          {!formSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3e4095]" />
                <h3 className="text-xl font-bold text-slate-950">Cohort Registration</h3>
              </div>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Applying for: <strong className="text-slate-950">{trainings.find(t => t.id === selectedCohort)?.title}</strong>. Fill out the application details to lock your entry request.
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Corporate Email</label>
                    <input 
                      type="email" 
                      placeholder="jane@company.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Professional Experience</label>
                  <select 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer"
                  >
                    <option value="1-3 years">1 - 3 years experience</option>
                    <option value="3-7 years">3 - 7 years experience</option>
                    <option value="7+ years">7+ years experience</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#ffd148]" /> Verifying Eligibility...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-500/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-950">Application Received</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Thank you, <strong className="text-slate-950">{name}</strong>. We have registered your application for the <strong className="text-slate-950">{trainings.find(t => t.id === selectedCohort)?.title}</strong>. Check your inbox within 24 hours for onboarding documents.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
