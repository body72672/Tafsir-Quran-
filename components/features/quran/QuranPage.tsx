import React, { useState, useEffect } from 'react';
import { Surah } from '../../../types';
import { QuranReader } from './QuranReader';
import { Loader } from 'lucide-react';

export const QuranPage: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('/data/quran_surahs.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSurahs(data as Surah[]);
      } catch (error) {
        console.error("Failed to load surahs data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-amber-400" size={48} /></div>;
  }
  
  if (selectedSurah) {
    return <QuranReader surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-amiri font-bold text-amber-400 mb-2">القرآن الكريم</h1>
      <p className="text-slate-400 text-lg">اختر السورة التي تود قراءتها أو الاستماع إليها.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => setSelectedSurah(surah)}
            className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/70 cursor-pointer transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="flex items-center justify-center w-10 h-10 bg-slate-800 text-amber-400 rounded-md font-bold">{surah.number}</span>
                <div>
                  <h2 className="text-lg font-bold text-white">{surah.name}</h2>
                  <p className="text-sm text-slate-400">{surah.englishName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-amiri text-2xl text-amber-300">{surah.name}</p>
                 <p className="text-xs text-slate-500">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.ayahs.length} آيات</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};