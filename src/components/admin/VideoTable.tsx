import { useState } from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import type { VideoResource } from '../../types/video';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { deleteVideo } from '../../lib/firestore/videos';

interface VideoTableProps {
  videos: VideoResource[];
  onEdit: (video: VideoResource) => void;
}

export default function VideoTable({ videos, onEdit }: VideoTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteVideo(deletingId);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-sm font-bold">No video resources yet.</p>
        <p className="text-xs mt-1">Click "Add Video" to add your first YouTube resource.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-black/5">
        <table className="w-full text-xs font-semibold">
          <thead className="bg-slate-50 border-b border-black/5">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Thumbnail
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Title
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden lg:table-cell">
                Link
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="w-20 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-[7px] border-t-transparent border-b-transparent border-l-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-slate-950 truncate max-w-45">{video.title}</p>
                  <p className="text-slate-400 text-[10px] truncate max-w-45">{video.description}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="bg-[#3e4095]/10 text-[#3e4095] text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                    {video.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#3e4095] hover:underline text-[10px] font-bold"
                  >
                    Watch <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(video)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#3e4095]/10 flex items-center justify-center transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setDeletingId(video.id)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 flex items-center justify-center transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3 text-rose-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Video Resource"
          message="This will permanently remove this video resource. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
