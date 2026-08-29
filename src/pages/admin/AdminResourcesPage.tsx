import { useState } from 'react';
import { Layers, Plus, Loader2 } from 'lucide-react';
import { useResources } from '../../hooks/useResources';
import { useMetadata } from '../../hooks/useMetadata';
import { useToast } from '../../hooks/useToast';
import { deleteResource } from '../../lib/firestore/resources';
import type { Resource } from '../../types/resource';

import ResourceStatsBar from '../../components/admin/resources/ResourceStatsBar';
import ResourceFilterBar from '../../components/admin/resources/ResourceFilterBar';
import ResourceCardGrid from '../../components/admin/resources/ResourceCardGrid';
import ResourceTable from '../../components/admin/resources/ResourceTable';
import ResourceForm from '../../components/admin/ResourceForm';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';

export default function AdminResourcesPage() {
  const { resources, loading } = useResources();
  const { categories } = useMetadata();
  const { success, error: toastError } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Resource | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters & View state
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'paid' | 'free'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter computations
  const paidCount = resources.filter((r) => !r.isFree && Number(r.price) > 0).length;
  const freeCount = resources.filter((r) => r.isFree || !r.price || Number(r.price) === 0).length;

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.format.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      priceFilter === 'all'
        ? true
        : priceFilter === 'paid'
        ? !r.isFree && Number(r.price) > 0
        : r.isFree || !r.price || Number(r.price) === 0;

    const matchesCategory = categoryFilter ? r.category === categoryFilter : true;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (resource: Resource) => {
    setEditTarget(resource);
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
      await deleteResource(deletingId);
      success('Resource deleted successfully.');
      setDeletingId(null);
    } catch {
      toastError('Failed to delete resource.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 font-sans select-none">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Resource Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
            Manage your digital library of SOP templates, operational blueprints, and premium books.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer self-start sm:self-auto touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> Add Resource
        </button>
      </div>

      {/* 2. Top Summary KPI Stats */}
      <ResourceStatsBar resources={resources} />

      {/* 3. Search, Category, Price Filter Bar */}
      <ResourceFilterBar
        search={search}
        onSearchChange={setSearch}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categories={categories}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={resources.length}
        paidCount={paidCount}
        freeCount={freeCount}
        onAddNew={openAdd}
      />

      {/* 4. Main Catalog Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[#ffd148] animate-spin" />
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="bg-white rounded-[28px] p-12 text-center border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900">No resources found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search || categoryFilter || priceFilter !== 'all'
              ? 'No templates match your current filter criteria. Try resetting your search filters.'
              : 'Your library is empty. Click "Add Resource" to create your first operational blueprint or SOP.'}
          </p>
          {(search || categoryFilter || priceFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('');
                setPriceFilter('all');
              }}
              className="text-xs font-bold text-[#b49200] hover:text-[#946f00] hover:underline bg-transparent border-none cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <ResourceCardGrid
          resources={filteredResources}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      ) : (
        <ResourceTable
          resources={filteredResources}
          onEdit={openEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

      {/* 5. Resource Form Modal (Add / Edit) */}
      {formOpen && <ResourceForm editTarget={editTarget} onClose={closeForm} />}

      {/* 6. Confirm Delete Modal */}
      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Resource"
          message="Are you sure you want to delete this resource? This will remove it from the live catalog and download library."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
