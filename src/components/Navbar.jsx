import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isDetail = location.pathname.includes('/project/');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F7] transition-all">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-lg font-bold tracking-tight text-[#1D1D1F] hover:opacity-80 transition-opacity outline-none">
            Renji Nakamura
          </Link>
          {isDetail && (
            <>
              <ChevronRight size={14} className="text-[#D2D2D7]" />
              <span className="text-xs font-medium text-[#86868B] truncate max-w-[120px] sm:max-w-none">
                Cafe Wagtail
              </span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 sm:space-x-8 text-sm font-medium text-[#86868B]">
          {isDetail ? (
            <Link to="/" className="hover:text-[#0071E3] text-[#0071E3] transition-colors font-semibold">
              トップへ戻る
            </Link>
          ) : (
            <>
              <button onClick={() => scrollToSection('hero')} className="hover:text-[#1D1D1F] transition-colors hidden sm:inline cursor-pointer">トップ</button>
              <button onClick={() => scrollToSection('stack')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">関心領域</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">主要プロジェクト</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-[#1D1D1F] transition-colors cursor-pointer">コンタクト</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
