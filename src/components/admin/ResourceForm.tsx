import { useState, useEffect } from 'react';
import { X, Plus, Minus, Loader2 } from 'lucide-react';
import type { Resource } from '../../types/resource';
import CoverUpload from './CoverUpload';
import { addResource, updateResource } from '../../lib/firestore/resources';
import { useMetadata } from '../../hooks/useMetadata';

const GRADIENT_OPTIONS = [
  { label: 'Dark Navy', value: 'from-[#0f172a] to-[#1e293b]' },
  { label: 'Deep Blue', value: 'from-[#3e4095] to-[#2563eb]' },
  { label: 'Teal', value: 'from-[#0d9488] to-[#14b8a6]' },
  { label: 'Forest', value: 'from-[#0f1712] to-[#1c2e24]' },
  { label: 'Violet', value: 'from-[#4c1d95] to-[#7c3aed]' },
  { label: 'Amber', value: 'from-[#854d0e] to-[#b45309]' },
  { label: 'Indigo', value: 'from-[#1e1b4b] to-[#312e81]' },
  { label: 'Rose', value: 'from-[#9f1239] to-[#be123c]' },
];

const EMPTY: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  category: '',
  format: '',
  description: '',
  coverBg: GRADIENT_OPTIONS[0].value,
  coverTitle: '',
  coverImage: undefined,
  youtubeUrl: '',
  fileSize: '',
  softwareRequired: '',
  deliverables: [''],
  outcomes: [''],
  isFree: true,
  price: 0,
};

interface ResourceFormProps {
  editTarget?: Resource | null;
  onClose: () => void;
}

export default function ResourceForm({ editTarget, onClose }: ResourceFormProps) {
  const { categories, formats, loading: metadataLoading } = useMetadata();
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editTarget) {
      const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = editTarget;
      setForm({ ...EMPTY, ...rest });
    } else {
      setForm({
        ...EMPTY,
        category: categories[0]?.name ?? '',
        format: formats[0]?.name ?? '',
      });
    }
  }, [editTarget, categories, formats]);

  const set = <K extends keyof typeof EMPTY>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCheckboxChange = (field: 'isFree') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  // Dynamic list helpers
  const addListItem = (field: 'deliverables' | 'outcomes') =>
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] ?? []), ''] }));

  const removeListItem = (field: 'deliverables' | 'outcomes', idx: number) =>
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] ?? []).filter((_, i) => i !== idx),
    }));

  const updateListItem = (field: 'deliverables' | 'outcomes', idx: number, val: string) =>
    setForm((prev) => {
      const arr = [...(prev[field] ?? [])];
      arr[idx] = val;
      return { ...prev, [field]: arr };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        price: form.isFree ? 0 : Number(form.price),
        deliverables: (form.deliverables ?? []).filter(Boolean),
        outcomes: (form.outcomes ?? []).filter(Boolean),
        coverImage: form.coverImage ?? null,
      };
      if (editTarget) {
        await updateResource(editTarget.id, payload);
      } else {
        await addResource(payload);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full bg-slate-50 border border-black/10 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0">
          <h3 className="text-base font-black text-slate-950">
            {editTarget ? 'Edit Resource' : 'Add New Resource'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form id="resource-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 grow">
          {/* Cover Image Upload */}
          <CoverUpload
            currentImageUrl={form.coverImage || undefined}
            gradientClasses={form.coverBg}
            onUploadSuccess={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
            onRemove={() => setForm((prev) => ({ ...prev, coverImage: undefined }))}
          />

          {/* Gradient picker */}
          <div>
            <label className={labelCls}>Cover Gradient (fallback)</label>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, coverBg: g.value }))}
                  title={g.label}
                  className={`w-8 h-8 rounded-lg bg-linear-to-br ${g.value} border-2 transition-all ${
                    form.coverBg === g.value ? 'border-[#3e4095] scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Title</label>
              <input required type="text" value={form.title} onChange={set('title')} placeholder="Resource title" className={inputCls} />
            </div>

            {/* Cover Title */}
            <div>
              <label className={labelCls}>Cover Label</label>
              <input required type="text" value={form.coverTitle} onChange={set('coverTitle')} placeholder="Displayed on card cover" className={inputCls} />
            </div>

            {/* Category */}
            <div>
              <label className={labelCls}>Category</label>
              {metadataLoading ? (
                <div className="h-10 flex items-center px-4 bg-slate-50 border border-black/10 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                </div>
              ) : (
                <select value={form.category} onChange={set('category')} className={inputCls}>
                  {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  {categories.length === 0 && <option value="">No categories — add in settings</option>}
                </select>
              )}
            </div>

            {/* Format */}
            <div>
              <label className={labelCls}>Format</label>
              {metadataLoading ? (
                <div className="h-10 flex items-center px-4 bg-slate-50 border border-black/10 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                </div>
              ) : (
                <select value={form.format} onChange={set('format')} className={inputCls}>
                  {formats.map((f) => <option key={f.id} value={f.name}>{f.name}</option>)}
                  {formats.length === 0 && <option value="">No formats — add in settings</option>}
                </select>
              )}
            </div>

            {/* Pricing Section */}
            <div className="sm:col-span-2 border border-black/5 bg-slate-50 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="isFree"
                  type="checkbox"
                  checked={form.isFree}
                  onChange={handleCheckboxChange('isFree')}
                  className="w-4 h-4 text-[#3e4095] border-black/10 rounded-sm focus:ring-[#3e4095]"
                />
                <div>
                  <label htmlFor="isFree" className="text-xs font-bold text-slate-900 block cursor-pointer">
                    Free Resource
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    Gated with basic email lead capture only.
                  </span>
                </div>
              </div>

              {!form.isFree && (
                <div className="w-full sm:w-40 shrink-0">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      $
                    </span>
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.price ?? ''}
                      onChange={set('price')}
                      placeholder="9.99"
                      className="w-full bg-white border border-black/10 rounded-xl pl-6 pr-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* File Size */}
            <div>
              <label className={labelCls}>File Size (optional)</label>
              <input type="text" value={form.fileSize ?? ''} onChange={set('fileSize')} placeholder="e.g. 4.8 MB (PDF)" className={inputCls} />
            </div>

            {/* Software Required */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Software Required (optional)</label>
              <input type="text" value={form.softwareRequired ?? ''} onChange={set('softwareRequired')} placeholder="e.g. Notion, Google Sheets" className={inputCls} />
            </div>

            {/* YouTube URL */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Attached YouTube URL (optional)</label>
              <input type="url" value={form.youtubeUrl ?? ''} onChange={set('youtubeUrl')} placeholder="https://youtube.com/watch?v=..." className={inputCls} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea required rows={3} value={form.description} onChange={set('description')} placeholder="Short description shown on the card" className={`${inputCls} resize-none`} />
          </div>

          {/* Deliverables */}
          <div>
            <label className={labelCls}>What's Included (Deliverables)</label>
            <div className="space-y-2">
              {(form.deliverables ?? []).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem('deliverables', idx, e.target.value)}
                    placeholder={`Deliverable ${idx + 1}`}
                    className={inputCls}
                  />
                  <button type="button" onClick={() => removeListItem('deliverables', idx)}
                    className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors">
                    <Minus className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem('deliverables')}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors">
                <Plus className="w-3 h-3" /> Add deliverable
              </button>
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <label className={labelCls}>Target Outcomes</label>
            <div className="space-y-2">
              {(form.outcomes ?? []).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem('outcomes', idx, e.target.value)}
                    placeholder={`Outcome ${idx + 1}`}
                    className={inputCls}
                  />
                  <button type="button" onClick={() => removeListItem('outcomes', idx)}
                    className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors">
                    <Minus className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem('outcomes')}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors">
                <Plus className="w-3 h-3" /> Add outcome
              </button>
            </div>
          </div>

          {error && <p className="text-xs font-bold text-rose-500">{error}</p>}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/5 shrink-0 flex gap-3">
          <button type="button" onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" form="resource-form" disabled={saving || metadataLoading}
            className="flex-1 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Add Resource'}
          </button>
        </div>
      </div>
    </div>
  );
}

