import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import type { Resource } from '../../types/resource';

interface RelatedResourcesProps {
  currentResourceId: string;
  category?: string;
  resources: Resource[];
}

export default function RelatedResources({
  currentResourceId,
  category,
  resources,
}: RelatedResourcesProps) {
  const related = resources
    .filter((r) => r.id !== currentResourceId && (!category || r.category === category))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[10px] font-black text-[#3e4095] uppercase tracking-widest block mb-2">
            RECOMMENDED LEARNING
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Related Templates &amp; Playbooks
          </h2>
        </div>
        <Link
          to="/resources"
          className="text-xs font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors flex items-center gap-1.5 no-underline"
        >
          Browse Resource Library <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((item) => (
          <Link
            key={item.id}
            to={`/resources/${item.id}`}
            className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer no-underline"
          >
            <div
              className={`h-40 relative overflow-hidden ${
                !item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''
              } p-5 flex flex-col justify-between`}
            >
              {item.coverImage && (
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-contain bg-slate-900"
                />
              )}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {item.format}
                </span>
                <div>
                  <span className="text-[9px] font-black text-[#ffd148] tracking-widest uppercase block mb-0.5">
                    DIGITALIFE
                  </span>
                  <h3 className="text-white text-sm font-black tracking-tight leading-snug">
                    {item.coverTitle || item.title}
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between grow">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isFree ? (
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      ${item.price?.toFixed(2)}
                    </span>
                  )}
                </div>
                <h4 className="text-slate-950 text-sm font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[11px] font-semibold leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-950 mt-4 group-hover:text-[#3e4095] transition-colors self-start">
                {item.isFree ? 'Download' : `Buy — $${item.price?.toFixed(2)}`}{' '}
                <Download className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
