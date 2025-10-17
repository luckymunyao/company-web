import React, { useState, useMemo, useEffect } from 'react';
import { blogPostsData } from '../data/content';
import BlogPostCard from './BlogPostCard';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import SearchIcon from './icons/SearchIcon';

const categories = ['All Categories', ...Array.from(new Set(blogPostsData.map(post => post.category)))];

const Blog: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = blogPostsData;

    if (selectedCategory !== 'All Categories') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      posts = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(lowercasedQuery);
        const excerptMatch = post.excerpt.toLowerCase().includes(lowercasedQuery);
        const authorMatch = post.author.name.toLowerCase().includes(lowercasedQuery);
        const tagsMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery));
        return titleMatch || excerptMatch || authorMatch || tagsMatch;
      });
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  return (
    <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Latest Insights</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Stay updated with the latest industry insights, tips, and trends from our team of experts.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search by keyword, author, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
              aria-label="Search blog posts"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto appearance-none pr-10 pl-4 py-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500 transition"
              aria-label="Filter blog posts by category"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div aria-live="polite">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => <BlogPostCardSkeleton key={index} />)}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={index} post={post} searchQuery={searchQuery} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No Articles Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;