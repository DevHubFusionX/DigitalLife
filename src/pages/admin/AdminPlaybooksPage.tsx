import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import PlaybookTable from '../../components/admin/PlaybookTable';
import PlaybookForm from '../../components/admin/PlaybookForm';
import { usePlaybooks } from '../../hooks/usePlaybooks';
import type { Playbook } from '../../types/playbook';

export default function AdminPlaybooksPage() {
  const { playbooks, loading } = usePlaybooks();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Playbook | null>(null);
  const [search, setSearch] = useState('');

  const filtered = playbooks.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.linkedResourceLabel.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (playbook: Playbook) => {
    setEditTarget(playbook);
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
          <h1 className="text-xl font-black text-slate-950 tracking-tight">Expert Playbooks</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {playbooks.length} playbook{playbooks.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Playbook
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search playbooks…"
          className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <PlaybookTable playbooks={filtered} onEdit={openEdit} />
      )}

      {/* Form modal */}
      {formOpen && <PlaybookForm editTarget={editTarget} onClose={closeForm} />}
    </div>
  );
}
