import React, { useState, useEffect, useRef } from 'react';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import LinkIcon from './icons/LinkIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import UsersIcon from './icons/UsersIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const features = [
    { icon: <DatabaseIcon />, text: 'Trained on your company’s data (projects, services, FAQs).' },
    { icon: <ChatBubbleLeftRightIcon />, text: 'Understands natural language for seamless conversations.' },
    { icon: <CalendarDaysIcon />, text: 'Can schedule meetings directly with your team.' },
    { icon: <DocumentTextIcon />, text: 'Generates instant quotes based on user needs.' },
    { icon: <UsersIcon />, text: 'Intelligently escalates complex issues to human agents.' },
    { icon: <LinkIcon />, text: 'Integrates with CRM (e.g., HubSpot, Salesforce).' },
    { icon: <MicrophoneIcon />, text: 'Voice-enabled for enhanced accessibility.' },
]

const AIChatAssistant: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            }
        },
        {
            threshold: 0.2,
        }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => {
        if (sectionRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(sectionRef.current);
        }
        };
  }, []);

  return (
    <section id="ai-assistant" ref={sectionRef} className="py-20 bg-slate-100 dark:bg-slate-800/50 overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        AI Chat Assistant (24/7 Support)
                    </h2>
                    <p className={`text-slate-600 dark:text-slate-400 text-lg mb-6 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        Our smart chatbot is trained on your company’s data. It understands natural language, can schedule meetings, generate quotes, and escalate to humans when needed.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                             <li 
                                key={index} 
                                className={`flex items-start gap-3 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                style={{ transitionDelay: `${200 + index * 100}ms` }}
                            >
                                <span className="flex-shrink-0 text-indigo-600 dark:text-indigo-400 mt-1">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                     <div className={`transition-all duration-700 ease-out delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <a href="#contact" className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105">
                            <span>See it in Action</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowRightIcon />
                            </span>
                        </a>
                    </div>
                </div>
                <div className={`order-1 md:order-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 max-w-sm mx-auto">
                        <div className="absolute top-2 left-4 flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900/50 p-2 text-center rounded-t-lg mt-4">
                            <p className="text-sm font-bold">Ability IT Assistant</p>
                        </div>
                        <div className="h-64 space-y-3 p-4 bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
                            <div className="flex justify-start">
                                <p className="text-sm bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-3 py-1.5 max-w-[80%]">
                                    Hello! How can I help you today?
                                </p>
                            </div>
                             <div className="flex justify-end">
                                <p className="text-sm bg-indigo-600 text-white rounded-lg px-3 py-1.5 max-w-[80%]">
                                    I need a quote for cybersecurity services.
                                </p>
                            </div>
                             <div className="flex justify-start">
                                <div className="flex items-center space-x-1 bg-slate-200 dark:bg-slate-700 rounded-lg px-3 py-1.5">
                                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                         <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                             <input type="text" placeholder="Type a message..." className="w-full bg-slate-100 dark:bg-slate-700 border-transparent focus:border-transparent focus:ring-0 rounded-full px-4 py-1.5 text-sm" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AIChatAssistant;