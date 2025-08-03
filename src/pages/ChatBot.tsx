import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined');
}
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Define the Message interface
interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;  // Add timestamp for message history
  id: string;       // Add unique identifier
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [
      { 
        text: "Hello! How can I help you today?", 
        isUser: false,
        timestamp: new Date(),
        id: 'welcome'
      }
    ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Auto-scroll chat to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Save messages to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
      id: `user-${Date.now()}`
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getAIResponse(input);
      const aiMessage = {
        text: response,
        isUser: false,
        timestamp: new Date(),
        id: `ai-${Date.now()}`
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        text: "Sorry, I couldn't get a response. Please try again.",
        isUser: false,
        timestamp: new Date(),
        id: `error-${Date.now()}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to call the OpenAI API
  const getAIResponse = async (userInput: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to get AI response: ${error.message}`);
      }
      throw new Error('An unknown error occurred while getting AI response');
    }
  };

  const clearChat = () => {
    setMessages([{
      text: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      id: 'welcome'
    }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Chat Assistant</h3>
            <div className="flex gap-2">
              <button 
                onClick={clearChat}
                className="text-gray-500 hover:text-gray-700"
                title="Clear chat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-6v.01M5 7V4a1 1 0 011-1h12a1 1 0 011 1v3" />
                </svg>
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${
                  msg.isUser
                    ? 'ml-auto bg-blue-600 text-white'
                    : 'mr-auto bg-gray-100 text-gray-800'
                } max-w-[80%] rounded-lg p-3`}
              >
                <div>{msg.text}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}