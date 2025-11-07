
import React from 'react';
import { DreamInterpretation } from '../../../types';
import Card from '../../ui/Card';
import { Clock } from 'lucide-react';

interface DreamHistoryProps {
  interpretations: DreamInterpretation[];
}

export const DreamHistory: React.FC<DreamHistoryProps> = ({ interpretations }) => {
  if (interpretations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-amiri font-bold text-amber-400">سجل الأحلام</h2>
      {interpretations.map((item) => (
        <Card key={item.id}>
          <div className="flex justify-between items-start mb-3">
             <p className="text-slate-400 italic text-sm">"{item.dream}"</p>
             <div className="flex items-center text-xs text-slate-500 space-x-1 shrink-0 ml-4">
                <Clock size={14}/>
                <span>{item.timestamp}</span>
             </div>
          </div>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed border-t border-slate-700 pt-3">{item.interpretation}</p>
        </Card>
      ))}
    </div>
  );
};
   