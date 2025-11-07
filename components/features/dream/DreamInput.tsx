
import React, { useState } from 'react';
import { interpretDream } from '../../../services/geminiService';
import { DreamInterpretation } from '../../../types';
import Spinner from '../../ui/Spinner';
import Card from '../../ui/Card';

interface DreamInputProps {
  onInterpret: (interpretation: DreamInterpretation) => void;
}

export const DreamInput: React.FC<DreamInputProps> = ({ onInterpret }) => {
  const [dream, setDream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interpretationResult, setInterpretationResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setInterpretationResult(null);

    try {
      const result = await interpretDream(dream);
      const newInterpretation: DreamInterpretation = {
        id: new Date().toISOString(),
        dream,
        interpretation: result,
        timestamp: new Date().toLocaleString('ar-EG'),
      };
      onInterpret(newInterpretation);
      setInterpretationResult(result);
      setDream('');
    } catch (err) {
      setError('حدث خطأ ما. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="مثال: رأيت في المنام نورًا يخرج من كتاب..."
          className="w-full h-32 p-4 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors duration-300 resize-none text-slate-200 placeholder-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !dream.trim()}
          className="w-full flex justify-center items-center bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'فسّر الحلم'}
        </button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
      {interpretationResult && (
         <div className="mt-6 p-4 border-t-2 border-amber-500/20">
            <h3 className="text-xl font-bold font-amiri text-amber-400 mb-2">تفسير حلمك:</h3>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{interpretationResult}</p>
        </div>
      )}
    </Card>
  );
};
   