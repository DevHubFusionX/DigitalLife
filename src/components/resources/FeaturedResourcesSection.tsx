import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import type { Resource } from '../../types/resource';

interface FeaturedResourcesSectionProps {
  resources: Resource[];
  categoryNames: string[];
  selectedFeaturedTab: string;
  onSelectTab: (tab: string) => void;
}

export default function FeaturedResourcesSection({
  resources,
  categoryNames,
  selectedFeaturedTab,
  onSelectTab,
}: FeaturedResourcesSectionProps) {
  const featuredResources = resources.filter(
    (item) =>
      (selectedFeaturedTab === 'All' ||
        (item.category || '').toLowerCase() === selectedFeaturedTab.toLowerCase()) &&
      (item.featured === true || String(item.featured) === 'true')
  );

  return (
    <section className="py-20 max-w-7xl mx-auto px-6" id="featured-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-3">
          Featured Resources
        </h2>
        <p className="text-slate-500 text-sm font-semibold max-w-xl mx-auto">
          Handpicked templates and analytical reports structured by our lead consultants.
        </p>
      </div>

      {/* Categories Tab Bar */}
      <div className="flex justify-center border-b border-black/5 mb-12 overflow-x-auto pb-px">
        <div className="flex gap-8 whitespace-nowrap">
          <button
            type="button"
            onClick={() => onSelectTab('All')}
            className={`py-3.5 text-xs font-black uppercase tracking-wider relative transition-colors duration-250 cursor-pointer border-none bg-transparent ${
              selectedFeaturedTab === 'All' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            All
            {selectedFeaturedTab === 'All' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950" />
            )}
          </button>
          {categoryNames.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              className={`py-3.5 text-xs font-black uppercase tracking-wider relative transition-colors duration-250 cursor-pointer border-none bg-transparent ${
                selectedFeaturedTab === tab ? 'text-slate-950' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {selectedFeaturedTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredResources.map((item) => (
          <Link
            key={item.id}
            to={`/resources/${item.id}`}
            className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer no-underline"
          >
            {/* Cover: image or gradient */}
            <div
              className={`h-48 relative overflow-hidden ${
                !item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''
              } p-6 flex flex-col justify-between`}
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
                  <span className="text-[10px] font-black text-[#ffd148] tracking-widest uppercase block mb-1">
                    DIGITALIFE
                  </span>
                  <h3 className="text-white text-base font-black tracking-tight leading-snug">
                    {item.coverTitle || item.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6 flex flex-col justify-between grow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isFree ? (
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      ₦{Number(item.price || 0).toLocaleString()}
                    </span>
                  )}
                </div>
                <h4 className="text-slate-950 text-base font-bold tracking-tight mb-2 group-hover:text-[#3e4095] transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-950 mt-6 group-hover:text-[#3e4095] transition-colors self-start">
                {item.isFree ? 'Get Resource' : `Buy — ₦${Number(item.price || 0).toLocaleString()}`}{' '}
                <Download className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}

        {featuredResources.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 font-bold text-sm">
            No featured resources in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
