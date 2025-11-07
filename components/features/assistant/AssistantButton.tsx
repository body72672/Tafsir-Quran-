
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface AssistantButtonProps {
  onClick: () => void;
}

export const AssistantButton: React.FC<AssistantButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 md:bottom-8 right-8 bg-amber-500 text-slate-900 p-4 rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 transform hover:scale-110 transition-all duration-300 z-50"
      aria-label="افتح المساعد الذكي"
    >
      <MessageCircle size={28} />
    </button>
  );
};
   