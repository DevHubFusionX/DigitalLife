import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ArrowRight, BookOpen, Download, Play, Youtube } from 'lucide-react';
import AuroraHero from '../components/ui/aurora-hero';
import { useResources } from '../hooks/useResources';
import { useVideos } from '../hooks/useVideos';
import { useMetadata } from '../hooks/useMetadata';

export default function ResourcesPage() {
  const { resources } = useResources();
  const { videos } = useVideos();
  const { categories, formats } = useMetadata();

  const categoryNames = categories.map((c) => c.name);
  const formatNames = formats.map((f) => f.name);

  const [selectedFeaturedTab, setSelectedFeaturedTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'VClan Resource Library | Free SOP Downloads & MSME Growth Playbooks';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Access our growing collection of guides, templates, toolkits, frameworks, training materials, and practical insights designed to help you grow with structure.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'free SOP template word download, small business operations manual template pdf, business workflow design template, standard operating procedures checklist download, small business organizational structure chart, editable company policy template, daily operations report sheet excel, employee onboarding checklist template, growth roadmap worksheet for founders, small business dashboard template download, business-formalization-tools, free-SOP-downloads, msme-growth-frameworks, small-business-playbooks, operational-efficiency-templates, skill-monetization-guides, structure-over-hustle, brand-positioning-resources, business-clarity-worksheets'
    );
  }, []);

  // Filtering logic for Browse All
  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All Topics' || item.category === selectedTopic;
    const matchesFormat = selectedFormat === 'All Formats' || item.format === selectedFormat;
    return matchesSearch && matchesTopic && matchesFormat;
  });

  // Auto-select first category tab when categories load
  useEffect(() => {
    if (!selectedFeaturedTab && categoryNames.length > 0) {
      setSelectedFeaturedTab(categoryNames[0]);
    }
  }, [categoryNames, selectedFeaturedTab]);

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20">

      {/* SECTION 1: HERO */}
      <AuroraHero variant="dark" className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <div className="lg:col-span-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
              VClan Resource Library
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-semibold mb-8">
              Access our growing collection of guides, templates, toolkits, frameworks, training materials, business resources, videos, and practical insights designed to help you grow with structure, increase visibility and Revenue
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-8 py-4 rounded-full text-xs transition-all shadow-lg flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                Explore All Resources
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

      {/* SECTION 2: FEATURED RESOURCES */}
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
            {categoryNames.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFeaturedTab(tab)}
                className={`py-3.5 text-xs font-black uppercase tracking-wider relative transition-colors duration-250 cursor-pointer ${
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
          {resources
            .filter((item) => item.category === selectedFeaturedTab)
            .map((item) => (
              <Link
                key={item.id}
                to={`/resources/${item.id}`}
                className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer"
              >
                {/* Cover: image or gradient */}
                <div className={`h-48 relative overflow-hidden ${!item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''} p-6 flex flex-col justify-between`}>
                  {item.coverImage && (
                    <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {item.format}
                    </span>
                    <div>
                      <span className="text-[10px] font-black text-[#ffd148] tracking-widest uppercase block mb-1">DIGITALIFE</span>
                      <h3 className="text-white text-base font-black tracking-tight leading-snug">{item.coverTitle}</h3>
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
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Free</span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
                      )}
                    </div>
                    <h4 className="text-slate-950 text-base font-bold tracking-tight mb-2 group-hover:text-[#3e4095] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">{item.description}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-950 mt-6 group-hover:text-[#3e4095] transition-colors self-start">
                    {item.isFree ? 'Get Resource' : `Buy — $${item.price?.toFixed(2)}`} <Download className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          {resources.filter((i) => i.category === selectedFeaturedTab).length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-bold text-sm">
              No featured resources in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: EXPERT PLAYBOOKS */}
      <section className="py-20 bg-slate-900/1 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-3">Expert Playbooks</h2>
            <p className="text-slate-500 text-sm font-semibold max-w-xl mx-auto">
              Read actionable strategies co-authored with certified practitioners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { initials: 'BS', name: 'Brandon Smithwick', role: 'Growth Strategy', desc: 'Experienced strategist focusing on value propositions and packaging models. Brandon specializes in helping early-stage service teams build authority and package capabilities to command high-ticket pricing.', link: '/resources/1', label: 'Value Proposition Roadmap' },
              { initials: 'GJ', name: 'Gabrielle Judge', role: 'Productivity & SOPs', desc: 'Workflow specialist and TEDx speaker focused on helping entrepreneurs remove bottleneck dependencies. Gabrielle builds minimal tools and operational protocols to streamline onboarding and delivery pipelines.', link: '/resources/6', label: 'SOP Delegation Playbook' },
              { initials: 'VC', name: 'Valerie Chapman', role: 'Marketing & Authority', desc: 'Founder & consultant specialized in bridging the authority gap. Valerie focuses on content architecture models, helping B2B teams and service agencies build audience channels on zero advertising spend.', link: '/resources/4', label: 'Organic Authority Guide' },
            ].map((p) => (
              <div key={p.name} className="bg-[#fffdf5] border border-black/5 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-900/5">
                      {p.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-950">{p.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{p.role}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">{p.desc}</p>
                </div>
                <Link to={p.link} className="flex items-center justify-between text-xs font-bold text-slate-950 hover:text-[#3e4095] border-t border-black/5 pt-4 mt-2 transition-colors">
                  <span>{p.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BROWSE ALL */}
      <section className="py-20 max-w-7xl mx-auto px-6" id="browse-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-3">Browse all resources</h2>
          <p className="text-slate-500 text-sm font-bold">Explore Free Tools, Templates, and Ebooks</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer"
            >
              <option value="All Topics">All Topics</option>
              {categoryNames.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 bottom-4 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer"
            >
              <option value="All Formats">All Formats</option>
              {formatNames.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 bottom-4 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative sm:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">Search all resources</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-[#fffdf5] border border-black/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095]"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 text-xs text-slate-400 font-bold border-b border-black/5 pb-4">
          <span>Showing 1 - {filteredResources.length} of {filteredResources.length}</span>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredResources.map((item) => (
            <Link
              key={item.id}
              to={`/resources/${item.id}`}
              className="group border border-black/5 bg-white rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-black/10 transition-all duration-300 cursor-pointer"
            >
              <div className={`h-40 relative overflow-hidden ${!item.coverImage ? `bg-linear-to-br ${item.coverBg}` : ''} p-5 flex flex-col justify-between`}>
                {item.coverImage && (
                  <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {item.format}
                  </span>
                  <div>
                    <span className="text-[9px] font-black text-[#ffd148] tracking-widest uppercase block mb-0.5">DIGITALIFE</span>
                    <h3 className="text-white text-sm font-black tracking-tight leading-snug">{item.coverTitle}</h3>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold text-[#3e4095] uppercase tracking-wider">{item.category}</span>
                    {item.isFree ? (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Free</span>
                    ) : (
                      <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">${item.price?.toFixed(2)}</span>
                    )}
                  </div>
                  <h4 className="text-slate-950 text-sm font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors">{item.title}</h4>
                  <p className="text-slate-500 text-[11px] font-semibold leading-relaxed">{item.description}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-950 mt-4 group-hover:text-[#3e4095] transition-colors self-start">
                  {item.isFree ? 'Download' : `Buy — $${item.price?.toFixed(2)}`} <Download className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 font-bold">
              No resources found matching the criteria.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: VIDEO RESOURCES */}
      {videos.length > 0 && (
        <section className="py-20 bg-slate-950" id="video-resources">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Youtube className="w-5 h-5 text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Video Library</span>
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
                  className="group bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer block"
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
                    <p className="text-slate-400 text-[11px] font-semibold leading-relaxed">
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
      )}

    </div>
  );
}
