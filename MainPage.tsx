import React from 'react';
import Hero from './components/Hero';
import Solutions from './components/SolutionsExplorer';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Events from './components/Events';
import NeedsAssessment from './components/NeedsAssessment';
import AIServiceRecommendations from './components/AIServiceRecommendations';
import ServiceCustomizer from './components/ServiceCustomizer';
import Booking from './components/Booking';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import Survey from './components/Survey';
import ContactForm from './components/ContactForm';
import { usePersonalization } from './hooks/usePersonalization';

interface MainPageProps {
  onOpenCallbackModal: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onOpenCallbackModal }) => {
  const { heroContent, trackInterest, recommendedServices } = usePersonalization();
  const topRecommendedServiceTitle = recommendedServices.length > 0 ? recommendedServices[0].title : undefined;

  return (
    <>
      <Hero
        personalizedContent={heroContent.headline ? heroContent : undefined}
        recommendedServiceTitle={topRecommendedServiceTitle}
      />
      <Solutions trackInterest={trackInterest} />
      <About />
      <WhyChooseUs />
      <Portfolio trackInterest={trackInterest} />
      <Testimonials />
      <Blog />
      <Events />
      <NeedsAssessment />
      <AIServiceRecommendations recommendedServices={recommendedServices} />
      <ServiceCustomizer />
      <Booking />
      <Careers />
      <FAQ />
      <Survey />
      <ContactForm onOpenCallbackModal={onOpenCallbackModal} />
    </>
  );
};

export default MainPage;