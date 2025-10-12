
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import SparklesIcon from './icons/SparklesIcon';
import SpinnerIcon from './icons/SpinnerIcon';

const questions = [
  {
    question: "What is the size of your company?",
    key: "companySize",
    options: ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"],
  },
  {
    question: "What is your biggest IT or business challenge right now?",
    key: "challenge",
    options: ["System downtime & reliability", "Cybersecurity threats", "Online visibility & marketing", "Building custom software", "Team needs technical training", "Getting business insights from data"],
  },
  {
    question: "What is your primary goal?",
    key: "goal",
    options: ["Increase team efficiency", "Enhance security", "Grow my online presence", "Develop a unique software tool", "Upskill my team", "Modernize our infrastructure"],
  },
];

interface Recommendation {
    serviceName: string;
    reasoning: string;
}

const NeedsAssessment: React.FC = () => {
    const [step, setStep] = useState(-1); // -1: start, 0-2: questions, 3: loading, 4: results, 5: error
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleStart = () => {
        setStep(0);
        setAnswers({});
        setRecommendations([]);
        setError(null);
        setFeedbackSubmitted(false);
    };

    const handleAnswer = (key: string, option: string) => {
        const newAnswers = { ...answers, [key]: option };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            fetchRecommendations(newAnswers);
        }
    };

    const handleFeedback = (isHelpful: boolean) => {
        console.log(`User feedback on recommendation: ${isHelpful ? 'Helpful' : 'Not helpful'}`);
        setFeedbackSubmitted(true);
    };

    const fetchRecommendations = async (finalAnswers: Record<string, string>) => {
        setIsLoading(true);
        setStep(3); // loading screen
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const availableServices = "'Managed IT Services', 'Cybersecurity Solutions', 'Networking Solutions', 'Software Development', 'Software Installation & Repair', 'Digital Marketing', 'Social Media Management', 'Data Analysis & Insights', 'FinTech Solutions', 'Expert Consulting', 'Personalized Tutoring'";
            const prompt = `You are an expert consultant for 'Ability IT'. Your goal is to provide a helpful, personalized service recommendation based on a client's answers.

            The services you can recommend are: ${availableServices}.
            
            Client's Answers:
            - Company Size: ${finalAnswers.companySize}
            - Biggest Challenge: ${finalAnswers.challenge}
            - Primary Goal: ${finalAnswers.goal}
            
            Based on this information, provide a recommendation. Recommend at least one and at most two services that are the best fit.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            recommendations: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        serviceName: {
                                            type: Type.STRING,
                                            description: `The name of the recommended service. Must be one of ${availableServices}.`,
                                        },
                                        reasoning: {
                                            type: Type.STRING,
                                            description: "A brief, friendly, one-sentence explanation of why this service is recommended.",
                                        },
                                    },
                                    required: ["serviceName", "reasoning"],
                                },
                            },
                        },
                        required: ["recommendations"],
                    },
                },
            });

            const resultText = response.text.trim();
            const resultJson = JSON.parse(resultText);
            
            setRecommendations(resultJson.recommendations);
            setStep(4); // results screen
        } catch (err) {
            console.error("Error fetching recommendations:", err);
            setError("Sorry, we couldn't generate a recommendation right now. Please try again later.");
            setStep(5); // error screen
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isLoading || step === 3) {
            return (
                <div className="text-center p-8">
                    <div className="flex justify-center items-center mb-4 text-indigo-500">
                        <SpinnerIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700">Analyzing your needs...</h3>
                    <p className="text-slate-500">Our AI is crafting your personalized solution.</p>
                </div>
            );
        }

        if (step === 4) { // Results
            return (
                <div className="text-center p-8">
                    <div className="flex justify-center items-center mb-4 text-indigo-500 bg-indigo-100 rounded-full h-16 w-16 mx-auto">
                        <SparklesIcon />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Personalized Recommendation</h3>
                    <div className="mt-8 mb-8 space-y-6 max-w-2xl mx-auto">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 text-left">
                                <h4 className="text-xl font-semibold text-indigo-600 mb-2">{rec.serviceName}</h4>
                                <p className="text-slate-600">{rec.reasoning}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-200">
                        {!feedbackSubmitted ? (
                            <>
                                <p className="text-sm text-slate-600 mb-3">Was this recommendation helpful?</p>
                                <div className="flex justify-center gap-4">
                                    <button 
                                        onClick={() => handleFeedback(true)} 
                                        className="p-2 w-12 h-12 rounded-full bg-white border border-slate-300 hover:bg-green-100 hover:border-green-400 transition-all duration-300 text-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                                        aria-label="Helpful"
                                    >
                                        👍
                                    </button>
                                    <button 
                                        onClick={() => handleFeedback(false)} 
                                        className="p-2 w-12 h-12 rounded-full bg-white border border-slate-300 hover:bg-red-100 hover:border-red-400 transition-all duration-300 text-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                                        aria-label="Not helpful"
                                    >
                                        👎
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm font-medium text-indigo-600">Thank you for your feedback!</p>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="#contact" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto">
                            Get a Detailed Quote
                        </a>
                        <button onClick={handleStart} className="bg-transparent border-2 border-slate-400 text-slate-600 font-bold py-3 px-8 rounded-full hover:bg-slate-100 transition-all duration-300 w-full sm:w-auto">
                            Start Over
                        </button>
                    </div>
                </div>
            );
        }
        
        if (step === 5) { // Error
            return (
                 <div className="text-center p-8">
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h3>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button onClick={handleStart} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg">
                        Try Again
                    </button>
                </div>
            )
        }

        if (step >= 0 && step < questions.length) {
            const currentQuestion = questions[step];
            return (
                <div className="text-center p-8">
                    <p className="text-sm font-semibold text-indigo-600 mb-2">Question {step + 1} of {questions.length}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mb-8">{currentQuestion.question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {currentQuestion.options.map(option => (
                            <button 
                                key={option} 
                                onClick={() => handleAnswer(currentQuestion.key, option)}
                                className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:border-indigo-500 border-2 border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <span className="font-medium text-slate-700">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // Default: Start screen
        return (
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Find Your Perfect Solution</h2>
                <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                    Answer a few simple questions, and our AI-powered tool will recommend the best services for your needs.
                </p>
                <div className="mt-8">
                    <button 
                        onClick={handleStart} 
                        className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105 text-lg"
                    >
                        Start Assessment
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section id="assessment" className="py-20 bg-slate-100">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-slate-50/70 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default NeedsAssessment;