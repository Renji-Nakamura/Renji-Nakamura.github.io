import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#F5F5F7] py-20 border-t border-[#E3E3E8]/60 text-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Column: Brand & Copyright */}
        <div>
          <p className="font-bold text-[#1D1D1F] tracking-tight mb-1 text-center md:text-left">
            Renji
          </p>
          <p className="text-xs text-[#86868B] font-normal text-center md:text-left">
            © {new Date().getFullYear()} Renji. 岩手県立大学 ソフトウェア情報学部 ソフトウェア情報学科
          </p>
        </div>

        {/* Right Column: Minimalist Action Links */}
        <div className="flex items-center space-x-8 font-medium">
          <a 
            href="https://github.com/Renji-Nakamura" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a 
            href="https://linkedin.com/in/renji" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a 
            href="mailto:contact@renji.dev" 
            className="group inline-flex items-center space-x-1.5 text-[#86868B] hover:text-[#0071E3] transition-colors"
          >
            <Mail size={16} />
            <span>お問い合わせ</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

      </div>
    </footer>
  );
}
