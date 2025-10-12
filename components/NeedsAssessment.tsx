import React, { useState } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';
import SparklesIcon from './icons/SparklesIcon';

const quizQuestions = [
  {
    question: "What is your primary goal right now?",
    options: [
      "Protecting my business from cyber threats.",
      "Improving my team's productivity and efficiency.",
      "Growing my online presence and customer base.",
      "Making better, data-driven business decisions.",
    ],
  },
  {
    question: "How would you describe your current IT infrastructure?",
    options: [
      "It's solid, but I worry about security and downtime.",
      "We're constantly dealing with small IT issues and glitches.",
      "We need to build a custom application to solve a specific problem.",
      "We have a lot of data but aren't sure how to use it effectively.",
    ],
  },
  {
    question: "What's your biggest challenge with technology?",
    options: [
      "Keeping up with the latest security threats.",
      "My team lacks the skills to use our software effectively.",
      "Reaching new customers online.",
      "Our systems don't talk to each other.",
    ],
  },
];

const NeedsAssessment: React.FC = () => {
  const [step, setStep] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = () => {
    setStep('quiz');
  };

  const handleReset = () => {
    setStep('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('results');
    }
  };
  
  const renderContent = () => {
    switch (step) {
      case 'start':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Not Sure Where to Start?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Answer a few quick questions to get a personalized service recommendation.</p>
            <button
              onClick={handleStart}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md"
            >
              Start Assessment
            </button>
          </div>
        );

      case 'quiz':
        const question = quizQuestions[currentQuestionIndex];
        return (
          <div className="animate-fade-in">
            <p className="text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">{question.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center items-center gap-2 mb-4">
                <SparklesIcon />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Thank You For Your Answers!</h3>
                <SparklesIcon />
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Your input is valuable to us. Based on your needs, we recommend exploring our full range of solutions or getting in touch for a personalized consultation.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="#solutions" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md">
                Explore Our Solutions
              </a>
              <a href="#contact" className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 font-semibold px-6 py-3 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300">
                Contact Us
              </a>
            </div>
             <button
              onClick={handleReset}
              className="mt-8 bg-transparent text-slate-500 dark:text-slate-400 font-semibold px-6 py-2 rounded-md hover:underline transition-all duration-300"
            >
              Start Over
            </button>
          </div>
        );
    }
  };

  return (
    <section id="assessment" className="py-20 bg-slate-100 dark:bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-xl shadow-lg">
          {renderContent()}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default NeedsAssessment;