import { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, Loader2, Upload, Youtube, Play } from 'lucide-react';
import type { Resource } from '../../types/resource';
import CoverUpload from './CoverUpload';
import { addResource, updateResource } from '../../lib/firestore/resources';
import { useMetadata } from '../../hooks/useMetadata';
import { uploadResourceFile } from '../../lib/cloudinary';
import { useToast } from '../../hooks/useToast';
import { extractYouTubeId, getYouTubeThumbnail } from '../../lib/youtube';

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

const DEFAULT_CATEGORIES = ['Strategy', 'Operations', 'Marketing', 'Leadership', 'AI & Tech'];
const DEFAULT_FORMATS = ['PDF Guide', 'Notion Template', 'Google Sheets', 'Excel Sheet', 'Word Document', 'Checklist'];

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
  featured: false,
  downloadUrl: '',
};

interface ResourceFormProps {
  editTarget?: Resource | null;
  onClose: () => void;
}

export default function ResourceForm({ editTarget, onClose }: ResourceFormProps) {
  const { categories, formats, loading: metadataLoading } = useMetadata();
  const { success, error: toastError } = useToast();

  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);

  // Derive categories & formats with robust defaults
  const availableCategories = categories.length > 0
    ? categories.map((c) => c.name)
    : DEFAULT_CATEGORIES;

  const availableFormats = formats.length > 0
    ? formats.map((f) => f.name)
    : DEFAULT_FORMATS;

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError(null);
    setFileUploading(true);
    setFileProgress(0);

    // Auto-fill file size if empty
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const extension = file.name.split('.').pop()?.toUpperCase() || 'FILE';

    try {
      const url = await uploadResourceFile(file, setFileProgress);
      setForm((prev) => ({
        ...prev,
        downloadUrl: url,
        fileSize: prev.fileSize || `${sizeInMb} MB (${extension})`,
      }));
      success(`Resource file "${file.name}" uploaded successfully.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'File upload failed.';
      setFileError(msg);
      toastError(msg);
    } finally {
      setFileUploading(false);
    }
  };

  useEffect(() => {
    if (editTarget) {
      const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = editTarget;
      setForm({ ...EMPTY, ...rest });
    } else {
      setForm({
        ...EMPTY,
        category: availableCategories[0] ?? 'Operations',
        format: availableFormats[0] ?? 'PDF Guide',
      });
    }
  }, [editTarget, categories, formats]);

  const set = <K extends keyof typeof EMPTY>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCheckboxChange = (field: 'isFree' | 'featured') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));
  };

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
      const priceNum = form.isFree ? 0 : Number(form.price);
      if (!form.isFree && (!priceNum || priceNum <= 0)) {
        throw new Error('Please enter a valid price greater than $0.00 for paid resources.');
      }

      const payload = {
        ...form,
        category: form.category || availableCategories[0] || 'Operations',
        format: form.format || availableFormats[0] || 'PDF Guide',
        price: priceNum,
        deliverables: (form.deliverables ?? []).filter(Boolean),
        outcomes: (form.outcomes ?? []).filter(Boolean),
        coverImage: form.coverImage ?? null,
        downloadUrl: form.downloadUrl || null,
        topic: form.category,
        coverUrl: form.coverImage ?? null,
        coverGradient: form.coverBg,
        contentType: form.isFree ? ('Free' as const) : ('Premium' as const),
      };

      if (editTarget) {
        await updateResource(editTarget.id, payload);
        success('Resource updated successfully.');
      } else {
        await addResource(payload);
        success('New resource added to catalog.');
      }
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save resource.';
      setError(msg);
      toastError(msg);
    } finally {
      setSaving(false);
    }
  };

  const youtubeVideoId = form.youtubeUrl ? extractYouTubeId(form.youtubeUrl) : null;
  const inputCls =
    'w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5';

  const ngnPriceEstimate = Math.round((Number(form.price) || 0) * 1600);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0 bg-slate-50/50">
          <div>
            <h3 className="text-base font-black text-slate-950">
              {editTarget ? 'Edit Resource' : 'Add New Resource'}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Upload templates, playbooks, or guides for public download
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
          >
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
            <label className={labelCls}>Fallback Cover Gradient</label>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, coverBg: g.value }))}
                  title={g.label}
                  className={`w-8 h-8 rounded-lg bg-linear-to-br ${g.value} border-2 transition-all cursor-pointer ${
                    form.coverBg === g.value ? 'border-[#3e4095] scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Resource Title *</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={set('title')}
                placeholder="e.g. 2026 State of Scale Report & SOP Library"
                className={inputCls}
              />
            </div>

            {/* Cover Badge Label */}
            <div>
              <label className={labelCls}>Cover Badge / Label *</label>
              <input
                required
                type="text"
                value={form.coverTitle}
                onChange={set('coverTitle')}
                placeholder="e.g. OPERATIONS PLAYBOOK"
                className={inputCls}
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelCls}>Category</label>
              {metadataLoading && categories.length === 0 ? (
                <div className="h-10 flex items-center px-4 bg-slate-50 border border-slate-200/90 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                </div>
              ) : (
                <select value={form.category} onChange={set('category')} className={inputCls}>
                  {availableCategories.map((catName) => (
                    <option key={catName} value={catName}>
                      {catName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Format */}
            <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
              <div>
                <label className={labelCls}>Format</label>
                {metadataLoading && formats.length === 0 ? (
                  <div className="h-10 flex items-center px-4 bg-slate-50 border border-slate-200/90 rounded-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  </div>
                ) : (
                  <select value={form.format} onChange={set('format')} className={inputCls}>
                    {availableFormats.map((fmtName) => (
                      <option key={fmtName} value={fmtName}>
                        {fmtName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Software Required */}
              <div>
                <label className={labelCls}>Software Required (optional)</label>
                <input
                  type="text"
                  value={form.softwareRequired ?? ''}
                  onChange={set('softwareRequired')}
                  placeholder="e.g. Notion, Google Sheets, Excel"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="sm:col-span-2 border border-slate-200/90 bg-slate-50/70 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="isFree"
                  type="checkbox"
                  checked={form.isFree}
                  onChange={handleCheckboxChange('isFree')}
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

              {!form.isFree && (
                <div className="w-full sm:w-56 shrink-0 space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      $
                    </span>
                    <input
                      required
                      type="number"
                      min="0.50"
                      step="0.01"
                      value={form.price ?? ''}
                      onChange={set('price')}
                      placeholder="9.99"
                      className="w-full bg-white border border-slate-200/90 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
                    />
                  </div>
                  {Number(form.price) > 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      ≈ ₦{ngnPriceEstimate.toLocaleString()} via Paystack
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="sm:col-span-2 space-y-2">
              <label className={labelCls}>Resource File Attachment (PDF, DOCX, ZIP, etc.)</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={form.downloadUrl || ''}
                  onChange={set('downloadUrl')}
                  placeholder="Paste direct download URL or upload via Cloudinary..."
                  className="grow bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400"
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.zip,.xlsx,.xls,.pptx,.ppt,.txt,.csv"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  type="button"
                  disabled={fileUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5 cursor-pointer border-none shadow-xs"
                >
                  {fileUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {fileProgress}% Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      Upload File
                    </>
                  )}
                </button>
              </div>
              {fileError && <p className="text-[10px] font-bold text-rose-500 mt-1">{fileError}</p>}
            </div>

            {/* Featured Section */}
            <div className="sm:col-span-2 border border-slate-200/90 bg-slate-50/70 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  id="featured"
                  type="checkbox"
                  checked={form.featured || false}
                  onChange={handleCheckboxChange('featured')}
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

            {/* File Size */}
            <div>
              <label className={labelCls}>File Size / Format Label (optional)</label>
              <input
                type="text"
                value={form.fileSize ?? ''}
                onChange={set('fileSize')}
                placeholder="e.g. 4.8 MB (PDF)"
                className={inputCls}
              />
            </div>

            {/* YouTube Tutorial URL */}
            <div>
              <label className={labelCls}>Attached YouTube Tutorial URL (optional)</label>
              <input
                type="url"
                value={form.youtubeUrl ?? ''}
                onChange={set('youtubeUrl')}
                placeholder="https://youtube.com/watch?v=..."
                className={inputCls}
              />
            </div>
          </div>

          {/* YouTube Video Preview Pill if provided */}
          {youtubeVideoId && (
            <div className="flex items-center gap-3 p-3 bg-red-50/70 border border-red-200/70 rounded-2xl">
              <div className="w-14 h-9 rounded-lg overflow-hidden bg-black shrink-0 relative">
                <img
                  src={getYouTubeThumbnail(youtubeVideoId)}
                  alt="YouTube thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
              <div className="grow">
                <p className="text-[11px] font-bold text-red-950 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-600" /> Linked Video Masterclass Detected
                </p>
                <p className="text-[10px] font-mono text-red-700 mt-0.5">ID: {youtubeVideoId}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className={labelCls}>Resource Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={set('description')}
              placeholder="Compelling overview shown on the card and detail page..."
              className={`${inputCls} resize-none`}
            />
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
                  <button
                    type="button"
                    onClick={() => removeListItem('deliverables', idx)}
                    className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none"
                  >
                    <Minus className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('deliverables')}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors cursor-pointer border-none bg-transparent"
              >
                <Plus className="w-3.5 h-3.5" /> Add deliverable item
              </button>
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <label className={labelCls}>Target Outcomes &amp; Strategic Benefits</label>
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
                  <button
                    type="button"
                    onClick={() => removeListItem('outcomes', idx)}
                    className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none"
                  >
                    <Minus className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('outcomes')}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors cursor-pointer border-none bg-transparent"
              >
                <Plus className="w-3.5 h-3.5" /> Add outcome benefit
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3.5 rounded-2xl border border-rose-100">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/5 shrink-0 flex gap-3 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-3 rounded-xl border border-slate-200/80 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="resource-form"
            disabled={saving || (metadataLoading && categories.length === 0)}
            className="flex-1 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Publish Resource'}
          </button>
        </div>
      </div>
    </div>
  );
}
