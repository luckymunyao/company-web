import React, { useEffect } from 'react';
import type { Project } from '../types';
import XIcon from './icons/XIcon';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

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
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-slide-down-fast flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 w-full flex-shrink-0">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
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
