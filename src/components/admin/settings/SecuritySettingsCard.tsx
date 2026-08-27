import { useState } from 'react';
import { KeyRound, Shield, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useToast } from '../../../hooks/useToast';
import type { User } from 'firebase/auth';

interface SecuritySettingsCardProps {
  user: User | null;
}

export default function SecuritySettingsCard({ user }: SecuritySettingsCardProps) {
  const { success, error: toastError } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !auth.currentUser) return;

    if (newPassword.length < 6) {
      const err = 'New password must be at least 6 characters long.';
      setPwError(err);
      toastError(err);
      return;
    }

    if (newPassword !== confirmPassword) {
      const err = 'New password and confirmation do not match.';
      setPwError(err);
      toastError(err);
      return;
    }

    setPwLoading(true);
    setPwError(null);

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      success('Admin password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update password.';
      setPwError(msg);
      toastError(msg);
    } finally {
      setPwLoading(false);
    }
  };

  const inputCls =
    'w-full bg-slate-50 border border-slate-200/90 rounded-full px-5 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5 ml-2';

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#3e4095]/10 flex items-center justify-center text-[#3e4095]">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-950">Administrative Security &amp; Access</h2>
            <p className="text-[11px] font-semibold text-slate-400">
              Update master credentials for the protected administration portal
            </p>
          </div>
        </div>

        {user?.email && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">{user.email}</span>
          </div>
        )}
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
        {/* Current Password */}
        <div>
          <label className={labelCls}>Current Password *</label>
          <div className="relative">
            <input
              type={showCurrentPw ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`${inputCls} pr-10`}
              placeholder="Enter current master password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPw(!showCurrentPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 border-none bg-transparent cursor-pointer p-0.5"
            >
              {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>New Password *</label>
            <div className="relative">
              <input
                type={showNewPw ? 'text' : 'password'}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${inputCls} pr-10`}
                placeholder="Min. 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 border-none bg-transparent cursor-pointer p-0.5"
              >
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className={labelCls}>Confirm New Password *</label>
            <input
              type={showNewPw ? 'text' : 'password'}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputCls}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {pwError && (
          <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-2xl border border-rose-100">
            {pwError}
          </p>
        )}

        <button
          type="submit"
          disabled={pwLoading || !currentPassword || !newPassword || !confirmPassword}
          className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer border-none shadow-xs"
        >
          {pwLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          Update Password
        </button>
      </form>
    </div>
  );
}
