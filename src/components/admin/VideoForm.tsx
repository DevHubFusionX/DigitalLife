import { useState, useEffect } from 'react';
import { X, Youtube, Loader2, Play, Eye } from 'lucide-react';
import type { VideoResource } from '../../types/video';
import type { ResourceCategory } from '../../types/resource';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../../lib/youtube';
import { addVideo, updateVideo } from '../../lib/firestore/videos';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';

const DEFAULT_CATEGORIES: ResourceCategory[] = [
  'Strategy',
  'Operations',
  'Marketing',
  'Leadership',
  'AI & Tech',
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
  const { categories } = useMetadata();
  const { success, error: toastError } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [showEmbedPreview, setShowEmbedPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available categories list
  const availableCategories =
    categories.length > 0
      ? categories.map((c) => c.name as ResourceCategory)
      : DEFAULT_CATEGORIES;

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

  // Live YouTube preview extraction
  useEffect(() => {
    const id = extractYouTubeId(form.youtubeUrl);
    setVideoId(id);
    if (!id) setShowEmbedPreview(false);
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
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        youtubeUrl: form.youtubeUrl.trim(),
        youtubeId: videoId,
        thumbnailUrl: getYouTubeThumbnail(videoId),
      };
      if (editTarget) {
        await updateVideo(editTarget.id, payload);
        success('Video resource updated successfully.');
      } else {
        await addVideo(payload);
        success('Video resource added to catalog.');
      }
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save video.';
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
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-950">
                {editTarget ? 'Edit Video Resource' : 'Add Video Resource'}
              </h3>
              <p className="text-[10px] font-semibold text-slate-400">
                Integrate YouTube walkthroughs and workshop masterclasses
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form id="video-resource-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 grow">
          {/* YouTube URL */}
          <div>
            <label className={labelCls}>YouTube Video URL *</label>
            <input
              required
              type="url"
              value={form.youtubeUrl}
              onChange={set('youtubeUrl')}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
              className={inputCls}
            />
          </div>

          {/* Live Preview / Embed Toggle */}
          {videoId && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500">Live Preview</span>
                <button
                  type="button"
                  onClick={() => setShowEmbedPreview(!showEmbedPreview)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3e4095] hover:underline bg-transparent border-none cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  {showEmbedPreview ? 'Show Thumbnail' : 'Test Player'}
                </button>
              </div>

              {showEmbedPreview ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-inner">
                  <iframe
                    src={getYouTubeEmbedUrl(videoId)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 shadow-inner group">
                  <img
                    src={getYouTubeThumbnail(videoId)}
                    alt="YouTube thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    HQ Ready
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white font-mono text-[9px] px-2 py-0.5 rounded-full">
                    ID: {videoId}
                  </span>
                </div>
              )}
            </div>
          )}

          {!videoId && form.youtubeUrl && (
            <p className="text-[11px] font-bold text-amber-600 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
              Could not detect a valid YouTube ID. Please check the URL format.
            </p>
          )}

          {/* Title */}
          <div>
            <label className={labelCls}>Masterclass / Video Title *</label>
            <input
              required
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. MSME Operations Framework & Delegation Mastery"
              className={inputCls}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Topic Category *</label>
            <select value={form.category} onChange={set('category')} className={inputCls}>
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Summary Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={set('description')}
              placeholder="Provide a concise overview of the insights covered in this video walkthrough…"
              className={`${inputCls} resize-none`}
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">
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
            form="video-resource-form"
            disabled={saving || !videoId}
            className="flex-1 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editTarget ? 'Save Changes' : 'Publish Video'}
          </button>
        </div>
      </div>
    </div>
  );
}
