import { useState } from 'react';
import { User, FileText, Calendar, Copy, Check, Mail, MessageSquare, Inbox, ShieldCheck, Send, Loader2 } from 'lucide-react';
import type { Lead } from '../../../types/lead';
import { useToast } from '../../../hooks/useToast';
import { sendResourceDeliveryEmail } from '../../../lib/email';

import { useResources } from '../../../hooks/useResources';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  selectedLeadIds: string[];
  onToggleSelectLead: (id: string) => void;
  onToggleSelectAll: () => void;
}

export default function LeadsTable({
  leads,
  loading,
  selectedLeadIds,
  onToggleSelectLead,
  onToggleSelectAll,
}: LeadsTableProps) {
  const { resources } = useResources();
  const { success, error: toastError } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string, label = 'Copied') => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success(`${label} to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResendResourceEmail = async (lead: Lead) => {
    if (!lead.email || resendingId) return;
    setResendingId(lead.id);

    try {
      const matchingResource = resources.find(
        (r) => r.id === lead.resourceId || r.title.trim().toLowerCase() === lead.resourceTitle.trim().toLowerCase()
      );
      const downloadUrl = matchingResource?.downloadUrl || undefined;

      const res = await sendResourceDeliveryEmail({
        name: lead.name,
        email: lead.email,
        resourceId: lead.resourceId,
        resourceTitle: lead.resourceTitle,
        downloadUrl,
      });

      if (res.success) {
        success(`Resource delivery email re-sent to ${lead.email} via Resend.`, 'Email Dispatched');
      } else {
        toastError(res.error || 'Failed to dispatch email');
      }
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Error sending email');
    } finally {
      setResendingId(null);
    }
  };


  if (loading) {
    return (
      <div className="bg-white rounded-[28px] p-16 text-center border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-slate-400 text-xs font-semibold">
        Loading live CRM leads...
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-[28px] p-16 text-center border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto text-slate-400">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-black text-slate-900">No leads match your filter</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Try clearing your search query or selecting a different tab filter.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      {/* ─── MOBILE CARD VIEW (< 640px) ─── */}
      <div className="block sm:hidden space-y-3">
        {leads.map((lead, idx) => {
          const isPaid = lead.isPaid;
          const orderRef = `DIG_${String(idx + 1).padStart(6, '0')}`;
          const ngnPrice = isPaid ? Math.round(Number(lead.amountPaid || 0) * 1600) : 0;

          return (
            <div key={lead.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-slate-900">{orderRef}</span>
                {isPaid ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Paid: ${(lead.amountPaid || 0).toFixed(2)} (₦{ngnPrice.toLocaleString('en-US')})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#3e4095] bg-[#3e4095]/10 px-2.5 py-0.5 rounded-full">
                    Free Unlock
                  </span>
                )}
              </div>

              <div>
                <p className="font-black text-slate-950 text-xs">{lead.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono mt-0.5">
                  <span className="truncate">{lead.email}</span>
                  <button
                    onClick={() => handleCopy(lead.email, `m-email-${lead.id}`, 'Email copied')}
                    className="p-1 text-slate-400 hover:text-slate-700 border-none bg-transparent cursor-pointer"
                  >
                    {copiedId === `m-email-${lead.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resource</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{lead.resourceTitle}</p>
                {lead.paymentRef && (
                  <p className="text-[10px] font-mono text-slate-400 mt-1 truncate">Ref: {lead.paymentRef}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-[10px] text-slate-400">
                <span>{new Date(lead.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleResendResourceEmail(lead)}
                    disabled={resendingId === lead.id}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold hover:bg-amber-100 disabled:opacity-50 cursor-pointer"
                    title="Resend Resource Download Email via Resend"
                  >
                    {resendingId === lead.id ? (
                      <Loader2 className="w-3 h-3 animate-spin text-amber-700" />
                    ) : (
                      <Send className="w-3 h-3 text-amber-700" />
                    )}
                    Resend Copy
                  </button>
                  <a
                    href={`mailto:${lead.email}?subject=Regarding your Digitalife resource: ${encodeURIComponent(lead.resourceTitle)}`}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:text-[#3e4095]"
                  >
                    <Mail className="w-3 h-3" /> Email
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi ${lead.name}, thank you for unlocking "${lead.resourceTitle}" on Digitalife. How can our consulting team assist your business further?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold"
                  >
                    <MessageSquare className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── DESKTOP TABLE VIEW (>= 640px) ─── */}
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
              <th className="pb-3 px-3">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> Customer Contact</span>
              </th>
              <th className="pb-3 px-3">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Unlocked Asset</span>
              </th>
              <th className="pb-3 px-3">Amount &amp; Ref</th>
              <th className="pb-3 px-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
              </th>
              <th className="pb-3 px-3 text-right">Direct Outreach</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead, idx) => {
              const isSelected = selectedLeadIds.includes(lead.id);
              const orderRef = `DIG_${String(idx + 1).padStart(6, '0')}`;
              const isPaid = lead.isPaid;
              const ngnPrice = isPaid ? Math.round(Number(lead.amountPaid || 0) * 1600) : 0;

              return (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Checkbox */}
                  <td className="py-4 pr-3 pl-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectLead(lead.id)}
                      className="w-3.5 h-3.5 rounded-sm border-slate-300 text-slate-900 cursor-pointer"
                    />
                  </td>

                  {/* Order Ref */}
                  <td className="py-4 px-3 font-mono text-[11px] font-bold text-slate-900">
                    {orderRef}
                  </td>

                  {/* Customer Contact Details */}
                  <td className="py-4 px-3">
                    <p className="font-black text-slate-950">{lead.name}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono mt-0.5 select-all">
                      <span>{lead.email}</span>
                      <button
                        onClick={() => handleCopy(lead.email, `email-${lead.id}`, 'Email copied')}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border-none bg-transparent"
                        title="Copy email"
                      >
                        {copiedId === `email-${lead.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  {/* Unlocked Asset */}
                  <td className="py-4 px-3">
                    <p className="font-bold text-slate-900 truncate max-w-xs">{lead.resourceTitle}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">ID: {lead.resourceId}</p>
                  </td>

                  {/* Amount & Reference */}
                  <td className="py-4 px-3">
                    {isPaid ? (
                      <div className="space-y-0.5">
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                          Paid: ${(lead.amountPaid || 0).toFixed(2)}
                        </span>
                        <p className="text-[9px] font-semibold text-slate-400">
                          ₦{ngnPrice.toLocaleString('en-US')}
                        </p>
                        {lead.paymentRef && (
                          <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono select-all">
                            <span>Ref: {lead.paymentRef.slice(0, 10)}…</span>
                            <button
                              onClick={() => handleCopy(lead.paymentRef || '', `ref-${lead.id}`, 'Payment reference copied')}
                              className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
                              title="Copy Reference"
                            >
                              {copiedId === `ref-${lead.id}` ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="bg-[#3e4095]/10 text-[#3e4095] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                        Free Unlock
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    <div>
                      {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {new Date(lead.createdAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>

                  {/* Direct Outreach Actions */}
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleResendResourceEmail(lead)}
                        disabled={resendingId === lead.id}
                        className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors disabled:opacity-50 cursor-pointer border-none"
                        title="Resend Resource Download Email via Resend"
                      >
                        {resendingId === lead.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                        ) : (
                          <Send className="w-3.5 h-3.5 text-amber-700" />
                        )}
                      </button>
                      <a
                        href={`mailto:${lead.email}?subject=Regarding your Digitalife resource: ${encodeURIComponent(lead.resourceTitle)}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-[#3e4095]/10 text-slate-600 hover:text-[#3e4095] transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Hi ${lead.name}, thank you for unlocking "${lead.resourceTitle}" on Digitalife. How can our consulting team assist your business further?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
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
    </div>
  );
}
