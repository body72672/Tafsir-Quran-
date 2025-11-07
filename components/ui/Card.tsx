
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-slate-900/50 border border-amber-500/20 rounded-2xl shadow-lg shadow-amber-500/5 p-6 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
   