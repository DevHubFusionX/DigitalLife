import { Share2, Bookmark, CheckCircle } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogPostContentProps {
  post: BlogPost;
  isCopied: boolean;
  onCopyLink: () => void;
}

export default function BlogPostContent({
  post,
  isCopied,
  onCopyLink,
}: BlogPostContentProps) {
  return (
    <article className="lg:col-span-9 max-w-3xl mx-auto lg:mx-0">
      <p className="text-base md:text-lg leading-relaxed text-slate-700 font-semibold mb-12 first-letter:text-5xl first-letter:font-black first-letter:text-[#3e4095] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
        {post.introduction}
      </p>

      <div className="space-y-12">
        {post.sections.map((sec, idx) => (
          <section key={idx} id={sec.anchor} className="scroll-mt-32">
            <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight mb-4">
              {sec.heading}
            </h3>
            <div className="space-y-6">
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Key Takeaway Box */}
      {post.keyTakeaway && (
        <div className="bg-[#3e4095]/[0.02] border-l-4 border-[#ffd148] p-6 rounded-r-2xl my-12">
          <h5 className="text-[10px] font-black uppercase text-[#3e4095] tracking-widest mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#ffd148]" /> Key Takeaway
          </h5>
          <p className="text-slate-700 font-bold text-sm md:text-base leading-relaxed italic">
            "{post.keyTakeaway}"
          </p>
        </div>
      )}

      {/* Share Block (Mobile) */}
      <div className="lg:hidden flex gap-6 border-y border-black/5 py-4 my-8">
        <button
          type="button"
          onClick={onCopyLink}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
        >
          <Share2 className="w-4 h-4" /> {isCopied ? 'Copied!' : 'Share'}
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
        >
          <Bookmark className="w-4 h-4" /> Save
        </button>
      </div>

      {/* Newsletter signup box */}
      <div className="border border-black/5 bg-white rounded-3xl p-8 mt-16 shadow-xs">
        <h4 className="text-lg font-bold text-slate-950 mb-2">Subscribe to scaling frameworks</h4>
        <p className="text-xs text-slate-500 font-semibold mb-6">
          Get bi-weekly, high-substance systems tactics directly in your inbox. No marketing spam.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="grow bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095]"
          />
          <button
            type="submit"
            className="bg-slate-950 hover:bg-[#3e4095] text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors cursor-pointer border-none"
          >
            Join Frameworks
          </button>
        </form>
      </div>
    </article>
  );
}
