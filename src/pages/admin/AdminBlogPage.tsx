import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, BookOpen } from 'lucide-react';
import BlogForm from '../../components/admin/BlogForm';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import { useBlog } from '../../hooks/useBlog';
import { deletePost } from '../../lib/firestore/blog';
import type { BlogPost } from '../../types/blog';

export default function AdminBlogPage() {
  const { posts, loading } = useBlog();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditTarget(post);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deletePost(deletingId);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const CATEGORY_COLORS: Record<string, string> = {
    Operations: 'bg-blue-50 text-blue-700',
    Strategy: 'bg-violet-50 text-violet-700',
    Branding: 'bg-rose-50 text-rose-700',
    Systems: 'bg-teal-50 text-teal-700',
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight">Blog Posts</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {posts.length} article{posts.length !== 1 ? 's' : ''} published
          </p>
        </div>
        <button
          id="add-blog-post-btn"
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#3e4095] transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-bold">No posts found.</p>
          <p className="text-xs mt-1">Click "Add Post" or seed defaults from Settings.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/5">
          <table className="w-full text-xs font-semibold">
            <thead className="bg-slate-50 border-b border-black/5">
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Cover
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden lg:table-cell">
                  Author
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 hidden sm:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  {/* Cover swatch */}
                  <td className="px-4 py-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-linear-to-br ${post.coverBg} flex items-end p-1.5`}
                    >
                      <span className="text-[6px] font-black text-[#ffd148] uppercase leading-none line-clamp-1">
                        {post.coverLabel}
                      </span>
                    </div>
                  </td>
                  {/* Title + slug */}
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-950 truncate max-w-50">{post.title}</p>
                    <p className="text-slate-400 text-[10px] font-mono truncate max-w-50">
                      /blog/{post.id}
                    </p>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                        CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {post.category}
                    </span>
                  </td>
                  {/* Author */}
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600 truncate max-w-30">
                    {post.author}
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-400">{post.date}</td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(post)}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#3e4095]/10 flex items-center justify-center transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3 h-3 text-slate-600" />
                      </button>
                      <button
                        onClick={() => setDeletingId(post.id)}
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
      )}

      {/* Blog Form Modal */}
      {formOpen && <BlogForm editTarget={editTarget} onClose={closeForm} />}

      {/* Delete confirm */}
      {deletingId && (
        <ConfirmDeleteModal
          title="Delete Blog Post"
          message="This will permanently remove this article from Firestore. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
