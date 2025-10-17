import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MainPage from './MainPage';
import BlogPostDetail from './components/BlogPostDetail';
import ScrollToTop from './components/ScrollToTop';
import CallbackModal from './components/CallbackModal';

const App: React.FC = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <div className="text-slate-700 dark:text-slate-300">
      <Header onOpenCallbackModal={() => setIsCallbackModalOpen(true)} />
      <ScrollToTop />
      <main role="main">
        <Routes>
          <Route path="/" element={<MainPage onOpenCallbackModal={() => setIsCallbackModalOpen(true)} />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setIsCallbackModalOpen(false)} />
    </div>
  );
};

export default App;