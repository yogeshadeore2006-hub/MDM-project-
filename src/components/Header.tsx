import React, { useState, useEffect } from 'react';
import { Leaf, RefreshCw, Sun, Moon, Menu, Bell, Radio } from 'lucide-react';

interface HeaderProps {
  isLive: boolean;
  setIsLive: (val: boolean) => void;
  onRefresh: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenMobileMenu: () => void;
  unreadAlertsCount: number;
  onNavigateAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLive,
  setIsLive,
  onRefresh,
  darkMode,
  setDarkMode,
  onOpenMobileMenu,
  unreadAlertsCount,
  onNavigateAlerts,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 border-b backdrop-blur-md transition-colors ${
      darkMode ? 'bg-slate-950/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
    }`}>
      {/* Left */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-base tracking-tight">EcoSense IoT</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded border border-emerald-500/20">
                LIVE DEMO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: System Status & Time */}
      <div className="hidden md:flex items-center space-x-6 text-xs">
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono font-medium text-slate-700 dark:text-slate-300">NODE-MESH: ONLINE</span>
        </div>

        <div className="text-slate-500 font-mono">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Live Toggle */}
        <div className={`hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md border text-xs font-mono ${
          isLive 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
        }`}>
          <span>STREAM:</span>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
              isLive ? 'bg-emerald-600' : 'bg-slate-500'
            }`}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ${
              isLive ? 'translate-x-3' : 'translate-x-0'
            }`} />
          </button>
          <span className="font-bold">{isLive ? 'ON' : 'OFF'}</span>
        </div>

        <button
          onClick={onRefresh}
          title="Refresh Data"
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={onNavigateAlerts}
          title="Alerts"
          className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute 1 top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
