
import React, { useState } from 'react';
import { DreamInterpretation } from '../../../types';
import { DreamInput } from './DreamInput';
import { DreamHistory } from './DreamHistory';

interface DreamPageProps {
  addInterpretation: (interpretation: DreamInterpretation) => void;
  pastInterpretations: DreamInterpretation[];
}

export const DreamPage: React.FC<DreamPageProps> = ({ addInterpretation, pastInterpretations }) => {
  const [currentInterpretation, setCurrentInterpretation] = useState<DreamInterpretation | null>(null);

  const handleNewInterpretation = (interpretation: DreamInterpretation) => {
    addInterpretation(interpretation);
    setCurrentInterpretation(interpretation);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-amiri font-bold text-amber-400 mb-2">تفسير الأحلام</h1>
        <p className="text-slate-400 text-lg">اكتب حلمك ودع نور القرآن يرشدك إلى معناه.</p>
      </div>
      <DreamInput onInterpret={handleNewInterpretation} />
      <DreamHistory interpretations={pastInterpretations} />
    </div>
  );
};
   