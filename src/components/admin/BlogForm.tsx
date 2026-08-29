import { useState, useEffect } from 'react';
import { X, Loader2, Eye, Edit3 } from 'lucide-react';
import type { BlogPost, BlogSection } from '../../types/blog';
import { addPost, updatePost } from '../../lib/firestore/blog';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';

import BlogMetaFields from './blog/form/BlogMetaFields';
import BlogSectionsEditor from './blog/form/BlogSectionsEditor';
import BlogLivePreview from './blog/form/BlogLivePreview';

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

function countWords(intro: string, sections: { heading: string; content: string }[]): number {
  const allText = [intro, ...sections.flatMap((s) => [s.heading, s.content])].join(' ');
  return allText.trim().split(/\s+/).filter(Boolean).length;
}

const emptySection = (): { heading: string; content: string } => ({ heading: '', content: '' });

export default function BlogForm({ editTarget, onClose }: BlogFormProps) {
  const { categories } = useMetadata();
  const { success, error: toastError } = useToast();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [title, setTitle] = useState(editTarget?.title ?? '');
  const [subtitle, setSubtitle] = useState(editTarget?.subtitle ?? '');
  const [author, setAuthor] = useState(editTarget?.author ?? 'Digitalife Strategy Team');
  const [authorRole, setAuthorRole] = useState(editTarget?.authorRole ?? 'Growth Consultant');
  const [category, setCategory] = useState(editTarget?.category ?? '');
  const [date, setDate] = useState(
    editTarget?.date ??
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
  );
  const [coverBg, setCoverBg] = useState(editTarget?.coverBg ?? GRADIENT_OPTIONS[0]);
  const [coverLabel, setCoverLabel] = useState(editTarget?.coverLabel ?? '');
  const [keyTakeaway, setKeyTakeaway] = useState(editTarget?.keyTakeaway ?? '');
  const [introduction, setIntroduction] = useState(editTarget?.introduction ?? '');
  const [slug, setSlug] = useState(editTarget?.id ?? '');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!editTarget);

  // Sections: edit mode converts BlogSection[] → flat content string
  const [sections, setSections] = useState<{ heading: string; content: string }[]>(
    editTarget?.sections?.length
      ? editTarget.sections.map((s) => ({ heading: s.heading, content: s.paragraphs.join('\n\n') }))
      : [emptySection()]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category && categories.length > 0) {
      setCategory(categories[0].name);
    }
  }, [categories, category]);

  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalWords = countWords(introduction, sections);

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
      coverLabel: coverLabel.trim() || title.trim().slice(0, 24).toUpperCase(),
      keyTakeaway: keyTakeaway.trim(),
      introduction: introduction.trim(),
      sections: builtSections,
      readTime,
    };

    try {
      if (editTarget) {
        await updatePost(editTarget.id, slug, payload);
        success('Blog post updated successfully.');
      } else {
        await addPost(slug, payload);
        success('New blog post published successfully.');
      }
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(msg);
      toastError(msg);
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-base font-black text-slate-950">
                {editTarget ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                {totalWords} words · {Math.max(1, Math.round(totalWords / 200))} min read
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-black/5">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none ${
                  activeTab === 'edit'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-500 bg-transparent'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none ${
                  activeTab === 'preview'
                    ? 'bg-white text-[#3e4095] shadow-xs'
                    : 'text-slate-500 bg-transparent'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Live Preview
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer border-none"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'edit' ? (
          <form
            id="blog-form"
            onSubmit={handleSubmit}
            className="overflow-y-auto p-6 space-y-5 grow"
          >
            {/* Meta Fields (Title, slug, excerpt, author, date, categories, cover) */}
            <BlogMetaFields
              title={title}
              setTitle={setTitle}
              slug={slug}
              setSlug={setSlug}
              setSlugManuallyEdited={setSlugManuallyEdited}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              author={author}
              setAuthor={setAuthor}
              authorRole={authorRole}
              setAuthorRole={setAuthorRole}
              category={category}
              setCategory={setCategory}
              categories={categories}
              date={date}
              setDate={setDate}
              coverBg={coverBg}
              setCoverBg={setCoverBg}
              coverLabel={coverLabel}
              setCoverLabel={setCoverLabel}
              inputCls={inputCls}
              labelCls={labelCls}
            />

            {/* Sections & Key Takeaway Editor */}
            <BlogSectionsEditor
              introduction={introduction}
              setIntroduction={setIntroduction}
              keyTakeaway={keyTakeaway}
              setKeyTakeaway={setKeyTakeaway}
              sections={sections}
              onSectionChange={handleSectionChange}
              onAddSection={addSection}
              onRemoveSection={removeSection}
              inputCls={inputCls}
              labelCls={labelCls}
            />

            {error && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                {error}
              </p>
            )}
          </form>
        ) : (
          <BlogLivePreview
            category={category}
            title={title}
            subtitle={subtitle}
            author={author}
            authorRole={authorRole}
            date={date}
            totalWords={totalWords}
            introduction={introduction}
            sections={sections}
            keyTakeaway={keyTakeaway}
          />
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/5 bg-white shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer border-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-form"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer border-none shadow-xs"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Publish Article'}
          </button>
        </div>
      </div>
    </div>
  );
}
