import React, { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContext, type Toast } from './ToastContext';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 4000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'success' });
  }, [addToast]);

  const error = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'error' });
  }, [addToast]);

  const info = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'info' });
  }, [addToast]);

  const warning = useCallback((message: string, title?: string) => {
    addToast({ message, title, type: 'warning' });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto rounded-2xl p-4 shadow-xl border backdrop-blur-md flex items-start gap-3 text-xs font-semibold ${
                t.type === 'success'
                  ? 'bg-slate-950/95 text-white border-emerald-500/30'
                  : t.type === 'error'
                  ? 'bg-slate-950/95 text-white border-rose-500/30'
                  : t.type === 'warning'
                  ? 'bg-slate-950/95 text-white border-amber-500/30'
                  : 'bg-slate-950/95 text-white border-[#3e4095]/40'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {t.type === 'info' && <Info className="w-4 h-4 text-[#ffd148]" />}
              </div>
              <div className="grow min-w-0">
                {t.title && <p className="font-bold text-slate-100 mb-0.5">{t.title}</p>}
                <p className="text-slate-300 leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white transition-colors shrink-0 -mr-1 -mt-1 p-1 cursor-pointer bg-transparent border-none"
                aria-label="Close toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
