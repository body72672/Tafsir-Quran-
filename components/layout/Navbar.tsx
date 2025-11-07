
import React from 'react';
import { Page } from '../../types';
import { BookOpen, Moon, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems = [
  { page: Page.Dream, label: 'تفسير الأحلام', icon: Moon },
  { page: Page.Quran, label: 'القرآن الكريم', icon: BookOpen },
  { page: Page.Adhkar, label: 'الأذكار', icon: ShieldCheck },
  { page: Page.Profile, label: 'ملفي الشخصي', icon: User },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-lg border-b border-amber-500/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Moon className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-amiri font-bold text-white">Tafsir Dream</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-lg">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`transition-colors duration-300 pb-2 ${
                  currentPage === item.page
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
   