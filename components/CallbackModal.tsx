import React, { useState, useEffect, useRef } from 'react';
import { servicesData } from '../data/content';
import XIcon from './icons/XIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import PhoneIcon from './icons/PhoneIcon';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  "Morning (9am - 12pm)",
  "Afternoon (1pm - 5pm)",
  "Anytime",
];

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'General Inquiry',
    preferredTime: 'Anytime',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close after animation
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          service: 'General Inquiry',
          preferredTime: 'Anytime',
        });
        setErrors({});
        setSubmitError('');
      }, 300);
      return;
    }
    
    const previouslyFocusedElement = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];
    firstElement?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
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
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\+?[0-9\s-()]{7,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    try {
        // Simulate API call
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (formData.phone.includes('555')) { // Simple rule to test error state
                    reject(new Error('This phone number is invalid.'));
                } else {
                    console.log('Callback requested:', formData);
                    resolve('Success');
                }
            }, 1500);
        });
        setIsSubmitted(true);
    } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-slide-down-fast flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="callback-modal-title" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneIcon />
            Request a Callback
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-full -mt-1 -mr-1"
            aria-label="Close callback form"
          >
            <XIcon />
          </button>
        </div>
        
        {isSubmitted ? (
          <div className="p-8 text-center">
            <CheckCircleIcon />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">Request Received!</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Thank you, {formData.name}. We will call you at {formData.phone} during your preferred time.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="p-6 space-y-4 overflow-y-auto">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Leave your details below and one of our experts will call you back to discuss your needs.
              </p>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md dark:bg-slate-700 ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md dark:bg-slate-700 ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service of Interest</label>
                <select name="service" id="service" value={formData.service} onChange={handleChange} className="w-full bg-white dark:bg-slate-700 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md">
                    <option>General Inquiry</option>
                    {servicesData.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Callback Time</label>
                <select name="preferredTime" id="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-white dark:bg-slate-700 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md">
                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              {submitError && (
                <p role="alert" className="text-sm text-red-500 text-center">{submitError}</p>
              )}
            </div>
            <div className="flex-shrink-0 p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait flex items-center justify-center min-w-[120px]">
                {isSubmitting ? <SpinnerIcon /> : 'Request Call'}
              </button>
            </div>
          </form>
        )}
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

export default CallbackModal;