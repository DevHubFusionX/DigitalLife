import { useState } from 'react';
import { useResources } from '../../hooks/useResources';
import { useBlog } from '../../hooks/useBlog';
import { useVideos } from '../../hooks/useVideos';
import { usePlaybooks } from '../../hooks/usePlaybooks';
import { useLeads } from '../../hooks/useLeads';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useToast } from '../../hooks/useToast';

import DashboardHeader from '../../components/admin/dashboard/DashboardHeader';
import TotalBalanceCard from '../../components/admin/dashboard/TotalBalanceCard';
import MilestoneProgressCard from '../../components/admin/dashboard/MilestoneProgressCard';
import GatewayStatusCards from '../../components/admin/dashboard/GatewayStatusCards';
import KpiStatsGrid from '../../components/admin/dashboard/KpiStatsGrid';
import EngagementChartCard from '../../components/admin/dashboard/EngagementChartCard';
import RecentActivitiesTable from '../../components/admin/dashboard/RecentActivitiesTable';

export default function AdminDashboardPage() {
  const { resources } = useResources();
  const { posts } = useBlog();
  const { videos } = useVideos();
  const { playbooks } = usePlaybooks();
  const { leads, loading: leadsLoading } = useLeads();
  const { user } = useAdminAuth();
  const { success } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'paid' | 'free'>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const adminFirstName = user?.email ? user.email.split('@')[0].split('.')[0] : 'Admin';

  // ─── ACTUAL REAL DATA COMPUTATIONS ───
  const paidLeads = leads.filter((l) => l.isPaid);
  const freeLeads = leads.filter((l) => !l.isPaid);

  // Exact real money totals in Naira
  const totalRevenueNGN = paidLeads.reduce((acc, l) => acc + (Number(l.amountPaid) || 0), 0);

  // Real resources catalog breakdown
  const paidResourcesCount = resources.filter((r) => Number(r.price) > 0).length;
  const freeResourcesCount = resources.filter((r) => !r.price || Number(r.price) === 0).length;

  // Monthly milestone target
  const monthlyMilestoneTarget = 100;

  // Filtering activities based on search and status
  const filteredActivities = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.resourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.paymentRef && lead.paymentRef.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatusFilter === 'all'
          ? true
          : selectedStatusFilter === 'paid'
          ? lead.isPaid
          : !lead.isPaid;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    success(`Copied "${email}" to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === filteredActivities.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredActivities.map((l) => l.id));
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      success('No leads to export yet.');
      return;
    }
    const headers = ['Order ID', 'Name', 'Email', 'Resource Title', 'Type', 'Amount (NGN)', 'Ref', 'Date'];
    const rows = leads.map((lead, idx) => [
      `DIG_${String(idx + 1).padStart(6, '0')}`,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.resourceTitle.replace(/"/g, '""')}"`,
      lead.isPaid ? 'PAID' : 'FREE',
      lead.isPaid ? `₦${Number(lead.amountPaid || 0).toLocaleString('en-US')}` : '₦0',
      lead.paymentRef || 'N/A',
      new Date(lead.createdAt).toLocaleString('en-GB'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digitalife-actual-leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    success(`Exported ${leads.length} customer leads as CSV.`);
  };

  // Dynamic monthly activity aggregation
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const chartData = monthLabels.map((m, idx) => {
    const matchingLeads = leads.filter((l) => {
      const d = new Date(l.createdAt);
      return d.getMonth() === idx;
    });
    const paidCount = matchingLeads.filter((l) => l.isPaid).length;
    const freeCount = matchingLeads.filter((l) => !l.isPaid).length;

    const paidHeight = leads.length > 0 ? `${Math.max(12, Math.min(90, paidCount * 25))}%` : '15%';
    const freeHeight = leads.length > 0 ? `${Math.max(12, Math.min(80, freeCount * 15))}%` : '20%';

    return {
      label: m,
      paidHeight,
      freeHeight,
      paidCount,
      freeCount,
    };
  });

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 font-sans select-none">
      {/* 1. Greeting & Page Header */}
      <DashboardHeader adminName={adminFirstName} />

      {/* 2. Main 2-Column Responsive Workspace */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column (~380px on desktop, full width on mobile) */}
        <div className="w-full xl:w-[380px] shrink-0 space-y-6">
          <TotalBalanceCard
            totalRevenueNGN={totalRevenueNGN}
            paidOrdersCount={paidLeads.length}
            totalLeadsCount={leads.length}
            onExportCSV={handleExportCSV}
          />

          <MilestoneProgressCard
            currentCount={leads.length}
            targetCount={monthlyMilestoneTarget}
          />

          <GatewayStatusCards
            paidOrdersCount={paidLeads.length}
            totalDeliveriesCount={leads.length}
          />
        </div>

        {/* Right Workspace: KPIs, Chart, and Recent Activities Table */}
        <div className="flex-1 space-y-6 min-w-0 w-full">
          {/* Top Row: 2x2 Grid + Dual-Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <KpiStatsGrid
                totalRevenueNGN={totalRevenueNGN}
                paidLeadsCount={paidLeads.length}
                totalLeadsCount={leads.length}
                freeLeadsCount={freeLeads.length}
                totalResourcesCount={resources.length}
                paidResourcesCount={paidResourcesCount}
                freeResourcesCount={freeResourcesCount}
                totalArticlesCount={posts.length}
                totalPlaybooksCount={playbooks.length + videos.length}
              />
            </div>

            <div className="lg:col-span-6">
              <EngagementChartCard
                chartData={chartData}
                paidLeadsCount={paidLeads.length}
                freeLeadsCount={freeLeads.length}
                totalLeadsCount={leads.length}
              />
            </div>
          </div>

          {/* Bottom Row: Recent Activities (Responsive Table + Mobile Cards) */}
          <RecentActivitiesTable
            leads={filteredActivities}
            loading={leadsLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatusFilter={selectedStatusFilter}
            onStatusFilterChange={setSelectedStatusFilter}
            selectedLeadIds={selectedLeadIds}
            onToggleSelectLead={toggleSelectLead}
            onToggleSelectAll={toggleSelectAll}
            copiedId={copiedId}
            onCopyEmail={handleCopyEmail}
          />
        </div>
      </div>
    </div>
  );
}
