import React, { useState, useCallback } from 'react';
import { Page, DreamInterpretation, User } from './types';
import { DreamPage } from './components/features/dream/DreamPage';
import { QuranPage } from './components/features/quran/QuranPage';
import { AdhkarPage } from './components/features/adhkar/AdhkarPage';
import { ProfilePage } from './components/features/profile/ProfilePage';
import { LoginPage } from './components/features/auth/LoginPage';
import Layout from './components/layout/Layout';
import { AssistantModal } from './components/features/assistant/AssistantModal';
import { AssistantButton } from './components/features/assistant/AssistantButton';
import { signInWithGoogle, signOut } from './services/authService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dream);
  const [interpretations, setInterpretations] = useState<DreamInterpretation[]>([]);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
      setCurrentPage(Page.Dream);
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show an error message to the user
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut();
    setUser(null);
    setCurrentPage(Page.Dream);
    setInterpretations([]);
  }, []);
  
  const addInterpretation = useCallback((interpretation: DreamInterpretation) => {
    setInterpretations(prev => [interpretation, ...prev]);
  }, []);

  const handleUpdateUser = useCallback((updatedData: Partial<User>) => {
    if (user) {
      setUser(prevUser => ({ ...prevUser!, ...updatedData }));
    }
  }, [user]);

  const renderPage = () => {
    if (!user) return null;
    switch (currentPage) {
      case Page.Dream:
        return <DreamPage addInterpretation={addInterpretation} pastInterpretations={interpretations} />;
      case Page.Quran:
        return <QuranPage />;
      case Page.Adhkar:
        return <AdhkarPage />;
      case Page.Profile:
        return <ProfilePage user={user} interpretations={interpretations} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
      default:
        return <DreamPage addInterpretation={addInterpretation} pastInterpretations={interpretations} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </Layout>
      <AssistantButton onClick={() => setIsAssistantOpen(true)} />
      <AssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default App;