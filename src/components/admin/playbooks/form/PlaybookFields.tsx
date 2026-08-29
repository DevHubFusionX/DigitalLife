import type { Resource } from '../../../../types/resource';

interface PlaybookFieldsProps {
  name: string;
  initials: string;
  role: string;
  order: number;
  avatarUrl?: string | null;
  linkedResourceId?: string | null;
  linkedResourceLabel: string;
  description: string;
  resources: Resource[];
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: (field: string, val: unknown) => void;
  onResourceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  inputCls: string;
  labelCls: string;
}

export default function PlaybookFields({
  name,
  initials,
  role,
  order,
  avatarUrl,
  linkedResourceId,
  linkedResourceLabel,
  description,
  resources,
  onNameChange,
  onFieldChange,
  onResourceChange,
  inputCls,
  labelCls,
}: PlaybookFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Expert Name *</label>
          <input
            required
            type="text"
            value={name}
            onChange={onNameChange}
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
            value={initials}
            onChange={(e) => onFieldChange('initials', e.target.value)}
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
            value={role}
            onChange={(e) => onFieldChange('role', e.target.value)}
            placeholder="e.g. Head of Scaling &amp; Systems"
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
            value={order}
            onChange={(e) => onFieldChange('order', Number(e.target.value))}
            className={inputCls}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className={labelCls}>Avatar Image URL (optional)</label>
          <input
            type="url"
            value={avatarUrl ?? ''}
            onChange={(e) => onFieldChange('avatarUrl', e.target.value)}
            placeholder="https://..."
            className={inputCls}
          />
        </div>

        {/* Linked Resource Dropdown */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Linked Digital Resource</label>
          <select
            value={linkedResourceId || ''}
            onChange={onResourceChange}
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
            value={linkedResourceLabel}
            onChange={(e) => onFieldChange('linkedResourceLabel', e.target.value)}
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
          value={description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Short biographical summary highlighting their operational achievements and methodology…"
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
