import { useState, useEffect } from 'react';
import { X, Youtube, Loader2 } from 'lucide-react';
import type { VideoResource } from '../../types/video';
import type { ResourceCategory } from '../../types/resource';
import { extractYouTubeId, getYouTubeThumbnail } from '../../lib/youtube';
import { addVideo, updateVideo } from '../../lib/firestore/videos';

const CATEGORIES: ResourceCategory[] = [
  'Strategy', 'Operations', 'Marketing', 'Leadership', 'AI & Tech',
];

interface VideoFormProps {
  editTarget?: VideoResource | null;
  onClose: () => void;
}

const EMPTY_FORM = {
  title: '',
  category: 'Strategy' as ResourceCategory,
  description: '',
  youtubeUrl: '',
};

export default function VideoForm({ editTarget, onClose }: VideoFormProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editTarget) {
      setForm({
        title: editTarget.title,
        category: editTarget.category,
        description: editTarget.description,
        youtubeUrl: editTarget.youtubeUrl,
      });
      setVideoId(editTarget.youtubeId);
    }
  }, [editTarget]);

  // Live YouTube preview
  useEffect(() => {
    const id = extractYouTubeId(form.youtubeUrl);
    setVideoId(id);
  }, [form.youtubeUrl]);

  const set = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoId) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        youtubeUrl: form.youtubeUrl,
        youtubeId: videoId,
        thumbnailUrl: getYouTubeThumbnail(videoId),
      };
      if (editTarget) {
        await updateVideo(editTarget.id, payload);
      } else {
        await addVideo(payload);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save video.');
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
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-black text-slate-950">
              {editTarget ? 'Edit Video' : 'Add Video Resource'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 grow">
          {/* YouTube URL */}
          <div>
            <label className={labelCls}>YouTube URL</label>
            <input
              required
              type="url"
              value={form.youtubeUrl}
              onChange={set('youtubeUrl')}
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputCls}
            />
          </div>

          {/* Live thumbnail preview */}
          {videoId && (
            <div className="relative rounded-2xl overflow-hidden h-40 bg-slate-100">
              <img
                src={getYouTubeThumbnail(videoId)}
                alt="YouTube thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-t-transparent border-b-transparent border-l-white ml-1" />
                </div>
              </div>
              <span className="absolute top-3 right-3 bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                Preview
              </span>
            </div>
          )}

          {!videoId && form.youtubeUrl && (
            <p className="text-[10px] font-bold text-amber-500">
              Could not extract video ID — check the URL format.
            </p>
          )}

          {/* Title */}
          <div>
            <label className={labelCls}>Title</label>
            <input
              required
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. How to Build SOPs Fast"
              className={inputCls}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category} onChange={set('category')} className={inputCls}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={set('description')}
              placeholder="Brief description of what this video covers…"
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
            form="video-form"
            disabled={saving}
            onClick={handleSubmit}
            className="flex-1 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Add Video'}
          </button>
        </div>
      </div>
    </div>
  );
}
