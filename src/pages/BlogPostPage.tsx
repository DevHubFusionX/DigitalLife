import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';
import { usePageSEO } from '../hooks/usePageSEO';

import BlogPostHeader from '../components/blog-post/BlogPostHeader';
import BlogPostSidebar from '../components/blog-post/BlogPostSidebar';
import BlogPostContent from '../components/blog-post/BlogPostContent';
import RelatedBlogPosts from '../components/blog-post/RelatedBlogPosts';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = useBlog();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const post = posts.find((p) => p.id === id) ?? null;

  usePageSEO({
    title: post ? `${post.title} | Digitalife Ehub` : 'Digitalife Insights | Digitalife Ehub',
    description: post?.subtitle || post?.introduction,
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Related reads: same category or same author, excluding current
  const relatedPosts = post
    ? posts
        .filter(
          (p) => p.id !== post.id && (p.category === post.category || p.author === post.author)
        )
        .slice(0, 3)
    : [];
  const finalRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : posts.filter((p) => p.id !== (post?.id ?? '')).slice(0, 3);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-[#fffdf5] pt-28 pb-24 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#3e4095] opacity-50" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#fffdf5] pt-28 pb-24 flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="text-5xl font-black text-slate-200 mb-4">404</p>
        <h1 className="text-xl font-black text-slate-950 mb-2">Article not found</h1>
        <p className="text-sm text-slate-500 font-semibold mb-8">
          This article may have been removed or the link is incorrect.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-xs font-bold text-[#3e4095] hover:text-[#2e3075] uppercase tracking-wider no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20 pb-24 relative">
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 h-1 bg-slate-200 z-40">
        <div
          className="h-full bg-[#3e4095] transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Header Area */}
      <BlogPostHeader post={post} />

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Sticky Table of Contents & Tools */}
        <BlogPostSidebar
          sections={post.sections}
          isCopied={isCopied}
          onCopyLink={copyLinkToClipboard}
        />

        {/* Right Column: Article Rich Text Content & Newsletter */}
        <BlogPostContent
          post={post}
          isCopied={isCopied}
          onCopyLink={copyLinkToClipboard}
        />
      </div>

      {/* Related Reads Section */}
      <RelatedBlogPosts posts={finalRelated} />
    </div>
  );
}
