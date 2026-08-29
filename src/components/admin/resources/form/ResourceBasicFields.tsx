import { Loader2, Play, Youtube } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../../../../lib/youtube';

interface ResourceBasicFieldsProps {
  title: string;
  coverTitle: string;
  category: string;
  format: string;
  softwareRequired?: string | null;
  youtubeUrl?: string | null;
  description: string;
  availableCategories: string[];
  availableFormats: string[];
  metadataLoading: boolean;
  categoriesLength: number;
  formatsLength: number;
  onFieldChange: (field: string, val: string) => void;
  inputCls: string;
  labelCls: string;
}

export default function ResourceBasicFields({
  title,
  coverTitle,
  category,
  format,
  softwareRequired,
  youtubeUrl,
  description,
  availableCategories,
  availableFormats,
  metadataLoading,
  categoriesLength,
  formatsLength,
  onFieldChange,
  inputCls,
  labelCls,
}: ResourceBasicFieldsProps) {
  const youtubeVideoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Resource Title *</label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => onFieldChange('title', e.target.value)}
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
            value={coverTitle}
            onChange={(e) => onFieldChange('coverTitle', e.target.value)}
            placeholder="e.g. OPERATIONS PLAYBOOK"
            className={inputCls}
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelCls}>Category</label>
          {metadataLoading && categoriesLength === 0 ? (
            <div className="h-10 flex items-center px-4 bg-slate-50 border border-slate-200/90 rounded-xl">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            </div>
          ) : (
            <select
              value={category}
              onChange={(e) => onFieldChange('category', e.target.value)}
              className={inputCls}
            >
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
            {metadataLoading && formatsLength === 0 ? (
              <div className="h-10 flex items-center px-4 bg-slate-50 border border-slate-200/90 rounded-xl">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              </div>
            ) : (
              <select
                value={format}
                onChange={(e) => onFieldChange('format', e.target.value)}
                className={inputCls}
              >
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
              value={softwareRequired ?? ''}
              onChange={(e) => onFieldChange('softwareRequired', e.target.value)}
              placeholder="e.g. Notion, Google Sheets, Excel"
              className={inputCls}
            />
          </div>
        </div>

        {/* YouTube Tutorial URL */}
        <div className="sm:col-span-2">
          <label className={labelCls}>Attached YouTube Tutorial URL (optional)</label>
          <input
            type="url"
            value={youtubeUrl ?? ''}
            onChange={(e) => onFieldChange('youtubeUrl', e.target.value)}
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
          value={description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Compelling overview shown on the card and detail page..."
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
