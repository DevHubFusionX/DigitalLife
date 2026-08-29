import { Youtube, Sparkles, Layers, Video } from 'lucide-react';
import type { VideoResource } from '../../../types/video';

interface VideoStatsBarProps {
  videos: VideoResource[];
}

export default function VideoStatsBar({ videos }: VideoStatsBarProps) {
  const latestVideo = videos[0];
  const uniqueCategories = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Video Resources */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Video Masterclasses</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Video className="w-3.5 h-3.5 text-[#3e4095]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {videos.length}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Visual walkthroughs &amp; guides
          </p>
        </div>
      </div>

      {/* 2. Latest Featured Video (YouTube Red/Gradient) */}
      <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-[24px] p-5 flex flex-col justify-between shadow-md shadow-red-500/15 min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-white/90">Latest Upload</span>
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black text-white leading-tight line-clamp-1">
            {latestVideo ? latestVideo.title : 'Ready to upload'}
          </h3>
          <p className="text-[11px] font-bold text-white/80 mt-1">
            {latestVideo ? `${latestVideo.category} · YouTube` : 'Add your first video'}
          </p>
        </div>
      </div>

      {/* 3. Category Coverage */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Topic Coverage</span>
          <div className="w-7 h-7 rounded-xl bg-[#ffd148]/15 flex items-center justify-center text-[#b49200]">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {uniqueCategories.length} Topics
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate">
            {uniqueCategories.slice(0, 3).join(', ') || 'Strategy, Operations'}
          </p>
        </div>
      </div>

      {/* 4. Stream Source */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Platform Sync</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Youtube className="w-3.5 h-3.5 text-red-600" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            YouTube
          </h3>
          <p className="text-[11px] font-semibold text-emerald-600 font-bold mt-1">
            HD Embed &amp; HQ Thumbnails
          </p>
        </div>
      </div>
    </div>
  );
}
