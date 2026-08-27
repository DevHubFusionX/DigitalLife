import { useState } from 'react';
import { Edit2, Trash2, ExternalLink, Copy, Check, Play, Youtube } from 'lucide-react';
import type { VideoResource } from '../../../types/video';
import { useToast } from '../../../hooks/useToast';

interface VideoCardGridProps {
  videos: VideoResource[];
  onEdit: (video: VideoResource) => void;
  onDelete: (id: string) => void;
}

export default function VideoCardGrid({ videos, onEdit, onDelete }: VideoCardGridProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (video: VideoResource) => {
    navigator.clipboard.writeText(video.youtubeUrl);
    setCopiedId(video.id);
    success(`Copied YouTube link for "${video.title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all"
        >
          {/* Top Video Thumbnail Frame */}
          <div className="relative h-48 overflow-hidden bg-slate-950">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            {/* Top Pills */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full">
                {video.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded-full shadow-xs">
                <Youtube className="w-3 h-3" /> YouTube
              </span>
            </div>

            {/* Play Button Overlay */}
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center group/btn"
              title="Watch on YouTube"
            >
              <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-hover/btn:bg-red-600 transition-all">
                <Play className="w-5 h-5 ml-0.5 fill-current" />
              </div>
            </a>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span className="uppercase font-bold text-[#3e4095]">{video.category}</span>
                {video.createdAt && (
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                )}
              </div>

              <h3 className="text-sm font-black text-slate-950 line-clamp-2 leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* YouTube Video ID Pill */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-600 truncate max-w-[170px]">ID: {video.youtubeId}</span>
              <span className="text-slate-400 font-mono text-[9px] truncate">youtube.com</span>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyLink(video)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                  title="Copy YouTube Link"
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
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Watch Video on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(video)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border-none cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => onDelete(video.id)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                  title="Delete Video"
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
