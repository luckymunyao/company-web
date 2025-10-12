import React from 'react';
import type { BlogPost } from '../types';
import BlogPostCard from './BlogPostCard';

const staticBlogPosts: BlogPost[] = [
  {
    category: 'Cybersecurity',
    title: 'Top 5 Cybersecurity Threats to Watch in 2024',
    excerpt: 'Stay ahead of the curve by understanding the most prevalent threats facing businesses today.',
    imageUrl: 'https://picsum.photos/400/250?random=20',
    author: {
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d5',
    },
    date: 'August 5, 2024',
  },
  {
    category: 'Cloud Solutions',
    title: 'Is a Multi-Cloud Strategy Right for Your Business?',
    excerpt: 'Explore the benefits and challenges of adopting a multi-cloud approach to enhance flexibility and avoid vendor lock-in.',
    imageUrl: 'https://picsum.photos/400/250?random=21',
    author: {
      name: 'Samantha Lee',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d6',
    },
    date: 'August 1, 2024',
  },
  {
    category: 'IT Strategy',
    title: 'A Practical Guide to AI Integration for SMEs',
    excerpt: 'Learn how small and medium-sized enterprises can leverage AI to automate tasks, gain insights, and drive growth.',
    imageUrl: 'https://picsum.photos/400/250?random=22',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d7',
    },
    date: 'July 28, 2024',
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Latest Insights</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Stay updated with the latest industry insights, tips, and trends from our team of experts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticBlogPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;