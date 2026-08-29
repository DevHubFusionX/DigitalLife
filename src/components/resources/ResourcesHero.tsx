import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import AuroraHero from '../ui/aurora-hero';

interface ResourcesHeroProps {
  totalResources: number;
  onExploreClick: () => void;
}

export default function ResourcesHero({ totalResources, onExploreClick }: ResourcesHeroProps) {
  return (
    <AuroraHero variant="dark" className="pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        <div className="lg:col-span-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Digitalife Resource Library
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-semibold mb-8">
            Access our growing collection of guides, templates, toolkits, frameworks, training materials, business resources, videos, and practical insights designed to help you grow with structure, increase visibility, and scale revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-8 py-4 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 border-none cursor-pointer"
            >
              Explore All Resources ({totalResources})
            </button>
            <Link
              to="/community"
              className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-xs transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              Join Community
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 relative h-64">
          <div className="absolute inset-0 bg-[#ffd148]/5 rounded-[40px] border border-white/5 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-[#ffd148] opacity-60" />
          </div>
        </div>
      </div>
    </AuroraHero>
  );
}
