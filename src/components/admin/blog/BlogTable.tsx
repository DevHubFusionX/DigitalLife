import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Copy, Check } from 'lucide-react';
import type { BlogPost } from '../../../types/blog';
import { useToast } from '../../../hooks/useToast';

interface BlogTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export default function BlogTable({ posts, onEdit, onDelete }: BlogTableProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, title: string) => {
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success(`Copied live article link for "${title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (posts.length === 0) return null;

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-x-auto">
      <table className="w-full text-xs font-semibold text-slate-700">
        <thead>
          <tr className="text-left text-[10px] font-black text-slate-400 border-b border-slate-100 uppercase tracking-wider">
            <th className="pb-3 px-3">Cover</th>
            <th className="pb-3 px-3">Article Title &amp; Slug</th>
            <th className="pb-3 px-3 hidden md:table-cell">Category</th>
            <th className="pb-3 px-3 hidden lg:table-cell">Author</th>
            <th className="pb-3 px-3 hidden sm:table-cell">Date</th>
            <th className="pb-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
              {/* Cover Thumbnail */}
              <td className="py-3 px-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${post.coverBg || 'from-[#0f172a] to-[#1e293b]'} flex items-end p-1.5 text-white`}
                >
                  <span className="text-[7px] font-black text-[#ffd148] uppercase leading-none line-clamp-1">
                    {post.coverLabel || 'SOP'}
                  </span>
                </div>
              </td>

              {/* Title & Slug */}
              <td className="py-3 px-3">
                <p className="font-black text-slate-950 truncate max-w-xs">{post.title}</p>
                <p className="text-slate-400 text-[10px] font-mono truncate max-w-xs mt-0.5">
                  /blog/{post.id}
                </p>
              </td>

              {/* Category */}
              <td className="py-3 px-3 hidden md:table-cell">
                <span className="bg-[#3e4095]/10 text-[#3e4095] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {post.category || 'General'}
                </span>
              </td>

              {/* Author */}
              <td className="py-3 px-3 hidden lg:table-cell text-slate-600 truncate max-w-[120px]">
                {post.author}
              </td>

              {/* Date */}
              <td className="py-3 px-3 hidden sm:table-cell text-slate-400 text-[11px]">
                {post.date}
              </td>

              {/* Actions */}
              <td className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleCopyLink(post.id, post.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    title="Copy Article Link"
                  >
                    {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <Link
                    to={`/blog/${post.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#3e4095] hover:bg-slate-100 transition-colors"
                    title="View Live Article"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => onEdit(post)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
