import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, Type } from '@google/genai';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import XIcon from './icons/XIcon';
import BotIcon from './icons/BotIcon';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  quickReplies?: string[];
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    response: {
      type: Type.STRING,
      description: "The main text response to the user's query."
    },
    quickReplies: {
      type: Type.ARRAY,
      description: "A list of 3-4 suggested, short follow-up questions or topics.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ['response', 'quickReplies']
};


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isOpen && !chatRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are a helpful and friendly AI assistant for Ability IT, a technology services company.
            Your role is to answer user questions about the company's services, provide information, and guide them to the right sections of the website.
            Keep your answers concise, professional, and helpful. You should be knowledgeable about cybersecurity, managed IT services, software development, digital marketing, data analysis, and other services offered by Ability IT.
            If a user asks a question outside of your scope, politely state that you are an assistant for Ability IT and can only answer questions related to its business.
            IMPORTANT: Your response MUST strictly be in JSON format, adhering to this schema: {"response": string, "quickReplies": string[]}. The 'response' field should contain your conversational reply. The 'quickReplies' field should contain an array of 3-4 relevant, short (1-4 word) follow-up questions or topics a user might be interested in based on your response.`,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        });
        setMessages([
          { 
            sender: 'bot', 
            text: "Hello there! I'm the Ability IT virtual assistant. I can answer questions about our services like Cybersecurity, Managed IT, and more. What can I help you find?",
            quickReplies: ['What is managed IT?', 'Cybersecurity services', 'Custom software solutions'] 
          }
        ]);
      } catch (error) {
        console.error("Failed to initialize Gemini API:", error);
        setMessages([
          { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }
        ]);
      }
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const submitMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    let botResponse: Message;

    try {
      const response = await chatRef.current.sendMessage({ message: messageText });
      const responseText = response.text;
      
      try {
        const json = JSON.parse(responseText);
        botResponse = {
          sender: 'bot',
          text: json.response || "I'm not sure how to answer that.",
          quickReplies: json.quickReplies || [],
        };
      } catch (jsonError) {
        console.warn("Could not parse Gemini response as JSON. Using raw text.", jsonError);
        botResponse = {
          sender: 'bot',
          text: responseText,
          quickReplies: [],
        };
      }
    } catch (apiError) {
      console.error("Gemini API error:", apiError);
      botResponse = { text: "I'm sorry, but I encountered an error. Please try again.", sender: 'bot' };
    } finally {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };
  
  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = lastMessage?.sender === 'bot' && lastMessage.quickReplies && lastMessage.quickReplies.length > 0 && !isLoading;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <XIcon /> : <ChatBubbleIcon />}
        </button>
      </div>

      <div
        className={`fixed bottom-24 right-6 z-[998] w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <header className="flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-t-2xl border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center">Ability IT AI Assistant</h3>
        </header>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center"><BotIcon /></div>}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center"><BotIcon /></div>
                 <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
             <div ref={messagesEndRef} />
          </div>
           {showQuickReplies && (
            <div className="mt-4 flex flex-wrap justify-start gap-2 animate-fade-in-short">
              {lastMessage.quickReplies!.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => submitMessage(reply)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900/80 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 p-2">
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-slate-100 dark:bg-slate-700 border-transparent focus:border-transparent focus:ring-0 rounded-full px-4 py-2 text-sm"
              aria-label="Chat input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
            >
              <PaperAirplaneIcon />
            </button>
          </form>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-short {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-short {
          animation: fade-in-short 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
