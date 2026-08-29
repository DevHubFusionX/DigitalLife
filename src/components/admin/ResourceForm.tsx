import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Resource } from '../../types/resource';
import { addResource, updateResource } from '../../lib/firestore/resources';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';

import ResourceMediaFields from './resources/form/ResourceMediaFields';
import ResourceBasicFields from './resources/form/ResourceBasicFields';
import ResourcePricingFields from './resources/form/ResourcePricingFields';
import ResourceFileUpload from './resources/form/ResourceFileUpload';
import ResourceListFields from './resources/form/ResourceListFields';

const DEFAULT_CATEGORIES = ['Strategy', 'Operations', 'Marketing', 'Leadership', 'AI & Tech'];
const DEFAULT_FORMATS = [
  'PDF Guide',
  'Notion Template',
  'Google Sheets',
  'Excel Sheet',
  'Word Document',
  'Checklist',
];

const EMPTY: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  category: '',
  format: '',
  description: '',
  coverBg: 'from-[#0f172a] to-[#1e293b]',
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

  const availableCategories =
    categories.length > 0 ? categories.map((c) => c.name) : DEFAULT_CATEGORIES;
  const availableFormats = formats.length > 0 ? formats.map((f) => f.name) : DEFAULT_FORMATS;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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

  const updateField = (field: string, val: unknown) => {
    setForm((prev) => ({ ...prev, [field]: val }));
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

  const inputCls =
    'w-full bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5';

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
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          id="resource-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-6 grow"
        >
          {/* 1. Cover and Gradient Media */}
          <ResourceMediaFields
            coverImage={form.coverImage}
            coverBg={form.coverBg}
            onCoverImageChange={(url) => updateField('coverImage', url)}
            onCoverBgChange={(bg) => updateField('coverBg', bg)}
            labelCls={labelCls}
          />

          {/* 2. Basic Metadata Fields */}
          <ResourceBasicFields
            title={form.title}
            coverTitle={form.coverTitle}
            category={form.category}
            format={form.format}
            softwareRequired={form.softwareRequired}
            youtubeUrl={form.youtubeUrl}
            description={form.description}
            availableCategories={availableCategories}
            availableFormats={availableFormats}
            metadataLoading={metadataLoading}
            categoriesLength={categories.length}
            formatsLength={formats.length}
            onFieldChange={updateField}
            inputCls={inputCls}
            labelCls={labelCls}
          />

          {/* 3. Pricing & Featured Flags */}
          <ResourcePricingFields
            isFree={form.isFree}
            price={form.price}
            featured={form.featured}
            onFreeToggle={(checked) => updateField('isFree', checked)}
            onPriceChange={(val) => updateField('price', val)}
            onFeaturedToggle={(checked) => updateField('featured', checked)}
          />

          {/* 4. File Attachment Upload */}
          <ResourceFileUpload
            downloadUrl={form.downloadUrl}
            fileSize={form.fileSize}
            onDownloadUrlChange={(url) => updateField('downloadUrl', url)}
            onFileSizeChange={(size) => updateField('fileSize', size)}
            inputCls={inputCls}
            labelCls={labelCls}
          />

          {/* 5. Deliverables & Outcomes Lists */}
          <ResourceListFields
            deliverables={form.deliverables}
            outcomes={form.outcomes}
            onAddDeliverable={() => addListItem('deliverables')}
            onRemoveDeliverable={(idx) => removeListItem('deliverables', idx)}
            onUpdateDeliverable={(idx, val) => updateListItem('deliverables', idx, val)}
            onAddOutcome={() => addListItem('outcomes')}
            onRemoveOutcome={(idx) => removeListItem('outcomes', idx)}
            onUpdateOutcome={(idx, val) => updateListItem('outcomes', idx, val)}
            inputCls={inputCls}
            labelCls={labelCls}
          />

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
