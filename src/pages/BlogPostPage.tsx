import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, CheckCircle, Loader2 } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = useBlog();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const post = posts.find((p) => p.id === id) ?? null;

  // Related reads: same category or same author, excluding current
  const relatedPosts = post
    ? posts
        .filter((p) => p.id !== post.id && (p.category === post.category || p.author === post.author))
        .slice(0, 3)
    : [];
  const finalRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : posts.filter((p) => p.id !== (post?.id ?? '')).slice(0, 3);

  // Update document title once post is loaded
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Digitalife Ehub`;
    }
  }, [post]);

  // Helper to handle link copying
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ─── Loading state ───
  if (loading) {
    return (
      <div className="bg-[#fffdf5] pt-28 pb-24 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#3e4095] opacity-50" />
      </div>
    );
  }

  // ─── Not found state ───
  if (!post) {
    return (
      <div className="bg-[#fffdf5] pt-28 pb-24 flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="text-5xl font-black text-slate-200 mb-4">404</p>
        <h1 className="text-xl font-black text-slate-950 mb-2">Article not found</h1>
        <p className="text-sm text-slate-500 font-semibold mb-8">
          This article may have been removed or the link is incorrect.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-xs font-bold text-[#3e4095] hover:text-[#2e3075] uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20 pb-24 relative">
      
      {/* Sticky Progress Indicator */}
      <div className="fixed top-[72px] left-0 right-0 h-1 bg-slate-200 z-40">
        <div 
          className="h-full bg-[#3e4095] transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header Area */}
      <header className="border-b border-black/5 py-16 md:py-24 bg-slate-900/[0.01]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/blog" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-black uppercase text-[#3e4095] tracking-widest bg-[#3e4095]/5 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-semibold mb-8 border-l-2 border-[#ffd148] pl-4">
            {post.subtitle}
          </p>

          {/* Metadata Block */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-black/5 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-700 border border-slate-900/5 uppercase">
                {post.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">{post.author}</h4>
                <span className="text-[10px] font-bold text-slate-400 block">{post.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Sticky Table of Contents & Tools (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 space-y-8">
            {post.sections.length > 0 && (
              <div>
                <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4">Table of Contents</h5>
                <nav className="flex flex-col gap-3">
                  {post.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#${sec.anchor}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(sec.anchor)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-[#3e4095] hover:pl-1 border-l border-black/5 hover:border-[#3e4095] pl-3 py-0.5 transition-all duration-200 block"
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="border-t border-black/5 pt-6 space-y-4">
              <button 
                onClick={copyLinkToClipboard}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> {isCopied ? "Link Copied!" : "Share Article"}
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer">
                <Bookmark className="w-4 h-4" /> Save Bookmark
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Article Rich Text Content */}
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
                    <p key={pIdx} className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
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
              onClick={copyLinkToClipboard}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
            >
              <Share2 className="w-4 h-4" /> {isCopied ? "Copied!" : "Share"}
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer">
              <Bookmark className="w-4 h-4" /> Save
            </button>
          </div>

          {/* Newsletter signup box */}
          <div className="border border-black/5 bg-white rounded-3xl p-8 mt-16 shadow-sm">
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
      </div>

      {/* RELATED READS SECTION */}
      {finalRelated.length > 0 && (
        <footer className="max-w-6xl mx-auto px-6 border-t border-black/5 pt-16 mt-16">
          <h4 className="text-lg font-black text-slate-950 uppercase tracking-wider mb-8">Related Articles</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalRelated.map((item) => (
              <Link 
                key={item.id} 
                to={`/blog/${item.id}`}
                className="group border border-black/5 bg-white rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-black/10 transition-all duration-300"
              >
                {/* Cover illustration */}
                <div className={`h-36 bg-gradient-to-br ${item.coverBg} p-4 flex flex-col justify-between relative`}>
                  <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="text-white text-xs font-black tracking-tight leading-snug">
                      {item.coverLabel}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h5 className="text-slate-950 text-xs font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h5>
                    <p className="text-slate-400 text-[10px] font-bold block mb-1">By {item.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </footer>
      )}

    </div>
  );
}
