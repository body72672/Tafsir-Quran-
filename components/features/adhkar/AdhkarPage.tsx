import React, { useState, useEffect } from 'react';
import { Dhikr } from '../../../types';
import Card from '../../ui/Card';
import { Play, Sunrise, Sunset, Loader } from 'lucide-react';

const DhikrCard: React.FC<{ dhikr: Dhikr }> = ({ dhikr }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  
  return (
    <Card className="flex flex-col">
      <p className="text-xl font-amiri leading-relaxed mb-4 text-slate-200 flex-grow">{dhikr.content}</p>
      <div className="border-t border-slate-700 pt-4 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={playAudio} className="p-2 bg-slate-800 rounded-full hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-colors">
              <Play size={20} />
            </button>
            <span className="text-lg font-bold text-amber-400">{dhikr.count}</span>
          </div>
          <p className="text-xs text-slate-500">{dhikr.reference}</p>
        </div>
        <audio ref={audioRef} src={dhikr.audio} preload="none" className="hidden" />
      </div>
    </Card>
  );
};

export const AdhkarPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [morningAdhkar, setMorningAdhkar] = useState<Dhikr[]>([]);
  const [eveningAdhkar, setEveningAdhkar] = useState<Dhikr[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdhkar = async () => {
      try {
        const response = await fetch('/data/adhkar.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const adhkarData = await response.json();
        setMorningAdhkar(adhkarData.filter((d: Dhikr) => d.category === "أذكار الصباح"));
        setEveningAdhkar(adhkarData.filter((d: Dhikr) => d.category === "أذكار المساء"));
      } catch (error) {
        console.error("Failed to load adhkar data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdhkar();
  }, []);

  const activeAdhkar = activeTab === 'morning' ? morningAdhkar : eveningAdhkar;

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-amber-400" size={48} /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-amiri font-bold text-amber-400 mb-2">أذكار اليوم والليلة</h1>
      <p className="text-slate-400 text-lg">حصّن يومك بذكر الله.</p>
      
      <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
        <button
          onClick={() => setActiveTab('morning')}
          className={`w-1/2 py-3 rounded-md text-lg font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'morning' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700/50'}`}
        >
          <Sunrise size={20} />
          <span>أذكار الصباح</span>
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={`w-1/2 py-3 rounded-md text-lg font-bold transition-colors flex items-center justify-center space-x-2 ${activeTab === 'evening' ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700/50'}`}
        >
          <Sunset size={20} />
          <span>أذكار المساء</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeAdhkar.map((dhikr, index) => (
          <DhikrCard key={index} dhikr={dhikr} />
        ))}
      </div>
    </div>
  );
};