import { Calendar, Clock, User, Sparkles } from 'lucide-react';

interface BlogLivePreviewProps {
  category?: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  totalWords: number;
  introduction: string;
  sections: { heading: string; content: string }[];
  keyTakeaway?: string;
}

export default function BlogLivePreview({
  category,
  title,
  subtitle,
  author,
  authorRole,
  date,
  totalWords,
  introduction,
  sections,
  keyTakeaway,
}: BlogLivePreviewProps) {
  return (
    <div className="overflow-y-auto p-8 space-y-8 grow bg-[#fffdf5] text-slate-900">
      {/* Header Preview */}
      <div className="space-y-4 border-b border-black/5 pb-8">
        <span className="text-xs font-black uppercase text-[#3e4095] tracking-widest bg-[#3e4095]/5 px-3 py-1 rounded-full">
          {category || 'CATEGORY'}
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">
          {title || 'Untitled Blog Post'}
        </h1>
        <p className="text-slate-500 text-sm font-semibold border-l-2 border-[#ffd148] pl-4">
          {subtitle || 'Post excerpt will appear here.'}
        </p>
        <div className="flex items-center gap-6 text-xs text-slate-400 font-bold pt-2">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> {author} ({authorRole})
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {Math.max(1, Math.round(totalWords / 200))} min read
          </span>
        </div>
      </div>

      {/* Intro Preview */}
      <p className="text-base text-slate-700 font-semibold leading-relaxed first-letter:text-4xl first-letter:font-black first-letter:text-[#3e4095] first-letter:float-left first-letter:mr-2">
        {introduction || 'Introductory paragraphs will render here.'}
      </p>

      {/* Sections Preview */}
      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-lg font-black text-slate-950">{sec.heading || `Section ${idx + 1}`}</h3>
            {sec.content ? (
              sec.content.split('\n\n').map((p, pIdx) => (
                <p key={pIdx} className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-slate-400 text-xs italic">Section body is empty.</p>
            )}
          </div>
        ))}
      </div>

      {/* Takeaway Preview */}
      {keyTakeaway && (
        <div className="bg-[#3e4095]/[0.03] border-l-4 border-[#ffd148] p-5 rounded-r-2xl">
          <p className="text-[10px] font-black uppercase text-[#3e4095] tracking-widest mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ffd148]" /> Key Takeaway
          </p>
          <p className="text-slate-800 font-bold text-xs leading-relaxed italic">"{keyTakeaway}"</p>
        </div>
      )}
    </div>
  );
}
