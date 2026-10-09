import React from 'react';
import { Leaf, Radio } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`mt-12 py-6 px-4 lg:px-8 border-t text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
    }`}>
      <div className="flex items-center space-x-2">
        <Leaf className="w-4 h-4 text-emerald-500" />
        <span className="font-bold text-slate-700 dark:text-slate-200">EcoSense IoT</span>
        <span>|</span>
        <span>Wireless Environmental Monitoring System</span>
        <span>|</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">College Project</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="font-mono">ESP32 Gateway v2.4 • Simulated IoT Demo</span>
        </div>
      </div>
    </footer>
  );
};
