import { Search, SlidersHorizontal, Inbox, FileText, Check, Copy, Mail, MessageSquare } from 'lucide-react';
import type { Lead } from '../../../types/lead';

interface RecentActivitiesTableProps {
  leads: Lead[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedStatusFilter: 'all' | 'paid' | 'free';
  onStatusFilterChange: (val: 'all' | 'paid' | 'free') => void;
  selectedLeadIds: string[];
  onToggleSelectLead: (id: string) => void;
  onToggleSelectAll: () => void;
  copiedId: string | null;
  onCopyEmail: (email: string, id: string) => void;
}

export default function RecentActivitiesTable({
  leads,
  loading,
  searchQuery,
  onSearchChange,
  selectedStatusFilter,
  onStatusFilterChange,
  selectedLeadIds,
  onToggleSelectLead,
  onToggleSelectAll,
  copiedId,
  onCopyEmail,
}: RecentActivitiesTableProps) {
  const paidCount = leads.filter((l) => l.isPaid).length;
  const freeCount = leads.filter((l) => !l.isPaid).length;

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-950">Recent Resource Unlocks &amp; Orders</h3>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
            Actual live stream of user downloads with 1-click WhatsApp &amp; Email outreach buttons.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Search Box */}
          <div className="relative grow sm:grow-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search leads..."
              className="bg-slate-50 border border-slate-200/90 rounded-full pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400 w-full sm:w-56 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedStatusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'paid' | 'free')}
              className="bg-slate-50 border border-slate-200/90 rounded-full pl-3 pr-8 py-2 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Unlocks ({leads.length})</option>
              <option value="paid">Paid Orders ({paidCount})</option>
              <option value="free">Free Downloads ({freeCount})</option>
            </select>
            <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table & Cards Content */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs font-semibold">
          Loading live Firestore leads...
        </div>
      ) : leads.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-700">No leads recorded yet</p>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            When visitors unlock free SOPs or purchase premium books with Paystack on the frontend, their transactions and contact information will appear here in real-time.
          </p>
        </div>
      ) : (
        <>
          {/* ─── MOBILE CARD VIEW (Phones < 640px) ─── */}
          <div className="block sm:hidden space-y-3">
            {leads.slice(0, 10).map((activity, idx) => {
              const orderId = `DIG_${String(idx + 1).padStart(6, '0')}`;
              const isPaid = activity.isPaid;

              return (
                <div key={activity.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-900">{orderId}</span>
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid (${(activity.amountPaid || 0).toFixed(2)})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3e4095] bg-[#3e4095]/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3e4095]" /> Free Unlock
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900 text-xs">{activity.resourceTitle}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{activity.name} • {activity.email}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-[10px] text-slate-400">
                    <span>
                      {new Date(activity.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onCopyEmail(activity.email, `m-email-${activity.id}`)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                        title="Copy Email"
                      >
                        {copiedId === `m-email-${activity.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <a
                        href={`mailto:${activity.email}?subject=Regarding your Digitalife resource: ${encodeURIComponent(activity.resourceTitle)}`}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#3e4095]"
                        title="Send Email"
                      >
                        <Mail className="w-3 h-3" />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Hi ${activity.name}, thank you for unlocking "${activity.resourceTitle}" on Digitalife. How can our consulting team assist your business further?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600"
                        title="WhatsApp Outreach"
                      >
                        <MessageSquare className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── DESKTOP TABLE VIEW (Screens >= 640px) ─── */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs font-semibold text-slate-700">
              <thead>
                <tr className="text-left text-[10px] font-black text-slate-400 border-b border-slate-100 uppercase tracking-wider">
                  <th className="pb-3 pr-3 pl-1 w-6">
                    <input
                      type="checkbox"
                      checked={selectedLeadIds.length > 0 && selectedLeadIds.length === leads.length}
                      onChange={onToggleSelectAll}
                      className="w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-900 cursor-pointer"
                    />
                  </th>
                  <th className="pb-3 px-3">Order Ref</th>
                  <th className="pb-3 px-3">Unlocked Resource &amp; Client</th>
                  <th className="pb-3 px-3">Amount</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Date &amp; Time</th>
                  <th className="pb-3 px-3 text-right">Outreach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 10).map((activity, idx) => {
                  const isSelected = selectedLeadIds.includes(activity.id);
                  const orderId = `DIG_${String(idx + 1).padStart(6, '0')}`;
                  const isPaid = activity.isPaid;

                  return (
                    <tr key={activity.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Checkbox */}
                      <td className="py-4 pr-3 pl-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelectLead(activity.id)}
                          className="w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-900 cursor-pointer"
                        />
                      </td>

                      {/* Order ID */}
                      <td className="py-4 px-3 font-mono text-[11px] font-bold text-slate-900">
                        {orderId}
                      </td>

                      {/* Activity with Colored Brand Icon */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#ffd148]/15 text-[#b49200] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate max-w-xs">{activity.resourceTitle}</p>
                            <p className="text-[10px] text-slate-400 truncate">{activity.name} ({activity.email})</p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-3 font-black text-slate-900">
                        {isPaid ? `$${(activity.amountPaid || 0).toFixed(2)}` : 'Free'}
                      </td>

                      {/* Status with colored dot */}
                      <td className="py-4 px-3">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid &amp; Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3e4095] bg-[#3e4095]/10 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3e4095]" /> Free Unlock
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(activity.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        {new Date(activity.createdAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Outreach Action Menu */}
                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onCopyEmail(activity.email, `email-${activity.id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                            title="Copy Email"
                          >
                            {copiedId === `email-${activity.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <a
                            href={`mailto:${activity.email}?subject=Regarding your Digitalife resource: ${encodeURIComponent(activity.resourceTitle)}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#3e4095] hover:bg-slate-100 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Hi ${activity.name}, thank you for unlocking "${activity.resourceTitle}" on Digitalife. How can our consulting team assist your business further?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="WhatsApp Outreach"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
