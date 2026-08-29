import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import type { Playbook } from '../../types/playbook';
import { addPlaybook, updatePlaybook } from '../../lib/firestore/playbooks';
import { useResources } from '../../hooks/useResources';
import { useToast } from '../../hooks/useToast';

const EMPTY: Omit<Playbook, 'id' | 'createdAt' | 'updatedAt'> = {
  initials: '',
  name: '',
  role: '',
  description: '',
  avatarUrl: '',
  linkedResourceId: '',
  linkedResourceLabel: '',
  order: 1,
};

interface PlaybookFormProps {
  editTarget?: Playbook | null;
  onClose: () => void;
}

export default function PlaybookForm({ editTarget, onClose }: PlaybookFormProps) {
  const { resources } = useResources();
  const { success, error: toastError } = useToast();

  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escape key handler
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
      setForm({ ...EMPTY, ...rest, avatarUrl: rest.avatarUrl ?? '' });
    } else {
      setForm({ ...EMPTY });
    }
  }, [editTarget]);

  const set = <K extends keyof typeof EMPTY>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  /** Auto-generate initials from name when initials field is empty or matching */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => {
      const autoInitials = generateInitials(name);
      return {
        ...prev,
        name,
        ...(prev.initials === '' || prev.initials === generateInitials(prev.name)
          ? { initials: autoInitials }
          : {}),
      };
    });
  };

  const handleResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const resourceId = e.target.value;
    if (!resourceId) {
      setForm((prev) => ({ ...prev, linkedResourceId: '', linkedResourceLabel: '' }));
      return;
    }
    const resource = resources.find((r) => r.id === resourceId);
    setForm((prev) => ({
      ...prev,
      linkedResourceId: resourceId,
      linkedResourceLabel: prev.linkedResourceLabel || resource?.title || '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        initials: form.initials.trim().toUpperCase(),
        role: form.role.trim(),
        description: form.description.trim(),
        order: Number(form.order) || 1,
        avatarUrl: form.avatarUrl?.trim() || null,
        linkedResourceId: form.linkedResourceId || null,
        linkedResourceLabel: form.linkedResourceLabel.trim(),
      };
      if (editTarget) {
        await updatePlaybook(editTarget.id, payload);
        success('Playbook expert profile updated successfully.');
      } else {
        await addPlaybook(payload);
        success('New playbook expert added.');
      }
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save playbook.';
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
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl z-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e4095]/10 flex items-center justify-center text-[#3e4095]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">
                {editTarget ? 'Edit Expert Playbook' : 'Add Expert Playbook'}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Curate operational leaders and their linked master blueprints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form id="playbook-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 grow">
          {/* Live Expert Avatar Preview */}
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3e4095] to-[#2e3075] text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0 overflow-hidden">
              {form.avatarUrl ? (
                <img
                  src={form.avatarUrl}
                  alt={form.name || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{form.initials || 'EX'}</span>
              )}
            </div>
            <div className="grow truncate">
              <h4 className="text-xs font-black text-slate-900 truncate">
                {form.name || 'Expert Name Preview'}
              </h4>
              <p className="text-[10px] font-semibold text-slate-400 truncate">
                {form.role || 'Operational Leadership'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Expert Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Brandon Smithwick"
                className={inputCls}
              />
            </div>

            {/* Initials */}
            <div>
              <label className={labelCls}>Initials *</label>
              <input
                required
                type="text"
                maxLength={3}
                value={form.initials}
                onChange={set('initials')}
                placeholder="BS"
                className={inputCls}
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelCls}>Role / Specialty *</label>
              <input
                required
                type="text"
                value={form.role}
                onChange={set('role')}
                placeholder="e.g. Head of Scaling & Systems"
                className={inputCls}
              />
            </div>

            {/* Display Order */}
            <div>
              <label className={labelCls}>Display Order *</label>
              <input
                required
                type="number"
                min="1"
                value={form.order}
                onChange={set('order')}
                className={inputCls}
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className={labelCls}>Avatar Image URL (optional)</label>
              <input
                type="url"
                value={form.avatarUrl ?? ''}
                onChange={set('avatarUrl')}
                placeholder="https://..."
                className={inputCls}
              />
            </div>

            {/* Linked Resource Dropdown */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Linked Digital Resource</label>
              <select
                value={form.linkedResourceId || ''}
                onChange={handleResourceChange}
                className={inputCls}
              >
                <option value="">— No linked resource —</option>
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.category})
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Label */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Action Link CTA Label *</label>
              <input
                required
                type="text"
                value={form.linkedResourceLabel}
                onChange={set('linkedResourceLabel')}
                placeholder="e.g. Download Growth Blueprint"
                className={inputCls}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Expert Bio &amp; Summary *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={set('description')}
              placeholder="Short biographical summary highlighting their operational achievements and methodology…"
              className={`${inputCls} resize-none`}
            />
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
            form="playbook-form"
            disabled={saving}
            className="flex-1 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Publish Playbook'}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Helper to generate initials from a full name */
function generateInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2);
}
