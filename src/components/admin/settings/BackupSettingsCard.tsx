import { Download, Database } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import type { Resource } from '../../../types/resource';
import type { VideoResource } from '../../../types/video';
import type { BlogPost } from '../../../types/blog';
import type { Lead } from '../../../types/lead';
import type { Playbook } from '../../../types/playbook';
import type { Category, Format } from '../../../lib/firestore/metadata';

interface BackupSettingsCardProps {
  resources: Resource[];
  videos: VideoResource[];
  posts: BlogPost[];
  leads: Lead[];
  playbooks: Playbook[];
  categories: Category[];
  formats: Format[];
}

export default function BackupSettingsCard({
  resources,
  videos,
  posts,
  leads,
  playbooks,
  categories,
  formats,
}: BackupSettingsCardProps) {
  const { success } = useToast();

  const handleExportAllJSON = () => {
    const backupData = {
      meta: {
        platform: 'Digitalife Ehub Admin Catalog',
        exportedAt: new Date().toISOString(),
        version: '2.0',
      },
      counts: {
        resources: resources.length,
        videos: videos.length,
        posts: posts.length,
        leads: leads.length,
        playbooks: playbooks.length,
        categories: categories.length,
        formats: formats.length,
      },
      data: {
        resources,
        videos,
        posts,
        leads,
        playbooks,
        categories,
        formats,
      },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digitalife-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success('Complete database snapshot exported to JSON.');
  };

  const totalRecords =
    resources.length +
    videos.length +
    posts.length +
    leads.length +
    playbooks.length +
    categories.length +
    formats.length;

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.04] p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#3e4095]/10 flex items-center justify-center text-[#3e4095]">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-950">Data Backup &amp; Archival Export</h2>
            <p className="text-[11px] font-semibold text-slate-400">
              Download an encrypted or plaintext JSON snapshot of all live catalog records and customer leads
            </p>
          </div>
        </div>

        <button
          onClick={handleExportAllJSON}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer self-start sm:self-auto touch-manipulation"
        >
          <Download className="w-3.5 h-3.5" /> Export All JSON ({totalRecords})
        </button>
      </div>

      {/* Snapshot Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{resources.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Resources</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{videos.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Videos</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{posts.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Articles</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{leads.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Leads</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{playbooks.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Playbooks</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-lg font-black text-slate-900 leading-none">{categories.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Topics</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center col-span-2 sm:col-span-1">
          <span className="text-lg font-black text-slate-900 leading-none">{formats.length}</span>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Formats</p>
        </div>
      </div>
    </div>
  );
}
