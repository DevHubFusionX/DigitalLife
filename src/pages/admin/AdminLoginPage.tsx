import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export default function AdminLoginPage() {
  const { signIn } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3e4095]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ffd148]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#ffd148] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-slate-950 font-black text-lg">D</span>
          </div>
          <h1 className="text-white font-black text-xl tracking-tight">Digitalife Admin</h1>
          <p className="text-slate-400 text-xs mt-1 font-semibold">Sign in to manage your resources</p>
        </div>

        {/* Form card */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalife.com"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3e4095] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3e4095] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3e4095] hover:bg-[#2e3075] disabled:opacity-60 text-white font-bold text-xs py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : (
                <><LogIn className="w-4 h-4" /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-500 font-semibold">
            This panel is restricted to administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
