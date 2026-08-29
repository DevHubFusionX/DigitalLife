import { useState } from 'react';
import { Tag, Layers, Plus, Trash2, Loader2 } from 'lucide-react';
import { addCategory, deleteCategory, addFormat, deleteFormat } from '../../../lib/firestore/metadata';
import type { Category, Format } from '../../../lib/firestore/metadata';
import { useToast } from '../../../hooks/useToast';

interface MetadataSettingsCardProps {
  categories: Category[];
  formats: Format[];
  loading: boolean;
}

export default function MetadataSettingsCard({
  categories,
  formats,
  loading,
}: MetadataSettingsCardProps) {
  const { success, error: toastError, info } = useToast();

  const [newCategory, setNewCategory] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [catAdding, setCatAdding] = useState(false);
  const [fmtAdding, setFmtAdding] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setCatAdding(true);
    try {
      await addCategory(newCategory.trim());
      success(`Category "${newCategory.trim()}" added to catalog.`);
      setNewCategory('');
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to add category.');
    } finally {
      setCatAdding(false);
    }
  };

  const handleDeleteCategory = async (cat: Category) => {
    if (!window.confirm(`Are you sure you want to remove the category "${cat.name}"?`)) return;
    try {
      await deleteCategory(cat.id);
      info(`Category "${cat.name}" removed.`);
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to delete category.');
    }
  };

  const handleAddFormat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormat.trim()) return;
    setFmtAdding(true);
    try {
      await addFormat(newFormat.trim());
      success(`Format "${newFormat.trim()}" added to catalog.`);
      setNewFormat('');
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to add format.');
    } finally {
      setFmtAdding(false);
    }
  };

  const handleDeleteFormat = async (fmt: Format) => {
    if (!window.confirm(`Are you sure you want to remove the format "${fmt.name}"?`)) return;
    try {
      await deleteFormat(fmt.id);
      info(`Format "${fmt.name}" removed.`);
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to delete format.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Categories Management */}
      <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#3e4095]/10 flex items-center justify-center text-[#3e4095]">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-950">Topic Categories</h2>
                <p className="text-[11px] font-semibold text-slate-400">
                  Global topics for articles, resources &amp; videos
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              {categories.length} Topics
            </span>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Sales Systems"
              className="grow bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
            <button
              type="submit"
              disabled={catAdding || !newCategory.trim()}
              className="flex items-center justify-center gap-1 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer border-none shrink-0"
            >
              {catAdding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Add
            </button>
          </form>

          {loading ? (
            <div className="flex items-center justify-center py-6 text-slate-400 text-xs">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading categories…
            </div>
          ) : categories.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6 font-semibold">
              No categories configured yet.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-2 bg-slate-50/80 hover:bg-slate-100 rounded-2xl px-4 py-2.5 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-800 truncate">{c.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(c)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                    title={`Delete ${c.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Formats Management */}
      <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#ffd148]/15 flex items-center justify-center text-[#b49200]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-950">Deliverable Formats</h2>
                <p className="text-[11px] font-semibold text-slate-400">
                  Deliverable types (PDF, Notion, Excel, Docx, etc.)
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              {formats.length} Formats
            </span>
          </div>

          <form onSubmit={handleAddFormat} className="flex gap-2">
            <input
              type="text"
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              placeholder="e.g. Google Sheets Template"
              className="grow bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
            <button
              type="submit"
              disabled={fmtAdding || !newFormat.trim()}
              className="flex items-center justify-center gap-1 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer border-none shrink-0"
            >
              {fmtAdding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              Add
            </button>
          </form>

          {loading ? (
            <div className="flex items-center justify-center py-6 text-slate-400 text-xs">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading formats…
            </div>
          ) : formats.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6 font-semibold">
              No formats configured yet.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {formats.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between gap-2 bg-slate-50/80 hover:bg-slate-100 rounded-2xl px-4 py-2.5 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-800 truncate">{f.name}</span>
                  <button
                    onClick={() => handleDeleteFormat(f)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                    title={`Delete ${f.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
