import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Resource } from '../../types/resource';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { deleteResource } from '../../lib/firestore/resources';

interface ResourceTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
}

export default function ResourceTable({ resources, onEdit }: ResourceTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteResource(deletingId);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  if (resources.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-sm font-bold">No resources found.</p>
        <p className="text-xs mt-1">Click "Add Resource" or seed defaults from Settings.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-black/5">
        <table className="w-full text-xs font-semibold">
          <thead className="bg-slate-50 border-b border-black/5">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Cover
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Title
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden lg:table-cell">
                Format
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden sm:table-cell">
                Price
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white">
            {resources.map((resource) => (
              <tr key={resource.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  {resource.coverImage ? (
                    <img
                      src={resource.coverImage}
                      alt={resource.title}
                      className="w-10 h-10 rounded-lg object-cover border border-black/5"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-lg bg-linear-to-br ${resource.coverBg} border border-black/5`}
                    />
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-slate-950 truncate max-w-50">{resource.title}</p>
                  <p className="text-slate-400 text-[10px] truncate max-w-50">
                    {resource.description}
                  </p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="bg-[#3e4095]/10 text-[#3e4095] text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                    {resource.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                    {resource.format}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {resource.isFree ? (
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                      ${resource.price?.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(resource)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#3e4095]/10 flex items-center justify-center transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setDeletingId(resource.id)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 flex items-center justify-center transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-rose-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Resource"
          message="This will permanently remove this resource from Firestore. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
