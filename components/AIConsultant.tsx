import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import SendIcon from './icons/SendIcon';

const CHAT_HISTORY_KEY = 'ai-consultant-chat-history';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Save history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);


  // Initialize the AI model and chat session, and load history
  useEffect(() => {
      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
          const availableServices = "'Managed IT Services', 'Cybersecurity Solutions', 'Networking Solutions', 'Digital Marketing', 'Social Media Management', 'Data Analysis & Insights', 'FinTech Solutions', 'Software Installation & Repair', 'Software Development', 'Personalized Tutoring', 'Expert Consulting'";
          const systemInstruction = `You are a friendly and expert IT consultant for a company called 'Ability IT'. Your goal is to understand the user's business needs and recommend one or more of the company's services: ${availableServices}. Start the conversation by introducing yourself and asking how you can help. Keep your responses concise and helpful. Format your responses with markdown for readability.`;
          
          chatRef.current = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                  systemInstruction,
              },
          });

          // Load chat history from localStorage
          const savedHistoryRaw = localStorage.getItem(CHAT_HISTORY_KEY);
          if (savedHistoryRaw) {
            try {
              const savedHistory = JSON.parse(savedHistoryRaw);
              if (Array.isArray(savedHistory) && savedHistory.length > 0) {
                setMessages(savedHistory);
                return;
              }
            } catch (e) {
              console.error("Failed to parse chat history, starting fresh.", e);
              localStorage.removeItem(CHAT_HISTORY_KEY);
            }
          }
          
          // Start conversation with a greeting from the model if no valid history
          setMessages([
              { role: 'model', content: "Hello! I'm your AI IT Consultant from Ability IT. How can I help you with your technology and business needs today?" }
          ]);

      } catch (e) {
          console.error("Failed to initialize AI model:", e);
          setError("Failed to initialize the AI consultant. Please check the API key and refresh the page.");
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewChat = () => {
    setIsLoading(false);
    setError(null);
    setUserInput('');
    localStorage.removeItem(CHAT_HISTORY_KEY);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const availableServices = "'Managed IT Services', 'Cybersecurity Solutions', 'Networking Solutions', 'Digital Marketing', 'Social Media Management', 'Data Analysis & Insights', 'FinTech Solutions', 'Software Installation & Repair', 'Software Development', 'Personalized Tutoring', 'Expert Consulting'";
      const systemInstruction = `You are a friendly and expert IT consultant for a company called 'Ability IT'. Your goal is to understand the user's business needs and recommend one or more of the company's services: ${availableServices}. Start the conversation by introducing yourself and asking how you can help. Keep your responses concise and helpful. Format your responses with markdown for readability.`;
      
      chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction,
          },
      });

      setMessages([
          { role: 'model', content: "Hello! I'm your AI IT Consultant from Ability IT. How can I help you with your technology and business needs today?" }
      ]);
    } catch (e) {
      console.error("Failed to re-initialize AI model:", e);
      setError("Failed to start a new chat. Please refresh the page.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of responseStream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === 'model' && lastMessage.content === '') {
            // If we already added a placeholder, fill it with the error
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = errorMessage;
            return newMessages;
          }
          // Otherwise, add a new error message
          return [...prev, { role: 'model', content: errorMessage }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="consultant" className="py-20 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">AI-Powered Consultation</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Chat with our AI assistant to get instant, personalized recommendations for your business challenges.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">AI Consultant</h3>
              <button 
                  onClick={handleNewChat} 
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-3 py-1"
              >
                  New Chat
              </button>
            </div>
            <div className="p-6 h-[500px] overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white"><SparklesIcon/></span>}
                        <div className={`max-w-md rounded-xl px-4 py-3 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }}></p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white"><SparklesIcon/></span>
                        <div className="max-w-md rounded-xl px-4 py-3 bg-slate-200 text-slate-800 rounded-bl-none">
                            <div className="flex items-center justify-center space-x-1">
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {error && <p className="text-center text-red-500 text-sm px-4 pb-2">{error}</p>}
            <div className="p-4 bg-slate-50 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Tell me about your business needs..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
                        disabled={isLoading}
                        aria-label="Your message"
                    />
                    <button 
                        type="submit"
                        className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        disabled={isLoading || !userInput.trim()}
                        aria-label="Send message"
                    >
                       <SendIcon/>
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;