import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import type { BlogPost, BlogSection } from '../../types/blog';
import { addPost, updatePost } from '../../lib/firestore/blog';

interface BlogFormProps {
  editTarget: BlogPost | null;
  onClose: () => void;
}

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function calcReadTime(intro: string, sections: BlogSection[]): string {
  const allText = [intro, ...sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(' ');
  const words = allText.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

const emptySection = (): { heading: string; content: string } => ({ heading: '', content: '' });

export default function BlogForm({ editTarget, onClose }: BlogFormProps) {
  const [title, setTitle] = useState(editTarget?.title ?? '');
  const [subtitle, setSubtitle] = useState(editTarget?.subtitle ?? '');
  const [author, setAuthor] = useState(editTarget?.author ?? '');
  const [authorRole, setAuthorRole] = useState(editTarget?.authorRole ?? '');
  const [category, setCategory] = useState(editTarget?.category ?? '');
  const [date, setDate] = useState(editTarget?.date ?? '');
  const [coverBg, setCoverBg] = useState(editTarget?.coverBg ?? GRADIENT_OPTIONS[0]);
  const [coverLabel, setCoverLabel] = useState(editTarget?.coverLabel ?? '');
  const [keyTakeaway, setKeyTakeaway] = useState(editTarget?.keyTakeaway ?? '');
  const [introduction, setIntroduction] = useState(editTarget?.introduction ?? '');
  const [slug, setSlug] = useState(editTarget?.id ?? '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!editTarget);

  // Sections: edit mode converts BlogSection[] → flat content string; create mode starts empty
  const [sections, setSections] = useState<{ heading: string; content: string }[]>(
    editTarget?.sections?.length
      ? editTarget.sections.map((s) => ({ heading: s.heading, content: s.paragraphs.join('\n\n') }))
      : [emptySection()]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from title unless the user has manually overridden it
  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  const handleSectionChange = (idx: number, field: 'heading' | 'content', value: string) => {
    setSections((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const addSection = () => setSections((prev) => [...prev, emptySection()]);
  const removeSection = (idx: number) =>
    setSections((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Build BlogSection[] from flat content strings
    const builtSections: BlogSection[] = sections
      .filter((s) => s.heading.trim() || s.content.trim())
      .map((s) => ({
        heading: s.heading.trim(),
        anchor: slugify(s.heading),
        paragraphs: s.content.split('\n\n').map((p) => p.trim()).filter(Boolean),
      }));

    const readTime = calcReadTime(introduction, builtSections);

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      author: author.trim(),
      authorRole: authorRole.trim(),
      category: category.trim(),
      date: date.trim(),
      coverBg,
      coverLabel: coverLabel.trim(),
      keyTakeaway: keyTakeaway.trim(),
      introduction: introduction.trim(),
      sections: builtSections,
      readTime,
    };

    try {
      if (editTarget) {
        await updatePost(editTarget.id, slug, payload);
      } else {
        await addPost(slug, payload);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-slate-50 border border-black/10 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-base font-black text-slate-950">
              {editTarget ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              {editTarget ? `Editing: ${editTarget.id}` : 'Fill in the details below to publish a new article.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className={labelCls}>Title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
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
              placeholder="A one-liner summary shown on cards"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Author row */}
          <div className="grid grid-cols-2 gap-4">
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
                placeholder="e.g. Head of Operations"
                className={inputCls}
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Operations"
                className={inputCls}
              />
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Cover Gradient</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {GRADIENT_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setCoverBg(g)}
                    className={`w-8 h-8 rounded-lg bg-linear-to-br ${g} border-2 transition-all ${
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
              {/* Preview swatch */}
              <div
                className={`mt-2 h-12 rounded-xl bg-linear-to-br ${coverBg} px-3 flex items-center`}
              >
                <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest">
                  {coverLabel || 'LABEL PREVIEW'}
                </span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <label className={labelCls}>Introduction *</label>
            <textarea
              required
              rows={4}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="Opening paragraph(s) shown at the start of the article"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Dynamic Sections */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>Sections</label>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-1 text-[10px] font-black text-[#3e4095] hover:text-[#2e3075] transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Section
              </button>
            </div>
            <div className="space-y-4">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="border border-black/8 rounded-xl p-4 bg-slate-50 space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    disabled={sections.length === 1}
                    className="absolute top-3 right-3 w-6 h-6 rounded-md bg-white hover:bg-rose-50 flex items-center justify-center transition-colors disabled:opacity-30"
                    title="Remove section"
                  >
                    <Trash2 className="w-3 h-3 text-rose-500" />
                  </button>
                  <div>
                    <label className={labelCls}>Section {idx + 1} Heading</label>
                    <input
                      value={sec.heading}
                      onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                      placeholder="Section heading"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Content</label>
                    <textarea
                      rows={4}
                      value={sec.content}
                      onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                      placeholder="Write the section body. Separate paragraphs with a blank line."
                      className={`${inputCls} resize-none`}
                    />
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      Separate paragraphs with a blank line (double Enter).
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaway */}
          <div>
            <label className={labelCls}>Key Takeaway *</label>
            <textarea
              required
              rows={2}
              value={keyTakeaway}
              onChange={(e) => setKeyTakeaway(e.target.value)}
              placeholder="The single most important lesson from this article"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {editTarget ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
