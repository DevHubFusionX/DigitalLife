import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Copy, Check, Clock, Sparkles } from 'lucide-react';
import type { BlogPost } from '../../../types/blog';
import { useToast } from '../../../hooks/useToast';

interface BlogCardGridProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export default function BlogCardGrid({ posts, onEdit, onDelete }: BlogCardGridProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, title: string) => {
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success(`Copied live article link for "${title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all"
        >
          {/* Top Cover Frame */}
          <div className="relative h-44 overflow-hidden bg-slate-900">
            <div
              className={`w-full h-full bg-gradient-to-br ${post.coverBg || 'from-[#0f172a] to-[#1e293b]'} p-5 flex flex-col justify-between text-white relative`}
            >
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {post.category}
                </span>
                <Sparkles className="w-4 h-4 text-white/70" />
              </div>
              <div className="z-10">
                <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-wider block">
                  {post.coverLabel || 'INSIGHT'}
                </span>
                <h4 className="text-sm font-black text-white leading-snug line-clamp-2 mt-1">
                  {post.title}
                </h4>
              </div>
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-sm pointer-events-none" />
            </div>

            {/* Reading Time Pill Top Right */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                <Clock className="w-2.5 h-2.5" /> {post.readTime || '5 min read'}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span className="uppercase font-bold text-[#3e4095]">{post.category}</span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-sm font-black text-slate-950 line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 font-semibold line-clamp-2 leading-relaxed">
                {post.subtitle || post.introduction}
              </p>
            </div>

            {/* Author Chip & Slug */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-700 truncate max-w-[150px]">{post.author}</span>
              <span className="text-slate-400 font-mono text-[9px] truncate">/blog/{post.id}</span>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyLink(post.id, post.title)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                  title="Copy Live Article Link"
                >
                  {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <Link
                  to={`/blog/${post.id}`}
                  target="_blank"
                  className="p-2 rounded-xl text-slate-400 hover:text-[#3e4095] hover:bg-[#3e4095]/10 transition-colors"
                  title="View Live Article"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(post)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border-none cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
