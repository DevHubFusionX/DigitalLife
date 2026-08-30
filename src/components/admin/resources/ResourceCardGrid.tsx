import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Copy, Check, Sparkles, Paperclip } from 'lucide-react';
import type { Resource } from '../../../types/resource';
import { useToast } from '../../../hooks/useToast';

interface ResourceCardGridProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

export default function ResourceCardGrid({ resources, onEdit, onDelete }: ResourceCardGridProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, title: string) => {
    const url = `${window.location.origin}/resources/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success(`Copied live link for "${title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {resources.map((resource) => {
        const isPaid = !resource.isFree && Number(resource.price) > 0;
        const priceInNGN = isPaid ? Number(resource.price) : 0;

        return (
          <div
            key={resource.id}
            className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all"
          >
            {/* Top Thumbnail Frame */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              {resource.coverImage ? (
                <img
                  src={resource.coverImage}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${resource.coverBg || 'from-[#0f172a] to-[#1e293b]'} p-5 flex flex-col justify-between text-white relative`}
                >
                  <span className="text-[10px] font-black tracking-widest text-[#ffd148] uppercase">
                    DIGITALIFE
                  </span>
                  <p className="text-sm font-black tracking-tight leading-snug line-clamp-3">
                    {resource.coverTitle || resource.title}
                  </p>
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-sm pointer-events-none" />
                </div>
              )}

              {/* Price Pill Top Left */}
              <div className="absolute top-3 left-3 z-10">
                {isPaid ? (
                  <span className="bg-gradient-to-r from-[#ffd148] to-[#e6bd3e] text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                    ₦{priceInNGN.toLocaleString('en-US')}
                  </span>
                ) : (
                  <span className="bg-[#3e4095] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                    Free Unlock
                  </span>
                )}
              </div>

              {/* Format Badge Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {resource.format || 'Document'}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {resource.category}
                  </span>
                  {resource.downloadUrl && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Paperclip className="w-2.5 h-2.5" /> File Ready
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-black text-slate-950 line-clamp-1 leading-snug">
                  {resource.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold line-clamp-2 leading-relaxed">
                  {resource.description || 'No description added yet.'}
                </p>
              </div>

              {/* Price / Currency breakdown */}
              {isPaid && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-500">Paystack Price:</span>
                  <span className="text-slate-900 font-extrabold">₦{priceInNGN.toLocaleString('en-US')}</span>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyLink(resource.id, resource.title)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    title="Copy Public Link"
                  >
                    {copiedId === resource.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <Link
                    to={`/resources/${resource.id}`}
                    target="_blank"
                    className="p-2 rounded-xl text-slate-400 hover:text-[#3e4095] hover:bg-[#3e4095]/10 transition-colors"
                    title="View on Live Site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(resource)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border-none cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(resource.id)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
