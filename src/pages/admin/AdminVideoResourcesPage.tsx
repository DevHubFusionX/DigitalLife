import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import VideoTable from '../../components/admin/VideoTable';
import VideoForm from '../../components/admin/VideoForm';
import { useVideos } from '../../hooks/useVideos';
import type { VideoResource } from '../../types/video';

export default function AdminVideoResourcesPage() {
  const { videos, loading } = useVideos();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<VideoResource | null>(null);
  const [search, setSearch] = useState('');

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (video: VideoResource) => {
    setEditTarget(video);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight">Video Resources</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {videos.length} video{videos.length !== 1 ? 's' : ''} in library
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos…"
          className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <VideoTable videos={filtered} onEdit={openEdit} />
      )}

      {/* Form modal */}
      {formOpen && <VideoForm editTarget={editTarget} onClose={closeForm} />}
    </div>
  );
}
