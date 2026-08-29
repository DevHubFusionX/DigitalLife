import { Search, ChevronDown, Tag, X } from 'lucide-react';

interface ResourceFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
  selectedPriceType: 'all' | 'free' | 'paid';
  setSelectedPriceType: (priceType: 'all' | 'free' | 'paid') => void;
  categoryNames: string[];
  formatNames: string[];
  totalFiltered: number;
  totalResources: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export default function ResourceFilterBar({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  selectedFormat,
  setSelectedFormat,
  selectedPriceType,
  setSelectedPriceType,
  categoryNames,
  formatNames,
  totalFiltered,
  totalResources,
  hasActiveFilters,
  onResetFilters,
}: ResourceFilterBarProps) {
  return (
    <>
      {/* Pricing Quick Filter Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-black/5">
          <button
            type="button"
            onClick={() => setSelectedPriceType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              selectedPriceType === 'all'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-500 bg-transparent'
            }`}
          >
            All Types
          </button>
          <button
            type="button"
            onClick={() => setSelectedPriceType('free')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              selectedPriceType === 'free'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 bg-transparent'
            }`}
          >
            Free Downloads
          </button>
          <button
            type="button"
            onClick={() => setSelectedPriceType('paid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              selectedPriceType === 'paid'
                ? 'bg-white text-[#3e4095] shadow-xs'
                : 'text-slate-500 bg-transparent'
            }`}
          >
            Premium Resources
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">
            Topic
          </label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer"
          >
            <option value="All Topics">All Topics</option>
            {categoryNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 bottom-4 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">
            Format
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full bg-[#fffdf5] border border-black/10 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095] appearance-none cursor-pointer"
          >
            <option value="All Formats">All Formats</option>
            {formatNames.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 bottom-4 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative sm:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 block">
            Search all resources
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates, SOPs, frameworks..."
              className="w-full bg-[#fffdf5] border border-black/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3e4095]"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Active Filters:
          </span>
          {selectedTopic !== 'All Topics' && (
            <span className="bg-slate-200/70 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              Topic: {selectedTopic}
              <button
                type="button"
                onClick={() => setSelectedTopic('All Topics')}
                className="border-none bg-transparent cursor-pointer p-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedFormat !== 'All Formats' && (
            <span className="bg-slate-200/70 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              Format: {selectedFormat}
              <button
                type="button"
                onClick={() => setSelectedFormat('All Formats')}
                className="border-none bg-transparent cursor-pointer p-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceType !== 'all' && (
            <span className="bg-slate-200/70 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              Pricing: {selectedPriceType === 'free' ? 'Free Only' : 'Premium Only'}
              <button
                type="button"
                onClick={() => setSelectedPriceType('all')}
                className="border-none bg-transparent cursor-pointer p-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-slate-200/70 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              Query: "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="border-none bg-transparent cursor-pointer p-0"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[10px] font-black uppercase text-[#3e4095] hover:underline cursor-pointer border-none bg-transparent ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-6 text-xs text-slate-400 font-bold border-b border-black/5 pb-4">
        <span>
          Showing {totalFiltered} of {totalResources} resources
        </span>
      </div>
    </>
  );
}
