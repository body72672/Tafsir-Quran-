
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { askAssistant } from '../../../services/geminiService';
import Spinner from '../../ui/Spinner';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAssistant(input);
      const botMessage: Message = { text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: 'عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl shadow-amber-500/10">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-amber-400 font-amiri">المساعد الذكي</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Bot className="text-amber-400" size={20} />
                </div>
              )}
              <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-amber-500 text-slate-900 rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <User className="text-slate-300" size={20} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                 <Bot className="text-amber-400" size={20} />
              </div>
              <div className="bg-slate-800 p-3 rounded-lg flex items-center">
                <Spinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل عن أي شيء..."
              className="flex-1 p-2 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 disabled:bg-slate-600"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
   