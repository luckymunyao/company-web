import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  searchQuery: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, searchQuery }) => {

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <mark key={i} className="bg-indigo-200 dark:bg-indigo-900/50 text-inherit rounded-sm px-0.5 not-italic">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Link to={`/blog/${post.slug}`} className="group block bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden">
      <div className="relative">
        <img 
          src={`${post.imageUrl}/400/250`} 
          srcSet={`${post.imageUrl}/400/250 400w, ${post.imageUrl}/800/500 800w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
          alt={post.title} 
          className="w-full h-48 object-cover" 
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">{post.category}</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{highlightText(post.title, searchQuery)}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{highlightText(post.excerpt, searchQuery)}</p>
        <div className="flex items-center">
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{highlightText(post.author.name, searchQuery)}</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">{post.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;