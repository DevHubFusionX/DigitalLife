import { useState } from 'react';
import { Search, Download, Mail, Calendar, User, FileText, ArrowUpDown, CreditCard } from 'lucide-react';
import { useLeads } from '../../hooks/useLeads';

export default function AdminLeadsPage() {
  const { leads, loading, error } = useLeads();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Search logic
  const filtered = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.resourceTitle.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting logic (by creation date)
  const sorted = [...filtered].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    // CSV Headers
    const headers = ['ID', 'Name', 'Email', 'Resource ID', 'Resource Title', 'Payment Status', 'Amount Paid ($)', 'Payment Reference', 'Captured Date'];
    
    // Convert lead objects to CSV rows
    const rows = leads.map((lead) => [
      lead.id,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.resourceId.replace(/"/g, '""')}"`,
      `"${lead.resourceTitle.replace(/"/g, '""')}"`,
      lead.isPaid ? 'PAID' : 'FREE',
      lead.isPaid ? `$${lead.amountPaid?.toFixed(2)}` : '$0.00',
      lead.paymentRef ? `"${lead.paymentRef.replace(/"/g, '""')}"` : 'N/A',
      new Date(lead.createdAt).toLocaleString('en-GB'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `digitalife-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight">Captured Leads</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {leads.length} email{leads.length !== 1 ? 's' : ''} captured from resource downloads
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={leads.length === 0}
          className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors self-start sm:self-auto cursor-pointer border-none shadow-sm"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex gap-4 items-center">
        <div className="relative max-w-sm grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, or resource..."
            className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
          />
        </div>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1.5 px-4 py-3 bg-white border border-black/10 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          title="Toggle sort order"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Sort: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-bold text-rose-600">
          Error loading leads: {error.message}
        </div>
      )}

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 bg-white border border-black/5 rounded-2xl">
          <Mail className="w-10 h-10 mx-auto mb-3 text-slate-300 opacity-60" />
          <p className="text-sm font-bold text-slate-500">No leads found</p>
          <p className="text-xs text-slate-400 mt-1">
            {search ? 'Try adjusting your search filters.' : 'Leads will appear here as users download free resources.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-xs">
          <table className="w-full text-xs font-semibold text-slate-700">
            <thead className="bg-slate-50 border-b border-black/5 text-left">
              <tr>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> Contact Name</span>
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email Address</span>
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Resource Downloaded</span>
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Access / Payment Type</span>
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Captured At</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {sorted.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{lead.name}</td>
                  <td className="px-5 py-4 text-slate-600 font-mono select-all">{lead.email}</td>
                  <td className="px-5 py-4 text-slate-800">
                    <span className="font-bold">{lead.resourceTitle}</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">ID: {lead.resourceId}</span>
                  </td>
                  <td className="px-5 py-4">
                    {lead.isPaid ? (
                      <span className="inline-flex flex-col gap-1">
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full w-fit">
                          Paid: ${lead.amountPaid?.toFixed(2)}
                        </span>
                        {lead.paymentRef && (
                          <span className="text-[9px] text-slate-400 font-mono block select-all">
                            Ref: {lead.paymentRef}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full w-fit">
                        Free Access
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {new Date(lead.createdAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
