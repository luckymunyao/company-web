import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solutions from './components/SolutionsExplorer';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Events from './components/Events';
import NeedsAssessment from './components/NeedsAssessment';
import ServiceCustomizer from './components/ServiceCustomizer';
import Booking from './components/Booking';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { usePersonalization } from './hooks/usePersonalization';

const App: React.FC = () => {
  const { heroContent, trackInterest } = usePersonalization();

  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      <Header />
      <main role="main">
        <Hero personalizedContent={heroContent.headline ? heroContent : undefined} />
        <Solutions trackInterest={trackInterest} />
        <About />
        <Portfolio trackInterest={trackInterest} />
        <Testimonials />
        <Blog />
        <Events />
        <NeedsAssessment />
        <ServiceCustomizer />
        <Booking />
        <Careers />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;