import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';

interface RelatedBlogPostsProps {
  posts: BlogPost[];
}

export default function RelatedBlogPosts({ posts }: RelatedBlogPostsProps) {
  if (posts.length === 0) return null;

  return (
    <footer className="max-w-6xl mx-auto px-6 border-t border-black/5 pt-16 mt-16">
      <h4 className="text-lg font-black text-slate-950 uppercase tracking-wider mb-8">
        Related Articles
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((item) => (
          <Link
            key={item.id}
            to={`/blog/${item.id}`}
            className="group border border-black/5 bg-white rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-black/10 transition-all duration-300 no-underline"
          >
            {/* Cover illustration */}
            <div
              className={`h-36 bg-linear-to-br ${item.coverBg} p-4 flex flex-col justify-between relative`}
            >
              <span className="self-end bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <div>
                <h3 className="text-white text-xs font-black tracking-tight leading-snug">
                  {item.coverLabel}
                </h3>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between grow">
              <div>
                <h5 className="text-slate-950 text-xs font-bold tracking-tight mb-1 group-hover:text-[#3e4095] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h5>
                <p className="text-slate-400 text-[10px] font-bold block mb-1">By {item.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </footer>
  );
}
