import type { Category } from '../../../../types/metadata';

const GRADIENT_OPTIONS = [
  'from-[#0f172a] to-[#1e293b]',
  'from-[#3e4095] to-[#4f46e5]',
  'from-[#0a2321] to-[#115e59]',
  'from-[#854d0e] to-[#b45309]',
  'from-[#4c1d95] to-[#6d28d9]',
  'from-[#9f1239] to-[#be123c]',
  'from-[#111827] to-[#1f2937]',
  'from-[#065f46] to-[#047857]',
  'from-[#1e1b4b] to-[#312e81]',
  'from-[#7c2d12] to-[#c2410c]',
];

interface BlogMetaFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  setSlugManuallyEdited: (val: boolean) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  author: string;
  setAuthor: (val: string) => void;
  authorRole: string;
  setAuthorRole: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  categories: Category[];
  date: string;
  setDate: (val: string) => void;
  coverBg: string;
  setCoverBg: (val: string) => void;
  coverLabel: string;
  setCoverLabel: (val: string) => void;
  inputCls: string;
  labelCls: string;
}

export default function BlogMetaFields({
  title,
  setTitle,
  slug,
  setSlug,
  setSlugManuallyEdited,
  subtitle,
  setSubtitle,
  author,
  setAuthor,
  authorRole,
  setAuthorRole,
  category,
  setCategory,
  categories,
  date,
  setDate,
  coverBg,
  setCoverBg,
  coverLabel,
  setCoverLabel,
  inputCls,
  labelCls,
}: BlogMetaFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className={labelCls}>Title *</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How to Scale SOPs for an MSME"
          className={inputCls}
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>URL Slug *</label>
        <input
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugManuallyEdited(true);
          }}
          placeholder="url-friendly-slug"
          className={`${inputCls} font-mono text-[#3e4095]`}
        />
        <p className="text-[10px] text-slate-400 font-semibold mt-1">
          Public URL: <span className="text-slate-600">/blog/{slug || '…'}</span>
        </p>
      </div>

      {/* Subtitle */}
      <div>
        <label className={labelCls}>Subtitle / Excerpt *</label>
        <textarea
          required
          rows={2}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="A compelling summary shown on preview cards and search results"
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Author & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Author *</label>
          <input
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Full name"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Author Role</label>
          <input
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="e.g. Head of Strategy"
            className={inputCls}
          />
        </div>
      </div>

      {/* Category & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category *</label>
          {categories.length > 0 ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputCls}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Operations"
              className={inputCls}
            />
          )}
        </div>
        <div>
          <label className={labelCls}>Date *</label>
          <input
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. Sep 19, 2026"
            className={inputCls}
          />
        </div>
      </div>

      {/* Cover BG + Label */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Cover Gradient</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {GRADIENT_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setCoverBg(g)}
                className={`w-8 h-8 rounded-lg bg-linear-to-br ${g} border-2 transition-all cursor-pointer ${
                  coverBg === g ? 'border-[#ffd148] scale-110' : 'border-transparent'
                }`}
                title={g}
              />
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Cover Label *</label>
          <input
            required
            value={coverLabel}
            onChange={(e) => setCoverLabel(e.target.value)}
            placeholder="e.g. OPERATIONS BLUEPRINT"
            className={inputCls}
          />
          <div className={`mt-2 h-10 rounded-xl bg-linear-to-br ${coverBg} px-3 flex items-center`}>
            <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest truncate">
              {coverLabel || 'LABEL PREVIEW'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
