import { BookOpen, Sparkles, Clock, Layers } from 'lucide-react';
import type { BlogPost } from '../../../types/blog';

interface BlogStatsBarProps {
  posts: BlogPost[];
}

export default function BlogStatsBar({ posts }: BlogStatsBarProps) {
  const latestPost = posts[0];
  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  
  // Calculate total reading time
  const totalReadTime = posts.reduce((acc, p) => {
    const raw = (p.readTime || '5 min').replace(/[^0-9]/g, '');
    return acc + (parseInt(raw, 10) || 5);
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Articles Published */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Published Articles</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-[#3e4095]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {posts.length}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Thought leadership guides
          </p>
        </div>
      </div>

      {/* 2. Latest Feature (Featured Orange) */}
      <div className="bg-gradient-to-br from-[#ff5f38] to-[#ff7347] text-white rounded-[24px] p-5 flex flex-col justify-between shadow-md shadow-orange-500/15 min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-white/90">Latest Insight</span>
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black text-white leading-tight line-clamp-1">
            {latestPost ? latestPost.title : 'Ready to write'}
          </h3>
          <p className="text-[11px] font-bold text-white/80 mt-1">
            {latestPost ? `${latestPost.author} · ${latestPost.date}` : 'Publish your first post'}
          </p>
        </div>
      </div>

      {/* 3. Subject Coverage */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Editorial Topics</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Layers className="w-3.5 h-3.5 text-[#ff5f38]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {uniqueCategories.length} Topics
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate">
            {uniqueCategories.slice(0, 3).join(', ') || 'Operations, Strategy'}
          </p>
        </div>
      </div>

      {/* 4. Total Read Time */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Knowledge Depth</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            ~{totalReadTime} min
          </h3>
          <p className="text-[11px] font-semibold text-emerald-600 font-bold mt-1">
            Total reading duration
          </p>
        </div>
      </div>
    </div>
  );
}
