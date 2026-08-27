import { useState } from 'react';
import { Edit2, Trash2, ExternalLink, Copy, Check, Play, Youtube } from 'lucide-react';
import type { VideoResource } from '../../../types/video';
import { useToast } from '../../../hooks/useToast';

interface VideoTableProps {
  videos: VideoResource[];
  onEdit: (video: VideoResource) => void;
  onDelete: (id: string) => void;
}

export default function VideoTable({ videos, onEdit, onDelete }: VideoTableProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (video: VideoResource) => {
    navigator.clipboard.writeText(video.youtubeUrl);
    setCopiedId(video.id);
    success(`Copied YouTube link for "${video.title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (videos.length === 0) return null;

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-x-auto">
      <table className="w-full text-xs font-semibold text-slate-700">
        <thead>
          <tr className="text-left text-[10px] font-black text-slate-400 border-b border-slate-100 uppercase tracking-wider">
            <th className="pb-3 px-3">Thumbnail</th>
            <th className="pb-3 px-3">Video Title &amp; Summary</th>
            <th className="pb-3 px-3 hidden md:table-cell">Category</th>
            <th className="pb-3 px-3 hidden lg:table-cell">YouTube ID</th>
            <th className="pb-3 px-3 hidden sm:table-cell">Date</th>
            <th className="pb-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-slate-50/70 transition-colors">
              {/* Thumbnail */}
              <td className="py-3 px-3">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-16 h-10 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative group"
                  title="Watch on YouTube"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xs">
                      <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </a>
              </td>

              {/* Title & Summary */}
              <td className="py-3 px-3">
                <p className="font-black text-slate-950 truncate max-w-xs">{video.title}</p>
                <p className="text-slate-400 text-[10px] truncate max-w-xs mt-0.5">
                  {video.description}
                </p>
              </td>

              {/* Category */}
              <td className="py-3 px-3 hidden md:table-cell">
                <span className="bg-[#3e4095]/10 text-[#3e4095] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {video.category || 'General'}
                </span>
              </td>

              {/* YouTube ID / Watch Link */}
              <td className="py-3 px-3 hidden lg:table-cell">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-mono text-[11px] font-bold hover:underline"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>{video.youtubeId}</span>
                </a>
              </td>

              {/* Date */}
              <td className="py-3 px-3 hidden sm:table-cell text-slate-400 text-[11px]">
                {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '—'}
              </td>

              {/* Actions */}
              <td className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleCopyLink(video)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    title="Copy Video Link"
                  >
                    {copiedId === video.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Watch on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onEdit(video)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    title="Edit Video"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(video.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                    title="Delete Video"
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
