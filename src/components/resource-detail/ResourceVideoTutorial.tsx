import { Play } from 'lucide-react';
import { getYouTubeEmbedUrl, extractYouTubeId } from '../../lib/youtube';

interface ResourceVideoTutorialProps {
  youtubeUrl?: string | null;
  title: string;
}

export default function ResourceVideoTutorial({ youtubeUrl, title }: ResourceVideoTutorialProps) {
  if (!youtubeUrl) return null;
  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-4 h-4 text-rose-500" fill="currentColor" />
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
            Watch Video Tutorial
          </h3>
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden border border-black/5 shadow-lg">
          <iframe
            src={getYouTubeEmbedUrl(youtubeId)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </section>
  );
}
