interface ResourcePricingFieldsProps {
  isFree: boolean;
  price?: number;
  featured?: boolean;
  onFreeToggle: (checked: boolean) => void;
  onPriceChange: (price: number) => void;
  onFeaturedToggle: (checked: boolean) => void;
}

export default function ResourcePricingFields({
  isFree,
  price,
  featured,
  onFreeToggle,
  onPriceChange,
  onFeaturedToggle,
}: ResourcePricingFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Free vs Paid Toggle */}
      <div className="border border-slate-200/90 bg-slate-50/70 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            id="isFree"
            type="checkbox"
            checked={isFree}
            onChange={(e) => onFreeToggle(e.target.checked)}
            className="w-4 h-4 text-[#3e4095] border-slate-300 rounded-sm focus:ring-[#3e4095] cursor-pointer"
          />
          <div>
            <label htmlFor="isFree" className="text-xs font-bold text-slate-900 block cursor-pointer">
              Free Resource Download
            </label>
            <span className="text-[10px] text-slate-400 font-semibold block">
              Gated with customer lead capture (Name + Work Email).
            </span>
          </div>
        </div>

        {!isFree && (
          <div className="w-full sm:w-56 shrink-0 space-y-1">
            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
              Price (NGN / ₦)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                ₦
              </span>
              <input
                required
                type="number"
                min="100"
                step="50"
                value={price ?? ''}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                placeholder="5000"
                className="w-full bg-white border border-slate-200/90 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
            {Number(price) > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 block">
                ₦{Number(price).toLocaleString()} direct Paystack charge
              </span>
            )}
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="border border-slate-200/90 bg-slate-50/70 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={featured || false}
            onChange={(e) => onFeaturedToggle(e.target.checked)}
            className="w-4 h-4 text-[#3e4095] border-slate-300 rounded-sm focus:ring-[#3e4095] cursor-pointer"
          />
          <div>
            <label htmlFor="featured" className="text-xs font-bold text-slate-900 block cursor-pointer">
              Featured Hero Resource
            </label>
            <span className="text-[10px] text-slate-400 font-semibold block">
              Highlighted prominently in the top section of the public catalog.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
