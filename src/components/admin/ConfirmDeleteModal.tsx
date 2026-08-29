import { useEffect } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmDeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, isLoading]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => !isLoading && onCancel()}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 z-10">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer border-none bg-transparent"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <h3 className="text-base font-black text-slate-950">{title}</h3>
        </div>

        <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer border-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-xs"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isLoading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
