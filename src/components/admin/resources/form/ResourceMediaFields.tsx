import CoverUpload from '../../CoverUpload';

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

interface ResourceMediaFieldsProps {
  coverImage?: string | null;
  coverBg: string;
  onCoverImageChange: (url?: string) => void;
  onCoverBgChange: (gradient: string) => void;
  labelCls: string;
}

export default function ResourceMediaFields({
  coverImage,
  coverBg,
  onCoverImageChange,
  onCoverBgChange,
  labelCls,
}: ResourceMediaFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Cover Image Upload */}
      <CoverUpload
        currentImageUrl={coverImage || undefined}
        gradientClasses={coverBg}
        onUploadSuccess={(url) => onCoverImageChange(url)}
        onRemove={() => onCoverImageChange(undefined)}
      />

      {/* Gradient picker */}
      <div>
        <label className={labelCls}>Fallback Cover Gradient</label>
        <div className="flex flex-wrap gap-2">
          {GRADIENT_OPTIONS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => onCoverBgChange(g.value)}
              title={g.label}
              className={`w-8 h-8 rounded-lg bg-linear-to-br ${g.value} border-2 transition-all cursor-pointer ${
                coverBg === g.value
                  ? 'border-[#3e4095] scale-110 shadow-xs'
                  : 'border-transparent hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
