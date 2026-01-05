import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm">
             <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            ACCOUNTIBL
          </span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Audit Logs</a>
          <a href="#" className="hover:text-white transition-colors">Policies</a>
          <a href="#" className="hover:text-white transition-colors">Settings</a>
          <div className="pl-6 border-l border-zinc-800 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             <span className="text-zinc-500 font-mono text-xs">MAINNET: ACTIVE</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
