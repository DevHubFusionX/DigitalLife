import { useState } from 'react';
import { useLeads } from '../../hooks/useLeads';
import { useToast } from '../../hooks/useToast';

import LeadsStatsBar from '../../components/admin/leads/LeadsStatsBar';
import LeadsFilterBar from '../../components/admin/leads/LeadsFilterBar';
import LeadsTable from '../../components/admin/leads/LeadsTable';

export default function AdminLeadsPage() {
  const { leads, loading, error } = useLeads();
  const { success } = useToast();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'paid' | 'free'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Metrics summary
  const paidLeads = leads.filter((l) => l.isPaid);
  const freeLeads = leads.filter((l) => !l.isPaid);

  // Filtering logic
  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.resourceTitle.toLowerCase().includes(search.toLowerCase()) ||
      (lead.paymentRef && lead.paymentRef.toLowerCase().includes(search.toLowerCase()));

    const matchesType =
      filterType === 'all' ? true : filterType === 'paid' ? lead.isPaid : !lead.isPaid;

    return matchesSearch && matchesType;
  });

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === sorted.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(sorted.map((l) => l.id));
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Order Ref',
      'Name',
      'Email',
      'Resource ID',
      'Resource Title',
      'Type',
      'Amount (NGN)',
      'Reference',
      'Date Captured',
    ];

    const rows = sorted.map((lead, idx) => [
      `DIG_${String(idx + 1).padStart(6, '0')}`,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.resourceId.replace(/"/g, '""')}"`,
      `"${lead.resourceTitle.replace(/"/g, '""')}"`,
      lead.isPaid ? 'PAID' : 'FREE',
      lead.isPaid ? `₦${Number(lead.amountPaid || 0).toLocaleString('en-US')}` : '₦0',
      lead.paymentRef ? `"${lead.paymentRef.replace(/"/g, '""')}"` : 'N/A',
      new Date(lead.createdAt).toLocaleString('en-GB'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `digitalife-leads-${filterType}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    success(`Exported ${sorted.length} leads as CSV.`);
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 font-sans select-none">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Lead CRM &amp; Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
          Track customer resource downloads, manage Paystack transactions, and initiate 1-click outreach.
        </p>
      </div>

      {/* 2. Error notification if any */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-bold text-rose-600">
          Error connecting to Firestore: {error.message}
        </div>
      )}

      {/* 3. Summary KPI Stats Bar */}
      <LeadsStatsBar leads={leads} />

      {/* 4. Filter, Sort, & Export Bar */}
      <LeadsFilterBar
        search={search}
        onSearchChange={setSearch}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        sortOrder={sortOrder}
        onToggleSort={toggleSort}
        totalCount={leads.length}
        paidCount={paidLeads.length}
        freeCount={freeLeads.length}
        filteredCount={sorted.length}
        onExportCSV={handleExportCSV}
      />

      {/* 5. Leads Table & Mobile Cards */}
      <LeadsTable
        leads={sorted}
        loading={loading}
        selectedLeadIds={selectedLeadIds}
        onToggleSelectLead={toggleSelectLead}
        onToggleSelectAll={toggleSelectAll}
      />
    </div>
  );
}
