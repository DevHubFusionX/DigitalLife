import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, ExternalLink, Paperclip, Sparkles, Copy, Check } from 'lucide-react';
import type { Resource } from '../../../types/resource';
import { useToast } from '../../../hooks/useToast';

interface ResourceTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
}

export default function ResourceTable({ resources, onEdit, onDelete }: ResourceTableProps) {
  const { success } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, title: string) => {
    const url = `${window.location.origin}/resources/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success(`Copied live link for "${title}".`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-x-auto">
      <table className="w-full text-xs font-semibold text-slate-700">
        <thead>
          <tr className="text-left text-[10px] font-black text-slate-400 border-b border-slate-100 uppercase tracking-wider">
            <th className="pb-3 px-3">Cover</th>
            <th className="pb-3 px-3">Title &amp; Description</th>
            <th className="pb-3 px-3 hidden md:table-cell">Category</th>
            <th className="pb-3 px-3 hidden lg:table-cell">Format</th>
            <th className="pb-3 px-3">Price</th>
            <th className="pb-3 px-3 hidden sm:table-cell">Attachment</th>
            <th className="pb-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {resources.map((resource) => {
            const isPaid = !resource.isFree && Number(resource.price) > 0;
            const ngnPrice = isPaid ? Math.round(Number(resource.price) * 1600) : 0;

            return (
              <tr key={resource.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Cover Thumbnail */}
                <td className="py-3 px-3">
                  {resource.coverImage ? (
                    <img
                      src={resource.coverImage}
                      alt={resource.title}
                      className="w-11 h-11 rounded-xl object-cover border border-black/5"
                    />
                  ) : (
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${resource.coverBg || 'from-[#0f172a] to-[#1e293b]'} flex items-center justify-center text-white text-[9px] font-black shadow-xs`}
                    >
                      <Sparkles className="w-4 h-4 text-white/80" />
                    </div>
                  )}
                </td>

                {/* Title & Description */}
                <td className="py-3 px-3">
                  <p className="font-black text-slate-950 truncate max-w-xs">{resource.title}</p>
                  <p className="text-slate-400 text-[10px] truncate max-w-xs mt-0.5">
                    {resource.description || 'No description provided'}
                  </p>
                </td>

                {/* Category */}
                <td className="py-3 px-3 hidden md:table-cell">
                  <span className="bg-[#3e4095]/10 text-[#3e4095] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {resource.category || 'General'}
                  </span>
                </td>

                {/* Format */}
                <td className="py-3 px-3 hidden lg:table-cell">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {resource.format || 'Document'}
                  </span>
                </td>

                {/* Price */}
                <td className="py-3 px-3">
                  {isPaid ? (
                    <div>
                      <span className="bg-[#ffd148]/20 text-[#b49200] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                        ${Number(resource.price).toFixed(2)}
                      </span>
                      <p className="text-[9px] font-semibold text-slate-400 mt-0.5">
                        ₦{ngnPrice.toLocaleString('en-US')}
                      </p>
                    </div>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  )}
                </td>

                {/* Attachment Status */}
                <td className="py-3 px-3 hidden sm:table-cell">
                  {resource.downloadUrl ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <Paperclip className="w-3 h-3" /> Attached
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold">No file</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleCopyLink(resource.id, resource.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                      title="Copy Public Link"
                    >
                      {copiedId === resource.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <Link
                      to={`/resources/${resource.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#3e4095] hover:bg-slate-100 transition-colors"
                      title="View Live"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => onEdit(resource)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(resource.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border-none bg-transparent cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
