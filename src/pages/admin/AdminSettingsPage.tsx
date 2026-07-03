import { useState } from 'react';
import { Download, RefreshCw, KeyRound, AlertTriangle, Loader2, Check, Plus, Trash2, Tag, Layers } from 'lucide-react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useResources } from '../../hooks/useResources';
import { useVideos } from '../../hooks/useVideos';
import { seedDefaultResources, wipeAllResources } from '../../lib/firestore/resources';
import { seedDefaultPosts } from '../../lib/firestore/blog';
import { addCategory, deleteCategory, addFormat, deleteFormat } from '../../lib/firestore/metadata';
import { useMetadata } from '../../hooks/useMetadata';
import { auth } from '../../lib/firebase';

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const { resources } = useResources();
  const { videos } = useVideos();
  const { categories, formats, loading: metaLoading } = useMetadata();

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  // Seed resources
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  // Seed blog
  const [blogSeedLoading, setBlogSeedLoading] = useState(false);
  const [blogSeedSuccess, setBlogSeedSuccess] = useState(false);

  // Metadata management
  const [newCategory, setNewCategory] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [catAdding, setCatAdding] = useState(false);
  const [fmtAdding, setFmtAdding] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    setPwLoading(true);
    setPwError(null);
    setPwSuccess(false);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, newPassword);
      setPwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPwError(err instanceof Error ? err.message : 'Failed to update password.');
    } finally {
      setPwLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedSuccess(false);
    try {
      await wipeAllResources();
      await seedDefaultResources();
      setSeedSuccess(true);
    } finally {
      setSeedLoading(false);
    }
  };

  const handleSeedBlog = async () => {
    setBlogSeedLoading(true);
    setBlogSeedSuccess(false);
    try {
      await seedDefaultPosts();
      setBlogSeedSuccess(true);
    } finally {
      setBlogSeedLoading(false);
    }
  };

  const handleExportJSON = () => {
    const data = { resources, videos, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digitalife-resources-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputCls =
    'w-full bg-slate-50 border border-black/10 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors';
  const labelCls = 'text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5';

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-xl font-black text-slate-950 tracking-tight">Settings</h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          Manage your admin account and data.
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="w-4 h-4 text-[#3e4095]" />
          <h2 className="text-sm font-black text-slate-950">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className={labelCls}>Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className={labelCls}>New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputCls}
              placeholder="Minimum 6 characters"
            />
          </div>

          {pwError && <p className="text-xs font-bold text-rose-500">{pwError}</p>}
          {pwSuccess && (
            <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <Check className="w-3 h-3" /> Password updated successfully.
            </p>
          )}

          <button
            type="submit"
            disabled={pwLoading}
            className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
          >
            {pwLoading && <Loader2 className="w-3 h-3 animate-spin" />}
            Update Password
          </button>
        </form>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-5">
        <h2 className="text-sm font-black text-slate-950">Data Management</h2>

        {/* Export */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900">Export All Data (JSON)</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Downloads all resources and videos as a backup JSON file.
            </p>
          </div>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>

        <div className="border-t border-black/5" />

        {/* Seed Firestore */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900">Reset & Seed Resources</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Wipes all existing resources and seeds the fresh set of 6 default resources (with mixed free/paid pricing structures).
            </p>
            {seedSuccess && (
              <p className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 mt-1">
                <Check className="w-3 h-3" /> Default resources seeded.
              </p>
            )}
          </div>
          <button
            onClick={handleSeed}
            disabled={seedLoading}
            className="flex items-center gap-1.5 bg-[#3e4095]/10 hover:bg-[#3e4095]/20 text-[#3e4095] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 disabled:opacity-60"
          >
            {seedLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            Seed
          </button>
        </div>

        <div className="border-t border-black/5" />

        {/* Seed Blog Posts */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900">Reset &amp; Seed Blog Posts</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Wipes all existing blog posts and restores the 9 original hardcoded articles.
            </p>
            {blogSeedSuccess && (
              <p className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 mt-1">
                <Check className="w-3 h-3" /> Default blog posts seeded.
              </p>
            )}
          </div>
          <button
            onClick={handleSeedBlog}
            disabled={blogSeedLoading}
            className="flex items-center gap-1.5 bg-[#3e4095]/10 hover:bg-[#3e4095]/20 text-[#3e4095] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 disabled:opacity-60"
          >
            {blogSeedLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            Seed Blog
          </button>
        </div>
      </div>
      {/* ─── Categories & Formats Management ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Categories */}
        <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="w-4 h-4 text-[#3e4095]" />
            <h2 className="text-sm font-black text-slate-950">Categories</h2>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newCategory.trim()) return;
              setCatAdding(true);
              try { await addCategory(newCategory); setNewCategory(''); } finally { setCatAdding(false); }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              className={`${inputCls} flex-1`}
            />
            <button
              type="submit"
              disabled={catAdding || !newCategory.trim()}
              className="flex items-center gap-1 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              {catAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
            </button>
          </form>

          {metaLoading ? (
            <div className="flex items-center gap-2 py-4 justify-center text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : categories.length === 0 ? (
            <p className="text-[10px] text-slate-400 font-semibold text-center py-3">No categories yet. Seed defaults or add above.</p>
          ) : (
            <ul className="space-y-1.5 max-h-52 overflow-y-auto">
              {categories.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-xs font-bold text-slate-700 truncate">{c.name}</span>
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="w-6 h-6 rounded-md hover:bg-rose-100 flex items-center justify-center transition-colors shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3 text-rose-500" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Formats */}
        <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#3e4095]" />
            <h2 className="text-sm font-black text-slate-950">Formats</h2>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newFormat.trim()) return;
              setFmtAdding(true);
              try { await addFormat(newFormat); setNewFormat(''); } finally { setFmtAdding(false); }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              placeholder="New format"
              className={`${inputCls} flex-1`}
            />
            <button
              type="submit"
              disabled={fmtAdding || !newFormat.trim()}
              className="flex items-center gap-1 bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors shrink-0"
            >
              {fmtAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
            </button>
          </form>

          {metaLoading ? (
            <div className="flex items-center gap-2 py-4 justify-center text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : formats.length === 0 ? (
            <p className="text-[10px] text-slate-400 font-semibold text-center py-3">No formats yet. Seed defaults or add above.</p>
          ) : (
            <ul className="space-y-1.5 max-h-52 overflow-y-auto">
              {formats.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-xs font-bold text-slate-700 truncate">{f.name}</span>
                  <button
                    onClick={() => deleteFormat(f.id)}
                    className="w-6 h-6 rounded-md hover:bg-rose-100 flex items-center justify-center transition-colors shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3 text-rose-500" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <h2 className="text-sm font-black text-rose-700">Danger Zone</h2>
        </div>
        <p className="text-[10px] text-rose-500 font-semibold leading-relaxed">
          To permanently delete all resources or videos, use the Firebase Firestore console directly.
          This cannot be undone from the admin panel to prevent accidental data loss.
        </p>
      </div>
    </div>
  );
}
