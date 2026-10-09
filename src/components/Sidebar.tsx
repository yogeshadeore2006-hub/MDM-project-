import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Cpu, 
  Bell, 
  MapPin, 
  Database, 
  Sliders, 
  BarChart3, 
  Info, 
  X,
  Radio
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'live'
  | 'network'
  | 'alerts'
  | 'locations'
  | 'history'
  | 'controls'
  | 'analytics'
  | 'about';

interface SidebarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  darkMode: boolean;
  alertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  mobileOpen,
  setMobileOpen,
  darkMode,
  alertsCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Activity },
    { id: 'network', label: 'Sensor Network', icon: Cpu },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertsCount },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'history', label: 'Data History', icon: Database },
    { id: 'controls', label: 'Device Controls', icon: Sliders },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id as NavTab);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col border-r transition-all duration-200 transform
        ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b lg:hidden border-inherit">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm">EcoSense IoT</span>
          </div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : darkMode
                      ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded ${
                    isActive ? 'bg-white text-emerald-700' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 m-3 rounded-lg border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-[11px]">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-medium mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>LoRaWAN Mesh Active</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[10px]">
            6 IoT telemetry nodes online.
          </p>
        </div>
      </aside>
    </>
  );
};
