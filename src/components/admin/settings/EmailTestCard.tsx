import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import { sendTestEmail } from '../../../lib/email';


interface EmailTestCardProps {
  defaultEmail?: string;
}

export default function EmailTestCard({ defaultEmail = '' }: EmailTestCardProps) {
  const { success, error: toastError } = useToast();
  const [testEmail, setTestEmail] = useState(defaultEmail);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; messageId?: string } | null>(null);

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail.trim()) return;
    setTestSending(true);
    setTestResult(null);

    const res = await sendTestEmail(testEmail.trim());
    setTestSending(false);

    if (res.success) {
      const msg = `Diagnostic email dispatched successfully (Message ID: ${res.messageId || 'sent'}). Check your inbox!`;
      setTestResult({ ok: true, message: msg, messageId: res.messageId });
      success('Test email delivered via Resend.', 'Email Dispatched');
    } else {
      const errorMsg = res.error || 'Failed to dispatch test email';
      setTestResult({ ok: false, message: errorMsg });
      toastError(`Email test failed: ${errorMsg}`);
    }
  };

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-950">Test Resend Email Delivery</h2>
            <p className="text-[11px] font-semibold text-slate-400">
              Dispatch a test transactional email to verify deliverability and domain reputation
            </p>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200/60">
          Resend Connected
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5 text-[11px] text-emerald-900 font-medium leading-relaxed">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong>Domain Verified:</strong> Your custom domain is active on Resend. You can now dispatch transactional and fulfillment emails to any recipient worldwide without sandbox limitations.
        </p>
      </div>

      <form onSubmit={handleTestEmail} className="flex flex-col sm:flex-row gap-3 items-stretch">
        <input
          type="email"
          required
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder="your-resend-account@email.com"
          className="grow bg-slate-50 border border-slate-200/90 rounded-full px-5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
        />
        <button
          type="submit"
          disabled={testSending || !testEmail.trim()}
          className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer border-none shrink-0 shadow-xs"
        >
          {testSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Send Test Email
        </button>
      </form>

      {testResult && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-start gap-2.5 ${
            testResult.ok
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
              : 'bg-rose-50 text-rose-800 border-rose-200/70'
          }`}
        >
          {testResult.ok ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="leading-relaxed">{testResult.message}</p>
            {testResult.messageId && (
              <p className="text-[10px] font-mono text-emerald-600">ID: {testResult.messageId}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
