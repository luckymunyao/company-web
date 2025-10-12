import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <a href="#" className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden">
      <div className="relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">{post.category}</span>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{post.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center">
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="font-semibold text-slate-800">{post.author.name}</p>
            <p className="text-sm text-slate-500">{post.date}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BlogPostCard;