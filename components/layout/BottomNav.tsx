
import React from 'react';
import { Page } from '../../types';
import { BookOpen, Moon, ShieldCheck, User } from 'lucide-react';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems = [
  { page: Page.Dream, label: 'الأحلام', icon: Moon },
  { page: Page.Quran, label: 'القرآن', icon: BookOpen },
  { page: Page.Adhkar, label: 'الأذكار', icon: ShieldCheck },
  { page: Page.Profile, label: 'ملفي', icon: User },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-amber-500/20 p-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-300 w-20 ${
              currentPage === item.page ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
   