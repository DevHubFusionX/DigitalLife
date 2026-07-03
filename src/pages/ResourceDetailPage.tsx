import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Check, ArrowRight, Mail, Loader2, Play } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { getYouTubeEmbedUrl, extractYouTubeId } from '../lib/youtube';
import { openWhatsApp } from '../lib/whatsapp';

// ---------------------------------------------------------------------------
// Legacy JSX preview pages for original 8 seeded resources (IDs 1–3 have
// detailed previews; others fall back to a simple cover display).
// ---------------------------------------------------------------------------
import { Database as DbIcon } from 'lucide-react';

const PREVIEW_PAGES: Record<string, { title: string; description: string; contentHtml: React.ReactNode }[]> = {
  '1': [
    {
      title: 'Cover Page',
      description: 'Executive Edition for scaling organizations.',
      contentHtml: (
        <div className="h-full w-full bg-slate-900 text-white p-8 flex flex-col justify-between select-none">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#ffd148]">DIGITALIFE EHUB</span>
          <div className="space-y-4">
            <h3 className="text-2xl font-black leading-tight tracking-tight">THE 2026 STATE OF SCALE REPORT</h3>
            <p className="text-xs text-slate-400 font-semibold">An empirical analysis of systems, capital allocation, and team scalability within early-stage MSMEs.</p>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between text-[8px] font-bold text-slate-500">
            <span>© 2026 DIGITALIFE</span><span>VOL. IV</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Table of Contents',
      description: 'Overview of chapters and page numbers.',
      contentHtml: (
        <div className="h-full w-full bg-white text-slate-900 p-8 flex flex-col justify-between select-none">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#3e4095]">Inside the Report</h4>
          <ul className="space-y-3 text-[11px] font-semibold text-slate-600">
            {[['Chapter 1: The Cash Flow Bottle', 'p. 08'], ['Chapter 2: SOP Velocity Auditing', 'p. 15'], ['Chapter 3: Authority Funnel Systems', 'p. 26'], ['Chapter 4: Tools & Integration Registry', 'p. 38']].map(([c, p]) => (
              <li key={c} className="flex justify-between border-b border-dashed border-black/10 pb-1"><span>{c}</span><span className="font-bold text-slate-950">{p}</span></li>
            ))}
          </ul>
          <span className="text-[9px] font-bold text-slate-400 text-center">Page 2 of 45</span>
        </div>
      ),
    },
    {
      title: 'Chapter 1: SOP Velocity Auditing',
      description: 'A sneak peek of the core systems audit section.',
      contentHtml: (
        <div className="h-full w-full bg-slate-50 text-slate-900 p-8 flex flex-col justify-between select-none">
          <span className="text-[8px] font-black uppercase text-slate-400">Chapter excerpt</span>
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-950">How to Measure SOP Speed</h5>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">SOP velocity is the average duration a new assistant takes to complete a procedure on their first attempt without team escalation.</p>
            <div className="bg-[#3e4095]/5 border-l-2 border-[#ffd148] p-2.5 text-[9px] font-bold text-[#3e4095] italic">"A procedure that requires hands-on training to execute is not an SOP — it is a meeting."</div>
          </div>
          <span className="text-[9px] font-bold text-slate-400 text-center">Page 16 of 45</span>
        </div>
      ),
    },
  ],
  '2': [
    {
      title: 'Template Home',
      description: 'Central workspace layout within Notion.',
      contentHtml: (
        <div className="h-full w-full bg-white text-slate-900 p-8 flex flex-col justify-between select-none">
          <div className="flex items-center gap-1 text-[9px] font-black text-slate-400"><DbIcon className="w-3 h-3 text-[#3e4095]" /> SYSTEMS PORTAL</div>
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-950">📁 Team Operations Blueprint</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
              {['⚙️ SOP Registry', '📋 Onboarding Portal', '⚡ Tech Stack Directory', '👥 Delegation escalation'].map(t => (
                <div key={t} className="p-2 bg-slate-50 border border-black/5 rounded-lg">{t}</div>
              ))}
            </div>
          </div>
          <span className="text-[9px] font-bold text-slate-400 text-center">Notion Layout</span>
        </div>
      ),
    },
    {
      title: 'SOP Template Structure',
      description: 'How each procedure is mapped for readability.',
      contentHtml: (
        <div className="h-full w-full bg-slate-50 text-slate-900 p-8 flex flex-col justify-between select-none">
          <span className="text-[8px] font-black text-[#3e4095] uppercase">SOP STRUCTURE</span>
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-950">Title: [Procedure Name]</h5>
            <div className="border border-black/5 rounded-lg bg-white p-2 space-y-1.5 text-[9px] text-slate-500 font-semibold">
              <p><strong>Goal:</strong> Define targeted outcomes of the workflow.</p>
              <p><strong>Owner:</strong> Role responsible for updates.</p>
              <p><strong>Steps:</strong> Action-oriented numbered execution list.</p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-slate-400 text-center">SOP Matrix Page</span>
        </div>
      ),
    },
  ],
  '3': [
    {
      title: 'Dashboard Tab',
      description: 'Interactive visual charts preview.',
      contentHtml: (
        <div className="h-full w-full bg-white text-slate-900 p-6 flex flex-col justify-between select-none">
          <span className="text-[9px] font-black text-[#0d9488] uppercase">GOOGLE SHEETS PREVIEW</span>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#0d9488]/5 p-2 rounded-lg text-[10px] font-bold text-[#0d9488]"><span>Operational KPI Dashboard</span><span>July 2026</span></div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
              {[['Lead Velocity', '1.1 Days', 'text-slate-950'], ['Error Rate', '1.4%', 'text-rose-600'], ['SLA Score', '98.2%', 'text-emerald-600']].map(([l, v, c]) => (
                <div key={l} className="p-2 border border-black/5 rounded-lg bg-slate-50"><span className="text-[8px] text-slate-400 block">{l}</span><span className={`text-xs font-black ${c}`}>{v}</span></div>
              ))}
            </div>
          </div>
          <span className="text-[9px] font-bold text-slate-400 text-center">Google Sheets Portal</span>
        </div>
      ),
    },
  ],
};

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { resources, loading } = useResources();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const resource = resources.find((r) => r.id === id) ?? resources[0];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      
      // Automatic download trigger
      const link = document.createElement('a');
      link.href = resource.downloadUrl || '/logo.svg';
      link.download = `${resource.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_resource`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-slate-500 font-bold">Resource not found.</p>
        <Link to="/resources" className="text-[#3e4095] font-bold text-sm hover:underline">← Back to Resources</Link>
      </div>
    );
  }

  const youtubeId = resource.youtubeUrl ? extractYouTubeId(resource.youtubeUrl) : null;

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20 pb-24">

      {/* BREADCRUMB */}
      <nav className="max-w-7xl mx-auto px-6 py-6 border-b border-black/5">
        <Link to="/resources" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider no-underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(62,64,149,0.15),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left: Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase text-[#ffd148] tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                # {resource.category}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider bg-white/5 px-3 py-1.5 rounded-full">
                {resource.format}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {resource.title}
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold max-w-2xl">
              {resource.description}
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => {
                  document.getElementById('access-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-extrabold px-8 py-4 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                <Download className="w-4 h-4" /> GET ACCESS NOW
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Resource link copied to clipboard!');
                }}
                className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer bg-white/5 text-white"
                title="Share Resource"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.748a3.075 3.075 0 110-1.496m0 1.496a3.075 3.075 0 100 1.496m0-1.496L15.316 15m-6.632-4.252L15.316 9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Mockup Browser Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="bg-[#0f172a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                </div>
                <div className="bg-slate-800/80 text-[10px] text-slate-400 font-semibold px-4 py-1 rounded-md grow mx-4 text-center select-none truncate">
                  digitalife.ehub/resources/{resource.id}
                </div>
              </div>
              
              {/* Content area: show CoverImage or Gradient */}
              <div className="h-64 sm:h-72 relative">
                {resource.coverImage ? (
                  <img src={resource.coverImage} alt={resource.title} className="w-full h-full object-contain bg-slate-900" />
                ) : (
                  <div className={`w-full h-full bg-linear-to-br ${resource.coverBg} flex flex-col justify-between p-8 text-white`}>
                    <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest">DIGITALIFE</span>
                    <div>
                      <span className="text-white/60 text-[10px] font-black uppercase tracking-wider block mb-2">{resource.format}</span>
                      <h3 className="text-white text-xl font-black leading-tight">{resource.coverTitle || resource.title}</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT & DETAILS SECTION */}
      <section className="bg-[#fffdf5] py-16 md:py-20 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: What's Included & Outcomes */}
          <div className="lg:col-span-7 space-y-8">
            {/* White card container for deliverables */}
            <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 bg-[#3e4095]/5 border border-[#3e4095]/10 px-4 py-2.5 rounded-full self-start w-fit">
                <Check className="w-4 h-4 text-white bg-slate-950 rounded-full p-0.5" />
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">
                  What's Included In This Package
                </span>
              </div>
              
              {resource.deliverables && resource.deliverables.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resource.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-600">
                      <span className="text-[#ffd148] font-bold mt-0.5 select-none mr-1.5">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-semibold italic">No deliverables listed.</p>
              )}
            </div>

            {/* Target Outcomes */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Target Outcomes & Benefits</h3>
              {resource.outcomes && resource.outcomes.length > 0 ? (
                <ul className="space-y-3 p-0 list-none">
                  {resource.outcomes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                      <ArrowRight className="w-4 h-4 text-[#3e4095] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500 font-semibold italic">No outcomes listed.</p>
              )}
            </div>
          </div>

          {/* Right Column: Metadata Sidebar Card */}
          <div className="lg:col-span-5" id="access-section">
            <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl space-y-6">
              {/* Properties list */}
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Topic Group</span>
                  <span className="font-bold">{resource.category}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">File Format</span>
                  <span className="font-bold">{resource.format}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Access Cost</span>
                  <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {resource.isFree ? 'Free' : `$${resource.price?.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Page / File Length</span>
                  <span className="font-bold">{resource.fileSize || resource.format}</span>
                </div>
              </div>

              {/* Informative bullet points */}
              <div className="space-y-3 text-[11px] font-semibold text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
                  <span>Instant secure access link sent immediately after unlocking.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
                  <span>No tech setup required. Compatible with Notion/Google Suite/Word/Excel.</span>
                </div>
              </div>

              {/* Form/WhatsApp Action Area */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
                {resource.isFree ? (
                  /* ── FREE RESOURCE: Email Lead-Capture Gate ── */
                  !formSubmitted ? (
                    <form onSubmit={handleUnlock} className="space-y-4">
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                          Corporate Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="you@company.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-white focus:outline-none focus:border-[#ffd148] transition-colors"
                          />
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-black py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-md"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Unlocking...
                          </>
                        ) : (
                          <>
                            Download Resource <Download className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4 text-center py-2">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold text-white">Resource Unlocked Successfully!</p>
                      <a
                        href={resource.downloadUrl || '/logo.svg'}
                        download={`${resource.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}_resource`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-black py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border-none shadow-md no-underline"
                      >
                        <FileText className="w-4 h-4" /> Direct Download Link
                      </a>
                    </div>
                  )
                ) : (
                  /* ── PAID RESOURCE: Purchase via WhatsApp ── */
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                      Click the button below to message our team directly on WhatsApp to purchase and get secure access.
                    </p>
                    <button
                      onClick={() => openWhatsApp(`Hi Digitalife Ehub, I would like to purchase the premium resource "${resource.title}" (${resource.format}).`)}
                      className="w-full bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-black py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-md"
                    >
                      Purchase via WhatsApp <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE EMBED (if resource has attached video) */}
      {youtubeId && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-4 h-4 text-rose-500" fill="currentColor" />
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Watch Video Tutorial</h3>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-black/5 shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(youtubeId)}
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </section>
      )}

      {/* RELATED RESOURCES */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-black text-[#3e4095] uppercase tracking-widest block mb-2">RECOMMENDED LEARNING</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Related Templates & Playbooks</h2>
          </div>
          <Link to="/resources" className="text-xs font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors flex items-center gap-1.5 no-underline">
            Browse Resource Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources
            .filter((r) => r.id !== resource.id && r.category === resource.category)
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.id}
                to={`/resources/${item.id}`}
                className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer"
              >
                {/* Cover */}
                <div className={`h-40 relative overflow-hidden ${!item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''} p-5 flex flex-col justify-between`}>
                  {item.coverImage && (
                    <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-contain bg-slate-900" />
                  )}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {item.format}
                    </span>
                    <div>
                      <span className="text-[9px] font-black text-[#ffd148] tracking-widest uppercase block mb-0.5">DIGITALIFE</span>
                      <h3 className="text-white text-sm font-black tracking-tight leading-snug">{item.coverTitle || item.title}</h3>
                    </div>
                  </div>
                </div>
                {/* Details */}
                <div className="p-5 flex flex-col justify-between grow">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#3e4095] uppercase tracking-wider">{item.category}</span>
                      {item.isFree ? (
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Free</span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
                      )}
                    </div>
                    <h4 className="text-slate-950 text-sm font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-[11px] font-semibold leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-950 mt-4 group-hover:text-[#3e4095] transition-colors self-start">
                    {item.isFree ? 'Download' : `Buy — $${item.price?.toFixed(2)}`} <Download className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          {resources.filter((r) => r.id !== resource.id && r.category === resource.category).length === 0 && (
            resources
              .filter((r) => r.id !== resource.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/resources/${item.id}`}
                  className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer"
                >
                  <div className={`h-40 relative overflow-hidden ${!item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''} p-5 flex flex-col justify-between`}>
                    {item.coverImage && (
                      <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-contain bg-slate-900" />
                    )}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {item.format}
                      </span>
                      <div>
                        <span className="text-[9px] font-black text-[#ffd148] tracking-widest uppercase block mb-0.5">DIGITALIFE</span>
                        <h3 className="text-white text-sm font-black tracking-tight leading-snug">{item.coverTitle || item.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between grow">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold text-[#3e4095] uppercase tracking-wider">{item.category}</span>
                        {item.isFree ? (
                          <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Free</span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
                        )}
                      </div>
                      <h4 className="text-slate-950 text-sm font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors">{item.title}</h4>
                      <p className="text-slate-500 text-[11px] font-semibold leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-950 mt-4 group-hover:text-[#3e4095] transition-colors self-start">
                      {item.isFree ? 'Download' : `Buy — $${item.price?.toFixed(2)}`} <Download className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))
          )}
        </div>
      </section>

    </div>
  );
}
