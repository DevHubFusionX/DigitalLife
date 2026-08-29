import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import type { Playbook } from '../../types/playbook';
import { addPlaybook, updatePlaybook } from '../../lib/firestore/playbooks';
import { useResources } from '../../hooks/useResources';
import { useToast } from '../../hooks/useToast';

import PlaybookAvatarPreview from './playbooks/form/PlaybookAvatarPreview';
import PlaybookFields from './playbooks/form/PlaybookFields';

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

/** Helper to generate initials from a full name */
function generateInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2);
}

export default function PlaybookForm({ editTarget, onClose }: PlaybookFormProps) {
  const { resources } = useResources();
  const { success, error: toastError } = useToast();

  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const updateField = (field: string, val: unknown) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

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
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          id="playbook-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 space-y-5 grow"
        >
          {/* Live Expert Avatar Preview */}
          <PlaybookAvatarPreview
            avatarUrl={form.avatarUrl}
            name={form.name}
            initials={form.initials}
            role={form.role}
          />

          {/* Form Fields */}
          <PlaybookFields
            name={form.name}
            initials={form.initials}
            role={form.role}
            order={form.order}
            avatarUrl={form.avatarUrl}
            linkedResourceId={form.linkedResourceId}
            linkedResourceLabel={form.linkedResourceLabel}
            description={form.description}
            resources={resources}
            onNameChange={handleNameChange}
            onFieldChange={updateField}
            onResourceChange={handleResourceChange}
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
