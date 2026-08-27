import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, BookOpen, Loader2 } from 'lucide-react';
import { useBlog } from '../../hooks/useBlog';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';
import { deletePost } from '../../lib/firestore/blog';
import type { BlogPost } from '../../types/blog';

import BlogStatsBar from '../../components/admin/blog/BlogStatsBar';
import BlogFilterBar from '../../components/admin/blog/BlogFilterBar';
import BlogCardGrid from '../../components/admin/blog/BlogCardGrid';
import BlogTable from '../../components/admin/blog/BlogTable';
import BlogForm from '../../components/admin/BlogForm';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';

export default function AdminBlogPage() {
  const { posts, loading } = useBlog();
  const { categories } = useMetadata();
  const { success, error: toastError } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters & View state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setEditTarget(null);
      setFormOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.subtitle || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.introduction || '').toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditTarget(post);
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
      await deletePost(deletingId);
      success('Article deleted successfully.');
      setDeletingId(null);
    } catch {
      toastError('Failed to delete article.');
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
            Articles &amp; Editorial Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
            Publish thought-leadership insights, business scaling playbooks, and strategic guides.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer self-start sm:self-auto touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> Write Post
        </button>
      </div>

      {/* 2. Top Summary KPI Stats */}
      <BlogStatsBar posts={posts} />

      {/* 3. Filter Bar & View Toggle */}
      <BlogFilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={posts.length}
        onAddNew={openAdd}
      />

      {/* 4. Main Articles List */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[#ff5f38] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[28px] p-12 text-center border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900">No articles found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search || selectedCategory
              ? 'No posts match your current search criteria. Try clearing your filters.'
              : 'Your blog editorial hub is empty. Click "Write Post" to draft your first article.'}
          </p>
          {(search || selectedCategory) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
              }}
              className="text-xs font-bold text-[#ff5f38] hover:underline bg-transparent border-none cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <BlogCardGrid
          posts={filtered}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      ) : (
        <BlogTable
          posts={filtered}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {/* 5. Blog Form Modal (Write / Edit with Live Preview) */}
      {formOpen && <BlogForm editTarget={editTarget} onClose={closeForm} />}

      {/* 6. Confirm Delete Modal */}
      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Blog Post"
          message="Are you sure you want to delete this article? This will permanently remove it from the live website."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
