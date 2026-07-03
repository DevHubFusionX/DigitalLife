import { Link } from 'react-router-dom';
import { FileText, Youtube, Layers, Plus, BookOpen } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import { useResources } from '../../hooks/useResources';
import { useVideos } from '../../hooks/useVideos';
import { useBlog } from '../../hooks/useBlog';

export default function AdminDashboardPage() {
  const { resources } = useResources();
  const { videos } = useVideos();
  const { posts } = useBlog();

  // Unique categories
  const categories = new Set(resources.map((r) => r.category)).size;

  // Last 5 items combined (resources + videos) sorted by createdAt
  const recentResources = [...resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-950 tracking-tight">Welcome back 👋</h1>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          Here's a quick overview of your resource library.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={FileText} label="Total Resources" value={resources.length} color="blue" />
        <StatsCard icon={Youtube} label="Video Resources" value={videos.length} color="purple" />
        <StatsCard icon={BookOpen} label="Blog Posts" value={posts.length} color="green" />
        <StatsCard icon={Layers} label="Categories" value={categories} color="gold" />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link
          to="/admin/resources"
          className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors no-underline"
        >
          <Plus className="w-4 h-4" /> Add Resource
        </Link>
        <Link
          to="/admin/videos"
          className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-black/10 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors no-underline"
        >
          <Plus className="w-4 h-4" /> Add Video
        </Link>
        <Link
          to="/admin/blog"
          className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-black/10 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors no-underline"
        >
          <BookOpen className="w-4 h-4" /> Blog Posts
        </Link>
      </div>

      {/* Recent Resources */}
      <div>
        <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider mb-4">
          Recently Added
        </h2>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          {recentResources.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-semibold">
              No resources yet — add one to get started.
            </div>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentResources.map((resource) => (
                <li key={resource.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  {/* Cover swatch / image */}
                  {resource.coverImage ? (
                    <img
                      src={resource.coverImage}
                      alt={resource.title}
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-lg bg-linear-to-br ${resource.coverBg} shrink-0`}
                    />
                  )}
                  <div className="grow min-w-0">
                    <p className="text-xs font-bold text-slate-950 truncate">{resource.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {resource.category} · {resource.format}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                    {new Date(resource.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
