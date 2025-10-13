import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../types';
import XIcon from './icons/XIcon';
import SparklesIcon from './icons/SparklesIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import { GoogleGenAI } from '@google/genai';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  useEffect(() => {
    // Reset AI summary state when the project changes
    setAiSummary('');
    setSummaryError('');
    setIsSummarizing(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];
      
      firstElement?.focus();

      const trapFocus = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift+Tab
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      const currentModalRef = modalRef.current;
      currentModalRef?.addEventListener('keydown', trapFocus);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        currentModalRef?.removeEventListener('keydown', trapFocus);
        previouslyFocusedElement?.focus();
      };
    }
  }, [project, onClose]);

  const handleGenerateSummary = async () => {
    if (!project) return;
    
    setIsSummarizing(true);
    setAiSummary('');
    setSummaryError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `You are a marketing assistant for an IT services company. Summarize the following project description into a single, compelling sentence for a potential client. Focus on the key achievement and business value. Project Description: "${project.description}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      setAiSummary(response.text);

    } catch (error) {
      console.error("Error generating AI summary:", error);
      setSummaryError("Sorry, we couldn't generate a summary at this time. Please try again later.");
    } finally {
      setIsSummarizing(false);
    }
  };

  if (!project) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-slide-down-fast flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 w-full flex-shrink-0">
            <img 
              src={`${project.imageUrl}/600/360`} 
              srcSet={`${project.imageUrl}/600/360 600w, ${project.imageUrl}/1200/720 1200w`}
              sizes="100vw"
              loading="lazy"
              decoding="async"
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
                <h2 id="project-modal-title" className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-lg font-semibold text-indigo-300">{project.client}</p>
            </div>
             <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white bg-black/30 hover:bg-black/60 transition-colors rounded-full"
                aria-label="Close project details"
            >
                <XIcon />
            </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 whitespace-pre-wrap">
            {project.description}
          </p>
          
          <div className="mb-6 p-4 rounded-lg bg-indigo-50 dark:bg-slate-900/50 border border-indigo-200 dark:border-slate-700">
            <button
              onClick={handleGenerateSummary}
              disabled={isSummarizing}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 disabled:opacity-50 disabled:cursor-wait"
            >
              <SparklesIcon />
              <span>Generate AI Summary</span>
            </button>
             <div className="mt-2" aria-live="polite" role="status">
                {isSummarizing && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <SpinnerIcon />
                        <span>Generating summary...</span>
                    </div>
                )}
                {aiSummary && (
                <p className="text-slate-700 dark:text-slate-300 italic">"{aiSummary}"</p>
                )}
                {summaryError && (
                <p className="text-sm text-red-500">{summaryError}</p>
                )}
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                <span key={tag} className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold rounded-md transition-all duration-300 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-800 focus:ring-indigo-500"
            >
                Close
            </button>
        </div>

      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-down-fast { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        .animate-slide-down-fast { animation: slide-down-fast 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProjectModal;