import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import SolutionsExplorer from './components/SolutionsExplorer';
import Cybersecurity from './components/Cybersecurity';
import NeedsAssessment from './components/NeedsAssessment';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import AIChatAssistant from './components/AIChatAssistant';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Careers from './components/Careers';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      <Header />
      <main>
        <Hero />
        {/* The old services component is not displayed in the final layout */}
        {/* <Services /> */}
        <SolutionsExplorer />
        <Cybersecurity />
        <About />
        <Portfolio />
        <Testimonials />
        <AIChatAssistant />
        {/* AI components are not currently displayed */}
        {/* <NeedsAssessment /> */}
        <Blog />
        <FAQ />
        <Careers />
        <ContactForm />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;