import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from '../data/content';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find(p => p.slug === slug);

  if (!post) {
    return (
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Post not found</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  // A simple parser for the blog content
  const renderContent = () => {
    return post.content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">{paragraph.substring(4)}</h3>;
      }
      if (paragraph.startsWith('**')) {
        return <p key={index} className="my-4"><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>;
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n- ').map(item => item.replace(/^- /, ''));
        return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        )
      }
      return <p key={index} className="my-4 leading-relaxed">{paragraph}</p>;
    });
  };

  return (
    <section className="py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
            <Link to="/#blog" className="group inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-semibold">
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    <ArrowLeftIcon />
                </span>
                Back to Blog
            </Link>
        </div>

        <article>
          <header className="mb-10 text-center">
            <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400 text-sm font-semibold px-3 py-1 rounded-full mb-4">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center justify-center mt-6">
              <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{post.author.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">{post.date}</p>
              </div>
            </div>
          </header>

          <img 
            src={`${post.imageUrl}/1200/600`} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-10" 
          />
          
          <div className="text-lg text-slate-600 dark:text-slate-400">
            {renderContent()}
          </div>

          <div className="mt-12 p-8 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to Take the Next Step?</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 mb-6 max-w-xl mx-auto">
              Let's discuss how our expertise can help your business grow. Contact us today for a free consultation.
            </p>
            <Link 
                to={post.relatedService ? `/#contact?service=${encodeURIComponent(post.relatedService)}` : '/#contact'}
                className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105"
            >
                <span>Discuss Your Project</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogPostDetail;