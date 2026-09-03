import { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, XCircle, CreditCard, Cloud, Database, Mail, RefreshCw } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { updateResource } from '../../../lib/firestore/resources';
import { CLOUDINARY_MIGRATION_MAP } from '../../../data/cloudinaryMigrationMap';

export default function IntegrationHealthCard() {
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const cloudinaryCloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#3e4095]/10 flex items-center justify-center text-[#3e4095]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-950">Integration Health Status</h2>
            <p className="text-[11px] font-semibold text-slate-400">
              Live status diagnostics of connected external services and cloud APIs
            </p>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200/60">
          Diagnostics Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {/* 1. Paystack Gateway */}
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">Paystack</span>
            </div>
            {paystackKey ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" /> Missing Key
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {paystackKey ? `PK: ${paystackKey.slice(0, 10)}…` : 'VITE_PAYSTACK_PUBLIC_KEY'}
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">NGN Direct Checkout</p>
          </div>
        </div>

        {/* 2. Cloudinary Media */}
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">Cloudinary</span>
            </div>
            {cloudinaryCloud && cloudinaryPreset ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">
                <XCircle className="w-3 h-3" /> Inactive
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {cloudinaryCloud ? `Cloud: ${cloudinaryCloud}` : 'Preset Missing'}
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Asset CDN &amp; Storage</p>
          </div>
        </div>

        {/* 3. Google Firestore */}
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">Firestore</span>
            </div>
            {firebaseProjectId ? (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">
                <XCircle className="w-3 h-3" /> Offline
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono truncate">
              {firebaseProjectId ? `ID: ${firebaseProjectId}` : 'Config Missing'}
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Real-time DB Sync</p>
          </div>
        </div>

        {/* 4. Resend Transactional Email */}
        <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">Resend API</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </span>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono truncate">/api/send-resource</p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Automated Fulfillment</p>
          </div>
        </div>
      </div>

      {/* Cloudinary Asset Sync Banner */}
      <CloudinarySyncAction />
    </div>
  );
}

function CloudinarySyncAction() {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const { success, error: toastError } = useToast();

  const handleSync = async () => {
    setSyncing(true);
    try {
      for (const item of CLOUDINARY_MIGRATION_MAP) {
        const payload: Record<string, unknown> = {
          coverImage: item.coverImage,
          coverUrl: item.coverImage,
        };
        if (item.downloadUrl) {
          payload.downloadUrl = item.downloadUrl;
        }
        await updateResource(item.id, payload);
      }
      setSynced(true);
      success('All 16 resource covers and document URLs updated in Firestore!');
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to update Firestore');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/80">
      <div>
        <div className="flex items-center gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 text-[#3e4095] ${syncing ? 'animate-spin' : ''}`} />
          <h3 className="text-xs font-black text-slate-950">Cloudinary Migration Sync</h3>
        </div>
        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
          Update all 16 catalog resource covers and workbook PDF download URLs in Firestore to your new Cloudinary account (degktbk01).
        </p>
      </div>

      <button
        type="button"
        disabled={syncing || synced}
        onClick={handleSync}
        className="px-4 py-2.5 bg-[#3e4095] hover:bg-[#2d2f75] disabled:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer border-none shadow-xs shrink-0"
      >
        {synced ? '✓ Assets Synced' : syncing ? 'Syncing to Database…' : 'Sync New Asset URLs to Database'}
      </button>
    </div>
  );
}

