import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, Type } from '@google/genai';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import XIcon from './icons/XIcon';
import BotIcon from './icons/BotIcon';
import ArrowPathIcon from './icons/ArrowPathIcon';

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
    },
    serviceRecommendation: {
        type: Type.STRING,
        description: "If the response is about a specific AbilityTech service, provide the exact service title here (e.g., 'Managed IT Services'). Otherwise, leave empty."
    }
  },
  required: ['response', 'quickReplies']
};

const initialMessages: Message[] = [
  { 
    sender: 'bot', 
    text: "Hello there! 👋",
  },
  { 
    sender: 'bot', 
    text: "I'm the AbilityTech virtual assistant. I can answer questions about our services like Managed IT, Custom Software, and more. What can I help you find?",
    quickReplies: ['Cybersecurity', 'AI Solutions', 'UI/UX Design'] 
  }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  const initializeChat = () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are a helpful and friendly AI assistant for AbilityTech, a technology services company.
          Your role is to answer user questions about the company's services, provide information, and guide them to the right sections of the website.
          Keep your answers concise, professional, and helpful. You should be knowledgeable about managed IT services, cybersecurity solutions, software development, digital marketing, data analysis, cloud services, UI/UX design, AI & Machine Learning, Blockchain solutions, and other services offered by AbilityTech.
          If a user asks for contact information or wants to speak to a person, provide the following details:
          - Phone/WhatsApp: +254 798 996332
          - Email: luckymunyao@gmail.com, munyaolucky@gmail.com, munyaolucky14@gmail.com
          You can also direct them to the contact form or callback request feature on the website.
          If a user asks a question outside of your scope, politely state that you are an assistant for AbilityTech and can only answer questions related to its business.
          IMPORTANT: Your response MUST strictly be in JSON format, adhering to this schema: {"response": string, "quickReplies": string[], "serviceRecommendation": string}.
          The 'response' field should contain your conversational reply.
          The 'quickReplies' field should contain an array of 3-4 relevant, short (1-4 word) follow-up questions or topics a user might be interested in based on your response.
          The 'serviceRecommendation' field MUST be populated with the exact title of a specific AbilityTech service IF AND ONLY IF your response is directly about that service (e.g., "Managed IT Services"). Otherwise, this field MUST be an empty string "".`,
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });
      setMessages(initialMessages);
    } catch (error) {
      console.error("Failed to initialize Gemini API:", error);
      setMessages([
        { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }
      ]);
    }
  };

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      initializeChat();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => chatInputRef.current?.focus(), 100);
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
      let json;
      
      try {
        json = JSON.parse(responseText);
      } catch (parseError) {
        console.warn("Could not parse Gemini response as JSON. Response was:", responseText, parseError);
        throw new Error("Invalid JSON response from AI.");
      }
      
      // Validate the parsed JSON structure
      if (typeof json.response !== 'string' || !Array.isArray(json.quickReplies)) {
        console.warn("Gemini response is missing required fields or has incorrect types. Response was:", json);
        throw new Error("Missing or invalid required fields in AI response.");
      }

      const replies = json.quickReplies;

      // If a service is recommended, add it as the first quick reply
      if (json.serviceRecommendation && typeof json.serviceRecommendation === 'string' && json.serviceRecommendation.trim() !== '') {
          const recommendationText = json.serviceRecommendation.trim();
          // Avoid adding duplicates
          if (!replies.includes(recommendationText)) {
              replies.unshift(recommendationText);
          }
      }

      botResponse = {
        sender: 'bot',
        text: json.response,
        quickReplies: replies,
      };

    } catch (error) {
      console.error("Chatbot error:", error);
      botResponse = { 
          text: "I'm having a little trouble formulating a response right now. Could you please try rephrasing your question?", 
          sender: 'bot',
          quickReplies: ['Our Services', 'About Us', 'Contact Info']
      };
    } finally {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };
  
  const handleToggle = () => {
    const wasOpen = isOpen;
    setIsOpen(!wasOpen);
    if (wasOpen) {
        toggleButtonRef.current?.focus();
    }
  };

  const handleResetChat = () => {
    if (window.confirm("Are you sure you want to start a new conversation? Your current chat history will be lost.")) {
        chatRef.current = null;
        initializeChat();
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = lastMessage?.sender === 'bot' && lastMessage.quickReplies && lastMessage.quickReplies.length > 0 && !isLoading;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[999]">
        <button
          ref={toggleButtonRef}
          onClick={handleToggle}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          aria-expanded={isOpen}
          aria-controls="chatbot-window"
        >
          {isOpen ? <XIcon /> : <ChatBubbleIcon />}
        </button>
      </div>

      <div
        id="chatbot-window"
        className={`fixed bottom-24 right-6 z-[998] w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        role="dialog"
        aria-hidden={!isOpen}
        aria-labelledby="chatbot-title"
      >
        <header className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-t-2xl border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={handleResetChat}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-full"
            aria-label="Start new conversation"
            title="Start new conversation"
          >
            <ArrowPathIcon />
          </button>
          <h3 id="chatbot-title" className="text-lg font-bold text-slate-800 dark:text-white text-center">AbilityTech AI Assistant</h3>
        </header>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4" aria-live="polite">
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
              ref={chatInputRef}
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
