import React from 'react';
import BlogPostCard from './BlogPostCard';
import type { BlogPost } from '../types';

const blogPostsData: BlogPost[] = [
  {
    category: 'Cybersecurity',
    title: 'The Top 5 Cybersecurity Threats to Watch in 2024',
    excerpt: 'Stay ahead of the curve. We break down the most significant cybersecurity threats that businesses will face this year.',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    author: {
      name: 'Jane Doe',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'July 15, 2024',
  },
  {
    category: 'Data Analytics',
    title: 'How to Turn Your Business Data into Actionable Insights',
    excerpt: 'Data is the new oil. Learn the fundamental steps to harness your data and make smarter business decisions.',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    author: {
      name: 'John Smith',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704e',
    },
    date: 'July 10, 2024',
  },
  {
    category: 'IT Consulting',
    title: 'Is Your Technology Holding You Back? A Guide for SMBs',
    excerpt: 'Outdated systems can be a major drag on productivity. Here’s how to assess your tech stack and plan for the future.',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    author: {
      name: 'Emily White',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704f',
    },
    date: 'July 5, 2024',
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Latest Insights</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Stay informed with our expert analysis on technology trends, security, and business growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;