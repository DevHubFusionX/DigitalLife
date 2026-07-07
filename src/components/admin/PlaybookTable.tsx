import { useState } from 'react';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import type { Playbook } from '../../types/playbook';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { deletePlaybook } from '../../lib/firestore/playbooks';

interface PlaybookTableProps {
  playbooks: Playbook[];
  onEdit: (playbook: Playbook) => void;
}

export default function PlaybookTable({ playbooks, onEdit }: PlaybookTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deletePlaybook(deletingId);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  if (playbooks.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-sm font-bold">No expert playbooks found.</p>
        <p className="text-xs mt-1">Click "Add Playbook" to create one, or seed defaults from Settings.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-black/5">
        <table className="w-full text-xs font-semibold">
          <thead className="bg-slate-50 border-b border-black/5">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 w-10">
                #
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Expert
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden md:table-cell">
                Role
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden lg:table-cell">
                Linked Resource
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white">
            {playbooks.map((playbook) => (
              <tr key={playbook.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-400">
                  <div className="flex items-center gap-1">
                    <GripVertical className="w-3 h-3 text-slate-300" />
                    <span>{playbook.order}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {playbook.avatarUrl ? (
                      <img
                        src={playbook.avatarUrl}
                        alt={playbook.name}
                        className="w-9 h-9 rounded-full object-cover border border-black/5"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-900/5 text-[10px]">
                        {playbook.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-950">{playbook.name}</p>
                      <p className="text-slate-400 text-[10px]">{playbook.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="bg-[#3e4095]/10 text-[#3e4095] text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                    {playbook.role}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {playbook.linkedResourceLabel ? (
                    <span className="bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                      {playbook.linkedResourceLabel}
                    </span>
                  ) : (
                    <span className="text-slate-300 text-[10px] italic">No link</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(playbook)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#3e4095]/10 flex items-center justify-center transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setDeletingId(playbook.id)}
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
          title="Delete Expert Playbook"
          message="This will permanently remove this expert playbook from Firestore. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
