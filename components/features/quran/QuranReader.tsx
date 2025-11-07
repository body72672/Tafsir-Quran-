import React, { useState, useRef, useEffect } from 'react';
import { Surah } from '../../../types';
import { Play, Pause } from 'lucide-react';
import Card from '../../ui/Card';

interface QuranReaderProps {
  surah: Surah;
  onBack: () => void;
}

// Updated reciters with full server URLs to fix playback issues
const reciters = [
  { name: 'سعد الغامدي', url: 'https://server7.mp3quran.net/s_gmd' },
  { name: 'مشاري العفاسي', url: 'https://server8.mp3quran.net/afs' },
  { name: 'عبدالباسط عبدالصمد', url: 'https://server10.mp3quran.net/basit' },
  { name: 'ماهر المعيقلي', url: 'https://server12.mp3quran.net/maher' },
  { name: 'عبدالرحمن السديس', url: 'https://server11.mp3quran.net/sds' },
];

const AudioPlayer: React.FC<{ audioSrc: string }> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // More robust play/pause toggle that directly controls the audio element
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused || audioRef.current.ended) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };
  
  // Effect to handle audio source changes
  useEffect(() => {
    if (audioRef.current) {
      setIsPlaying(false);
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [audioSrc]);

  // Effect to sync component state with the audio element's actual state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
      <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
      <button onClick={togglePlayPause} className="p-3 bg-amber-500 text-slate-900 rounded-full hover:bg-amber-400 transition-colors">
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  )
}

export const QuranReader: React.FC<QuranReaderProps> = ({ surah, onBack }) => {
  // State now holds the full URL of the selected reciter
  const [selectedReciterUrl, setSelectedReciterUrl] = useState(reciters[0].url);

  // Construct audio URL from the selected reciter's base URL
  const audioUrl = `${selectedReciterUrl}/${String(surah.number).padStart(3, '0')}.mp3`;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-amber-400 hover:text-amber-300 transition-colors">
        &larr; العودة إلى قائمة السور
      </button>
      <Card>
        <div className="text-center mb-6 pb-4 border-b-2 border-amber-500/20">
          <h1 className="text-4xl font-amiri font-bold text-amber-400">{surah.name}</h1>
          <p className="text-slate-400">{surah.englishName}</p>
          <p className="text-sm text-slate-500 mt-2">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - {surah.ayahs.length} آيات</p>
        </div>
        
        <div className="sticky top-20 bg-slate-950/80 backdrop-blur-sm py-4 z-10 space-y-4">
            <div className="w-full md:w-1/2 mx-auto">
                 <label htmlFor="reciter-select" className="block text-center text-sm text-slate-400 mb-2">اختر القارئ</label>
                 <select
                    id="reciter-select"
                    value={selectedReciterUrl} // Bind to the full URL state
                    onChange={(e) => setSelectedReciterUrl(e.target.value)} // Update the full URL state
                    className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                 >
                    {reciters.map(reciter => (
                        // Use URL for key and value for uniqueness and direct state update
                        <option key={reciter.url} value={reciter.url}>{reciter.name}</option>
                    ))}
                 </select>
            </div>
          <AudioPlayer audioSrc={audioUrl} />
        </div>

        <div className="space-y-8 text-2xl leading-loose font-amiri text-right text-slate-200 pt-4">
           {surah.number !== 1 && surah.number !== 9 && (
             <p className="text-center text-xl mb-8">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
           )}
          {surah.ayahs.map((ayah) => (
            <p key={ayah.number}>
              {ayah.text} <span className="text-amber-400 text-lg mx-1">({ayah.numberInSurah})</span>
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
};