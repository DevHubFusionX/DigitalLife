import { Share2, Bookmark } from 'lucide-react';
import type { BlogSection } from '../../types/blog';

interface BlogPostSidebarProps {
  sections: BlogSection[];
  isCopied: boolean;
  onCopyLink: () => void;
}

export default function BlogPostSidebar({
  sections,
  isCopied,
  onCopyLink,
}: BlogPostSidebarProps) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-32 space-y-8">
        {sections.length > 0 && (
          <div>
            <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4">
              Table of Contents
            </h5>
            <nav className="flex flex-col gap-3">
              {sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#${sec.anchor}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.anchor)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#3e4095] hover:pl-1 border-l border-black/5 hover:border-[#3e4095] pl-3 py-0.5 transition-all duration-200 block no-underline"
                >
                  {sec.heading}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div className="border-t border-black/5 pt-6 space-y-4">
          <button
            type="button"
            onClick={onCopyLink}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
          >
            <Share2 className="w-4 h-4" /> {isCopied ? 'Link Copied!' : 'Share Article'}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#3e4095] transition-colors border-none bg-transparent cursor-pointer"
          >
            <Bookmark className="w-4 h-4" /> Save Bookmark
          </button>
        </div>
      </div>
    </aside>
  );
}
