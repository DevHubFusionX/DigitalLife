import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Playbook } from '../../types/playbook';
import { addPlaybook, updatePlaybook } from '../../lib/firestore/playbooks';
import { useResources } from '../../hooks/useResources';

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
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  /** Auto-generate initials from name when initials field is empty */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => {
      const autoInitials = name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0].toUpperCase())
        .join('')
        .slice(0, 2);
      return {
        ...prev,
        name,
        // Only auto-fill initials if user hasn't manually typed them
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
        order: Number(form.order) || 1,
        avatarUrl: form.avatarUrl || null,
        linkedResourceId: form.linkedResourceId || null,
      };
      if (editTarget) {
        await updatePlaybook(editTarget.id, payload);
      } else {
        await addPlaybook(payload);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save playbook.');
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
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0">
          <h3 className="text-base font-black text-slate-950">
            {editTarget ? 'Edit Expert Playbook' : 'Add Expert Playbook'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form id="playbook-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className={labelCls}>Expert Name</label>
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
              <label className={labelCls}>Initials</label>
              <input
                required
                type="text"
                maxLength={3}
                value={form.initials}
                onChange={set('initials')}
                placeholder="BS"
                className={inputCls}
              />
              <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                Auto-generated from name. Override if needed.
              </span>
            </div>

            {/* Role */}
            <div>
              <label className={labelCls}>Role / Specialty</label>
              <input
                required
                type="text"
                value={form.role}
                onChange={set('role')}
                placeholder="e.g. Growth Strategy"
                className={inputCls}
              />
            </div>

            {/* Order */}
            <div>
              <label className={labelCls}>Display Order</label>
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
              <label className={labelCls}>Avatar URL (optional)</label>
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
              <label className={labelCls}>Linked Resource</label>
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
              <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                The resource this playbook card links to on the public page.
              </span>
            </div>

            {/* CTA Label */}
            <div className="sm:col-span-2">
              <label className={labelCls}>CTA Label</label>
              <input
                required
                type="text"
                value={form.linkedResourceLabel}
                onChange={set('linkedResourceLabel')}
                placeholder="e.g. Value Proposition Roadmap"
                className={inputCls}
              />
              <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                Text shown on the card's action link.
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description / Bio</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={set('description')}
              placeholder="Short bio paragraph about this expert..."
              className={`${inputCls} resize-none`}
            />
          </div>

          {error && <p className="text-xs font-bold text-rose-500">{error}</p>}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/5 shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="playbook-form"
            disabled={saving}
            className="flex-1 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Add Playbook'}
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
