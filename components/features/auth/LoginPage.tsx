import React, { useState } from 'react';
import { Moon } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => Promise<void>;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      await onLogin();
    } catch (error) {
      console.error("Login failed on page:", error);
      setIsLoading(false); // Reset loading state on failure
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4" style={{
      backgroundImage: 'radial-gradient(circle at top, #1e293b, #020617)',
    }}>
      <div className="text-center">
        <div className="inline-block p-6 bg-slate-900/50 rounded-full border-2 border-amber-400/50 mb-6 shadow-2xl shadow-amber-500/10">
            <Moon className="w-20 h-20 text-amber-400 animate-pulse" />
        </div>
        <h1 className="text-5xl font-amiri font-bold text-white mb-2">Tafsir Dream</h1>
        <p className="text-xl text-amber-300/80 mb-8 font-amiri">فسّر حلمك بنور القرآن</p>
        
        <div className="max-w-md mx-auto">
            <p className="text-slate-400 mb-10">
                تطبيق يجمع بين تفسير الأحلام من منظور القرآن الكريم، والأذكار اليومية، وقراءة القرآن، مع مساعد ذكاء اصطناعي للإجابة على أسئلتك.
            </p>
            <button
              onClick={handleLoginClick}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-white text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-slate-300 disabled:cursor-wait"
            >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M24 9.5c3.23 0 6.13 1.11 8.4 3.29l6.37-6.37C34.91 2.77 29.83 0 24 0 14.53 0 6.56 5.37 2.84 12.91l7.85 6.07C12.42 13.06 17.75 9.5 24 9.5z"></path>
                        <path fill="#34A853" d="M46.16 24.5c0-1.66-.15-3.27-.42-4.82H24v9.17h12.44c-.54 2.97-2.19 5.5-4.81 7.25l7.63 5.9C43.5 38.35 46.16 32 46.16 24.5z"></path>
                        <path fill="#FBBC05" d="M10.69 28.98C10.23 27.57 10 26.06 10 24.5s.23-3.07.69-4.48l-7.85-6.07C.96 17.58 0 20.9 0 24.5s.96 6.92 2.84 10.09l7.85-6.07z"></path>
                        <path fill="#EA4335" d="M24 48c5.83 0 10.91-1.92 14.53-5.18l-7.63-5.9c-1.93 1.3-4.4 2.08-7.25 2.08-6.25 0-11.58-3.56-13.31-8.39l-7.85 6.07C6.56 42.63 14.53 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                    <span>تسجيل الدخول باستخدام جوجل</span>
                  </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};