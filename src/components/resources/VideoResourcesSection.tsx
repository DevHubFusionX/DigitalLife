import { Youtube, Play } from 'lucide-react';
import type { VideoResource } from '../../types/video';

interface VideoResourcesSectionProps {
  videos: VideoResource[];
}

export default function VideoResourcesSection({ videos }: VideoResourcesSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className="py-20 bg-slate-950" id="video-resources">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
              Video Library
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">Video Resources</h2>
          <p className="text-slate-400 text-sm font-semibold max-w-xl mx-auto">
            Watch expert tutorials and strategic walkthroughs from our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer block no-underline"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                  <div className="w-14 h-14 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 duration-300">
                    <Play className="w-5 h-5 text-slate-950 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest block mb-2">
                  {video.category}
                </span>
                <h3 className="text-white text-sm font-bold tracking-tight group-hover:text-[#ffd148] transition-colors mb-2">
                  {video.title}
                </h3>
                <p className="text-slate-400 text-[11px] font-semibold leading-relaxed line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-[10px] font-black uppercase text-slate-400 group-hover:text-[#ffd148] transition-colors">
                  <Play className="w-3 h-3" fill="currentColor" />
                  Watch on YouTube
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
