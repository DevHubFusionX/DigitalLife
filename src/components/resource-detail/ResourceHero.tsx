import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Copy, MessageCircle } from 'lucide-react';
import type { Resource } from '../../types/resource';

interface ResourceHeroProps {
  resource: Resource;
  onGetAccessClick: () => void;
  shareOpen: boolean;
  setShareOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCopyLink: () => void;
}

export default function ResourceHero({
  resource,
  onGetAccessClick,
  shareOpen,
  setShareOpen,
  onCopyLink,
}: ResourceHeroProps) {
  const currentUrl = window.location.href;
  const shareText = `Check out "${resource.title}" from Digitalife Ehub:`;

  return (
    <>
      {/* BREADCRUMB */}
      <nav className="max-w-7xl mx-auto px-6 py-6 border-b border-black/5">
        <Link
          to="/resources"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
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
              {resource.isFree ? (
                <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  Free Download
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
                  ₦{resource.price ? Number(resource.price).toLocaleString() : '0'}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {resource.title}
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold max-w-2xl">
              {resource.description}
            </p>

            <div className="flex items-center gap-4 pt-4 relative">
              <button
                type="button"
                onClick={onGetAccessClick}
                className="bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-extrabold px-8 py-4 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                <Download className="w-4 h-4" /> GET ACCESS NOW
              </button>

              {/* Share Button & Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShareOpen((s) => !s)}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer bg-white/5 text-white"
                  title="Share Resource"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {shareOpen && (
                  <div className="absolute left-0 top-14 bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl z-30 min-w-44 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={onCopyLink}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer border-none bg-transparent"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors no-underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors no-underline"
                    >
                      <span className="font-mono text-xs">𝕏</span> Share on X
                    </a>
                  </div>
                )}
              </div>
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
                  <img
                    src={resource.coverImage}
                    alt={resource.title}
                    className="w-full h-full object-contain bg-slate-900"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-linear-to-br ${resource.coverBg} flex flex-col justify-between p-8 text-white`}
                  >
                    <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest">
                      DIGITALIFE
                    </span>
                    <div>
                      <span className="text-white/60 text-[10px] font-black uppercase tracking-wider block mb-2">
                        {resource.format}
                      </span>
                      <h3 className="text-white text-xl font-black leading-tight">
                        {resource.coverTitle || resource.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
