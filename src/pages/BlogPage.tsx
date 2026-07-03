import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Loader2 } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';

export default function BlogPage() {
  const { posts, loading } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Insights & Guides | How to Write an SOP & Scale Your Business | Digitalife Ehub";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Read practical guides on how to write an SOP for a small business, how to move from business hustle to structure, why your business is stagnant, and building team structures for MSMEs.');

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'how to write an SOP for a small business, how to move from business hustle to structure, why is my business stagnant despite high sales, how to build a team structure for an MSME, what are the structural gaps killing business growth, how to transition from informal business to corporate, how to create standard operating procedures without tech skills, how to turn business services into scalable digital products, how to monitor employee accountability in small business');
  }, []);

  // Derive unique categories from live data
  const categories = ['All Topics', ...Array.from(new Set(posts.map((p) => p.category))).sort()];

  // Sorted posts: newest first (by createdAt then by date string fallback)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestPost = sortedPosts[0] ?? null;
  const editorsPicks = sortedPosts.slice(1, 4);
  const gridPosts = sortedPosts.slice(4);

  const filteredGrid = (searchQuery || selectedCategory !== 'All Topics')
    ? sortedPosts.filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (post.subtitle ?? '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Topics' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : gridPosts;

  // When filtering, show all matched posts in grid; hide the editorial top section
  const isFiltering = searchQuery !== '' || selectedCategory !== 'All Topics';

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-28 pb-20">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-4 leading-none">
          Digitalife Insights
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-semibold max-w-xl">
          Strategies, frameworks, and quiet reflections on scaling operations, clarifying positioning, and building brand authority.
        </p>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-[#3e4095] opacity-60" />
        </div>
      )}

      {!loading && (
        <>
          {/* TOP EDITORIAL SECTION: LATEST & EDITOR'S PICKS — hidden while filtering */}
          {!isFiltering && latestPost && (
            <section className="max-w-7xl mx-auto px-6 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left: Latest Post (Large Card) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Latest Post</span>
                  <Link 
                    to={`/blog/${latestPost.id}`}
                    className="group border border-black/5 bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:border-black/10 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    {/* Cover Illustration */}
                    <div className={`h-64 sm:h-80 bg-linear-to-br ${latestPost.coverBg} p-8 flex flex-col justify-between relative`}>
                      <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {latestPost.category}
                      </span>
                      <div>
                        <span className="text-[10px] font-black text-[#ffd148] tracking-widest uppercase block mb-1">FEATURED READ</span>
                        <h3 className="text-white text-lg md:text-2xl font-black tracking-tight leading-snug">
                          {latestPost.coverLabel}
                        </h3>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-xl md:text-2xl font-black text-slate-950 group-hover:text-[#3e4095] transition-colors leading-tight mb-3">
                        {latestPost.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-6">
                        {latestPost.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-t border-black/5 pt-4">
                        <span>By {latestPost.author}</span>
                        <span>{latestPost.date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right: Editor's Picks (List Column) */}
              {editorsPicks.length > 0 && (
                <div className="lg:col-span-5 flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Editor's Picks</span>
                  <div className="flex flex-col gap-6 flex-grow justify-between">
                    {editorsPicks.map((pick) => (
                      <Link 
                        key={pick.id} 
                        to={`/blog/${pick.id}`}
                        className="group flex gap-4 p-4 border border-black/5 bg-white rounded-2xl hover:shadow-md hover:border-black/10 transition-all duration-300 cursor-pointer"
                      >
                        {/* Mini Cover */}
                        <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-linear-to-br ${pick.coverBg} p-3 flex flex-col justify-between shrink-0`}>
                          <span className="text-[8px] font-black text-white bg-white/10 border border-white/10 px-1.5 py-0.5 rounded-md w-fit">
                            {pick.category}
                          </span>
                          <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-tighter">
                            {pick.coverLabel.split(' ')[0]}
                          </span>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col justify-between py-1 grow">
                          <div>
                            <h4 className="text-sm font-bold text-slate-950 group-hover:text-[#3e4095] transition-colors leading-snug line-clamp-2">
                              {pick.title}
                            </h4>
                            <p className="text-slate-500 text-[11px] font-semibold leading-normal line-clamp-2 mt-1">
                              {pick.subtitle}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mt-2">
                            <span>{pick.author}</span>
                            <span>{pick.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* FILTER & SEARCH BAR SECTION */}
          <section className="max-w-7xl mx-auto px-6 mb-12 border-t border-black/5 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              
              {/* Category Selector Dropdown */}
              <div className="relative">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Filters</span>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 border border-black/10 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 bg-white hover:border-[#3e4095] transition-colors cursor-pointer"
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-black/10 rounded-xl shadow-lg z-30 py-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-time Search input */}
              <div className="relative w-full sm:max-w-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Search articles</span>
                <div className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-white border border-black/10 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095]"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

            </div>
          </section>

          {/* ARTICLES GRID SECTION */}
          <section className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredGrid.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer"
                >
                  {/* Ebook/Cover preview */}
                  <div className={`h-40 bg-linear-to-br ${post.coverBg} p-5 flex flex-col justify-between relative`}>
                    <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div>
                      <span className="text-[9px] font-black text-[#ffd148] tracking-widest uppercase block mb-0.5">INSIGHTS</span>
                      <h3 className="text-white text-sm font-black tracking-tight leading-snug">
                        {post.coverLabel}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between grow">
                    <div>
                      <h4 className="text-slate-950 text-sm font-bold tracking-tight mb-2 group-hover:text-[#3e4095] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] font-semibold leading-relaxed line-clamp-3">
                        {post.subtitle}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold border-t border-black/5 pt-3 mt-4">
                      <span>By {post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredGrid.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 font-semibold">
                  No articles found matching the criteria.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
