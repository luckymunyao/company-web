import React, { useState, useEffect } from 'react';
import StarIcon from './icons/StarIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import SpinnerIcon from './icons/SpinnerIcon';

const Survey: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    try {
      if (localStorage.getItem('abilityTechSurveySubmitted') !== 'true') {
        setIsVisible(true);
      }
    } catch (e) {
      console.warn('Could not access localStorage for survey state.');
      // If localStorage is unavailable (e.g., due to privacy settings), show the survey.
      setIsVisible(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) return; // Button is disabled, but as a safeguard.
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
        // In a real app, this would be sent to a backend service.
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Survey Submitted:', {
                    rating,
                    feedback,
                    timestamp: new Date().toISOString()
                });
                resolve('Success');
            }, 1500);
        });

        try {
            localStorage.setItem('abilityTechSurveySubmitted', 'true');
        } catch (e) {
            console.warn('Could not save survey state to localStorage.');
        }
        setIsSubmitted(true);
    } catch (error) {
        setSubmitError("Sorry, we couldn't submit your feedback right now. Please try again later.");
    } finally {
        setIsSubmitting(false);
    }
  };
  
  if (!isVisible) {
    return null;
  }

  return (
    <section id="survey" className="py-20 bg-slate-100 dark:bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg transition-all duration-500">
          {isSubmitted ? (
            <div className="text-center animate-fade-in">
              <CheckCircleIcon />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">Thank you for your feedback!</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Your input helps us improve our website and services.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Share Your Feedback</h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                How would you rate your experience on our website today?
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRating(star)}
                      className="text-4xl transition-transform duration-150 ease-in-out hover:scale-125 focus:outline-none"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <StarIcon
                        className={`${
                          (hoverRating || rating) >= star
                            ? 'text-yellow-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div>
                  <label htmlFor="feedback" className="sr-only">Additional Feedback</label>
                  <textarea
                    id="feedback"
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us more about your experience (optional)..."
                    className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition resize-y bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 placeholder-slate-400"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={rating === 0 || isSubmitting}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-wait flex items-center justify-center"
                  >
                    {isSubmitting ? <SpinnerIcon /> : 'Submit Feedback'}
                  </button>
                </div>
                {submitError && (
                    <p role="alert" className="text-sm text-red-500 text-center mt-2">{submitError}</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Survey;