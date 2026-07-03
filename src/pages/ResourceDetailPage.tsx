import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Check, ArrowRight, Database, ChevronLeft, ChevronRight, Lock, Mail, Loader2, Play, ShoppingCart, CreditCard } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { getYouTubeEmbedUrl, extractYouTubeId } from '../lib/youtube';

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

  const [currentPage, setCurrentPage] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState('1-5');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const resource = resources.find((r) => r.id === id) ?? resources[0];

  // Preview pages: use legacy JSX for original resources, else empty
  const previewPages = id ? PREVIEW_PAGES[id] ?? [] : [];

  const nextPreview = () => setCurrentPage((p) => (p + 1) % previewPages.length);
  const prevPreview = () => setCurrentPage((p) => (p - 1 + previewPages.length) % previewPages.length);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setFormSubmitted(true); }, 1800);
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
        <Link to="/resources" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Resource Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-black uppercase text-[#3e4095] tracking-widest bg-[#3e4095]/5 px-2.5 py-1 rounded-full">{resource.category}</span>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{resource.format}</span>
            {resource.isFree ? (
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">Free</span>
            ) : (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">${resource.price?.toFixed(2)}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">{resource.title}</h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">{resource.description}</p>

          {(resource.fileSize || resource.softwareRequired) && (
            <div className="grid grid-cols-2 gap-4 border-y border-black/5 py-6">
              {resource.fileSize && (
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">File Size</span>
                  <span className="text-xs font-bold text-slate-950">{resource.fileSize}</span>
                </div>
              )}
              {resource.softwareRequired && (
                <div>
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">Software Required</span>
                  <span className="text-xs font-bold text-slate-950">{resource.softwareRequired}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Preview or Cover Image */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md bg-white border border-black/10 rounded-3xl overflow-hidden shadow-xl p-4 space-y-4">
            {resource.coverImage ? (
              /* Admin-uploaded cover image */
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative">
                <img src={resource.coverImage} alt={resource.title} className="w-full h-full object-cover" />
              </div>
            ) : previewPages.length > 0 ? (
              /* Legacy JSX previewer for seeded resources */
              <>
                <div className="h-64 sm:h-72 border border-black/5 bg-slate-50 rounded-2xl overflow-hidden relative">
                  {previewPages[currentPage].contentHtml}
                </div>
                <div className="flex justify-between items-center px-2">
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-slate-400">PAGE PREVIEW</h5>
                    <p className="text-xs font-bold text-slate-950 leading-tight">{previewPages[currentPage].title}</p>
                  </div>
                  {previewPages.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button onClick={prevPreview} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"><ChevronLeft className="w-4 h-4 text-slate-700" /></button>
                      <span className="text-[10px] font-bold text-slate-400">{currentPage + 1}/{previewPages.length}</span>
                      <button onClick={nextPreview} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"><ChevronRight className="w-4 h-4 text-slate-700" /></button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Fallback gradient cover for resources without preview */
              <div className={`h-64 sm:h-72 bg-linear-to-br ${resource.coverBg} rounded-2xl flex flex-col justify-between p-8`}>
                <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest">DIGITALIFE</span>
                <div>
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-wider block mb-2">{resource.format}</span>
                  <h3 className="text-white text-xl font-black leading-tight">{resource.coverTitle}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* YOUTUBE EMBED (if resource has attached video) */}
      {youtubeId && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-4 h-4 text-rose-500" fill="currentColor" />
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Watch Video</h3>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-black/5 shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(youtubeId)}
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* OUTCOMES & DELIVERABLES */}
      {((resource.deliverables?.length ?? 0) > 0 || (resource.outcomes?.length ?? 0) > 0) && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-black/5 grid grid-cols-1 md:grid-cols-2 gap-12">
          {(resource.deliverables?.length ?? 0) > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-wider">What's Included</h3>
              <ul className="space-y-3">
                {resource.deliverables!.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                    <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(resource.outcomes?.length ?? 0) > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-wider">Target Outcomes</h3>
              <ul className="space-y-3">
                {resource.outcomes!.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#3e4095] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* ACCESS GATE */}
      <section className="max-w-3xl mx-auto px-6 py-12 mt-12">
        <div className="border border-black/5 bg-white rounded-3xl p-8 shadow-md relative overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${resource.isFree ? 'from-[#3e4095] to-[#ffd148]' : 'from-amber-500 to-orange-500'}`} />

          {resource.isFree ? (
            /* ── FREE RESOURCE: Email Lead-Capture Gate ── */
            !formSubmitted ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#3e4095]" />
                  <h3 className="text-xl font-bold text-slate-950">Access Gated Resource</h3>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Provide your corporate email below to receive instant direct download links and editable templates. We respect your data privacy.
                </p>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Corporate Email</label>
                      <div className="relative">
                        <input
                          type="email" placeholder="you@company.com" required value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#fffdf5] border border-black/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095]"
                        />
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Team Size</label>
                      <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer">
                        <option value="1-5">1 - 5 team members</option>
                        <option value="6-20">6 - 20 team members</option>
                        <option value="21-50">21 - 50 team members</option>
                        <option value="50+">50+ team members</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full bg-slate-950 hover:bg-[#3e4095] text-white font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none">
                    {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin text-[#ffd148]" /> Assembling Custom PDF…</>) : (<>Unlock & Download Resource <Download className="w-4 h-4" /></>)}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-500/10 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950">Resource Unlocked</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Your customizable file package has been generated.</p>
                </div>
                <div className="max-w-md mx-auto space-y-3 pt-4">
                  <a href="/logo.svg" download="digitalife_resource.svg"
                    className="w-full bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border-none shadow-md">
                    <FileText className="w-4 h-4" /> Direct Download Link (PDF)
                  </a>
                  <a href="https://notion.so" target="_blank" rel="noreferrer"
                    className="w-full bg-transparent hover:bg-slate-50 border border-black/10 text-slate-900 font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
                    <Database className="w-4 h-4 text-[#3e4095]" /> Open Editable Workspace Template
                  </a>
                </div>
              </div>
            )
          ) : (
            /* ── PAID RESOURCE: Premium Checkout Simulation ── */
            !formSubmitted ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-950">Premium Resource</h3>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{resource.title}</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">One-time purchase · Instant access</p>
                  </div>
                  <span className="text-2xl font-black text-amber-700">${resource.price?.toFixed(2)}</span>
                </div>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">Email for Delivery</label>
                    <div className="relative">
                      <input
                        type="email" placeholder="you@company.com" required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#fffdf5] border border-black/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500"
                      />
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-lg">
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing Checkout…</>
                    ) : (
                      <><CreditCard className="w-4 h-4" /> Buy Now — ${resource.price?.toFixed(2)}</>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 font-semibold text-center">
                    Secure checkout · 30-day money-back guarantee
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-500/10 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950">Purchase Complete!</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Your resource is ready for download.</p>
                </div>
                <div className="max-w-md mx-auto space-y-3 pt-4">
                  <a href="/logo.svg" download="digitalife_resource.svg"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border-none shadow-md">
                    <FileText className="w-4 h-4" /> Download Your Resource
                  </a>
                  <a href="https://notion.so" target="_blank" rel="noreferrer"
                    className="w-full bg-transparent hover:bg-slate-50 border border-black/10 text-slate-900 font-bold py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
                    <Database className="w-4 h-4 text-[#3e4095]" /> Open Editable Workspace Template
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>

    </div>
  );
}
