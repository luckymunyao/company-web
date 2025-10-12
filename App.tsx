import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolutionsExplorer from './components/SolutionsExplorer';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        <Hero />
        <SolutionsExplorer />
        <About />
        <Testimonials />
        <Blog />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;