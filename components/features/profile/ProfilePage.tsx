import React, { useState, useEffect } from 'react';
import { User as UserIcon, BookOpen, LogOut, Moon, ShieldCheck } from 'lucide-react';
import { User, DreamInterpretation } from '../../../types';
import Card from '../../ui/Card';

interface ProfilePageProps {
  user: User;
  interpretations: DreamInterpretation[];
  onLogout: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, interpretations, onLogout, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state with props when user object changes (e.g., on login)
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);
  
  const hasChanges = name.trim() !== user.name || email.trim() !== user.email;

  const handleSave = () => {
    if (hasChanges && name.trim() && email.trim()) {
      onUpdateUser({ name: name.trim(), email: email.trim() });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
       <h1 className="text-4xl md:text-5xl font-amiri font-bold text-amber-400 mb-2">الملف الشخصي</h1>
      
      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-amber-400/50 flex items-center justify-center bg-slate-700 overflow-hidden">
                {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    <UserIcon className="w-12 h-12 text-slate-400" />
                )}
            </div>
            <div className="flex-grow w-full space-y-4">
                <div className="w-full">
                    <label htmlFor="userName" className="block text-sm text-slate-400 mb-1">الاسم</label>
                    <input
                        id="userName"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setIsSaved(false);
                        }}
                        className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-xl font-bold text-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
                <div className="w-full">
                     <label htmlFor="userEmail" className="block text-sm text-slate-400 mb-1">البريد الإلكتروني</label>
                     <input
                        id="userEmail"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsSaved(false);
                        }}
                        className="w-full p-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-4 border-t border-slate-700 pt-4">
            {isSaved && <p className="text-green-400 text-sm">تم حفظ التغييرات بنجاح!</p>}
            <button
                onClick={handleSave}
                disabled={!hasChanges || !name.trim() || !email.trim()}
                className="bg-amber-500 text-slate-900 font-bold py-2 px-5 rounded-lg hover:bg-amber-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                حفظ التغييرات
            </button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-amber-400 mb-4">إحصائياتي</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <Moon className="mx-auto text-amber-300 mb-2" size={32} />
                <p className="text-2xl font-bold text-white">{interpretations.length}</p>
                <p className="text-slate-400">حلم تم تفسيره</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <BookOpen className="mx-auto text-amber-300 mb-2" size={32} />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-slate-400">سورة تمت قراءتها</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <ShieldCheck className="mx-auto text-amber-300 mb-2" size={32} />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-slate-400">مرة تم قراءة الأذكار</p>
            </div>
        </div>
      </Card>

      <div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 bg-red-600/80 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-500 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};