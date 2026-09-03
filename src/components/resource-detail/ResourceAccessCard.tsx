import { Check, Download, CreditCard, User, Mail, Phone, Loader2, ArrowRight, CheckCircle2, FileText, MessageCircle } from 'lucide-react';
import type { Resource } from '../../types/resource';
import { openWhatsApp } from '../../lib/whatsapp';

interface ResourceAccessCardProps {
  resource: Resource;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  isLoading: boolean;
  formSubmitted: boolean;
  onUnlock: (e: React.FormEvent) => void;
  onPaidUnlock: (e: React.FormEvent) => void;
  onDownload: () => void;
}

export default function ResourceAccessCard({
  resource,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  isLoading,
  formSubmitted,
  onUnlock,
  onPaidUnlock,
  onDownload,
}: ResourceAccessCardProps) {
  return (
    <div className="lg:col-span-5" id="access-section">
      <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl space-y-6">
        {/* Metadata stats list */}
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-400">Topic Group</span>
            <span className="font-bold">{resource.category}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-400">File Format</span>
            <span className="font-bold">{resource.format}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-400">Access Cost</span>
            <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
              {resource.isFree ? 'Free' : `₦${Number(resource.price || 0).toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-400">Page / File Length</span>
            <span className="font-bold">{resource.fileSize || resource.format}</span>
          </div>
        </div>

        {/* Feature Checkmarks */}
        <div className="space-y-3 text-[11px] font-semibold text-slate-300">
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
            <span>Instant secure access link sent immediately after unlocking.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[#ffd148] shrink-0 mt-0.5" />
            <span>No tech setup required. Compatible with Notion/Google Suite/Word/Excel.</span>
          </div>
        </div>

        {/* Action Form or Success Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
          {!formSubmitted ? (
            <form onSubmit={resource.isFree ? onUnlock : onPaidUnlock} className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-white focus:outline-none focus:border-[#ffd148] transition-colors"
                  />
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-white focus:outline-none focus:border-[#ffd148] transition-colors"
                  />
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-semibold text-white focus:outline-none focus:border-[#ffd148] transition-colors"
                  />
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-black py-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border-none shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : resource.isFree ? (
                  <>
                    Download Resource <Download className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Pay &amp; Download (₦{Number(resource.price || 0).toLocaleString()}){' '}
                    <CreditCard className="w-4 h-4" />
                  </>
                )}
              </button>

              {!resource.isFree && (
                <div className="pt-2 text-center">
                  <span className="text-[9px] text-slate-400 font-semibold block">
                    Card, Bank &amp; Transfer payments secured by Paystack.
                  </span>
                  <div className="relative flex items-center justify-center my-3">
                    <div className="absolute inset-x-0 h-px bg-white/10" />
                    <span className="relative px-3 bg-[#0f172a] text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      or
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        `Hi Digitalife Ehub, I would like to purchase the premium resource "${resource.title}" (${resource.format}) offline.`
                      )
                    }
                    className="w-full bg-white/10 hover:bg-white/15 text-white font-extrabold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                  >
                    Purchase via WhatsApp <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-black text-white">
                  {resource.isFree ? 'Resource Unlocked Successfully!' : 'Payment Completed Successfully!'}
                </p>
                <p className="text-xs text-slate-300 font-semibold mt-1">
                  A download copy has been dispatched to <strong>{email}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={onDownload}
                className="w-full bg-[#ffd148] hover:bg-[#ffe066] text-slate-950 font-black py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border-none shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download / Access File Now
              </button>

              <button
                type="button"
                onClick={onDownload}
                className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> Re-trigger Automatic Download
              </button>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(`Hi Digitalife Ehub, I just unlocked "${resource.title}" and have a quick question.`)
                }
                className="w-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> Contact Support on WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
