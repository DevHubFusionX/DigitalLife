import { useState } from 'react';
import { Plus, Youtube, Loader2 } from 'lucide-react';
import { useVideos } from '../../hooks/useVideos';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';
import { deleteVideo } from '../../lib/firestore/videos';
import type { VideoResource } from '../../types/video';

import VideoStatsBar from '../../components/admin/videos/VideoStatsBar';
import VideoFilterBar from '../../components/admin/videos/VideoFilterBar';
import VideoCardGrid from '../../components/admin/videos/VideoCardGrid';
import VideoTable from '../../components/admin/videos/VideoTable';
import VideoForm from '../../components/admin/VideoForm';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';

export default function AdminVideoResourcesPage() {
  const { videos, loading } = useVideos();
  const { categories } = useMetadata();
  const { success, error: toastError } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<VideoResource | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters & View state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filtered = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.youtubeId.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory ? v.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

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

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteVideo(deletingId);
      success('Video resource removed successfully.');
      setDeletingId(null);
    } catch {
      toastError('Failed to remove video resource.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 font-sans select-none">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Video Resources &amp; Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
            Curate YouTube walkthroughs, operational video tutorials, and masterclass sessions.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer self-start sm:self-auto touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> Add Video
        </button>
      </div>

      {/* 2. Top Summary KPI Stats */}
      <VideoStatsBar videos={videos} />

      {/* 3. Filter Bar & View Switcher */}
      <VideoFilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={videos.length}
        onAddNew={openAdd}
      />

      {/* 4. Main Videos Catalog Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[28px] p-12 text-center border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto text-slate-400">
            <Youtube className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-sm font-black text-slate-900">No video resources found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search || selectedCategory
              ? 'No videos match your current search or category filter. Try clearing your filters.'
              : 'Your video library is empty. Click "Add Video" to add your first YouTube masterclass or walkthrough.'}
          </p>
          {(search || selectedCategory) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
              }}
              className="text-xs font-bold text-red-600 hover:underline bg-transparent border-none cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <VideoCardGrid
          videos={filtered}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      ) : (
        <VideoTable
          videos={filtered}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {/* 5. Video Form Modal (Add / Edit) */}
      {formOpen && <VideoForm editTarget={editTarget} onClose={closeForm} />}

      {/* 6. Confirm Delete Modal */}
      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Video Resource"
          message="Are you sure you want to delete this video resource? This will permanently remove it from the digital resource catalog."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
