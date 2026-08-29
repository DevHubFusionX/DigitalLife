import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="border-b border-black/5 py-16 md:py-24 bg-slate-900/[0.01]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider no-underline"
          >
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
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-700 border border-slate-900/5 uppercase">
              {post.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
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
  );
}
