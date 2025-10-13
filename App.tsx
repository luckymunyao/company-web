import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MainPage from './MainPage';
import BlogPostDetail from './components/BlogPostDetail';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      <Header />
      <ScrollToTop />
      <main role="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;