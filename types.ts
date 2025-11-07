export enum Page {
  Dream = 'Dream',
  Quran = 'Quran',
  Adhkar = 'Adhkar',
  Profile = 'Profile',
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface DreamInterpretation {
  id: string;
  dream: string;
  interpretation: string;
  verse?: {
    text: string;
    surah: string;
    number: number;
  };
  timestamp: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}

export interface Dhikr {
  category: string;
  count: string;
  description: string;
  reference: string;
  content: string;
  audio: string;
}