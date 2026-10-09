import React, { useState } from 'react';
import { Sliders, Fan, Droplet, Wind, Bell, CheckCircle2, Power } from 'lucide-react';
import { DeviceControl } from '../types';

interface DeviceControlsViewProps {
  controls: DeviceControl[];
  onToggleControl: (id: string) => void;
  darkMode: boolean;
}

export const DeviceControlsView: React.FC<DeviceControlsViewProps> = ({
  controls,
  onToggleControl,
  darkMode,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggle = (control: DeviceControl) => {
    onToggleControl(control.id);
    const newState = !control.state;
    const msg = `${control.name} ${newState ? 'activated successfully' : 'deactivated successfully'}.`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getControlIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fan': return <Fan className="w-6 h-6 text-cyan-500" />;
      case 'Droplet': return <Droplet className="w-6 h-6 text-blue-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-teal-500" />;
      case 'Bell': return <Bell className="w-6 h-6 text-amber-500" />;
      default: return <Sliders className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>Actuator & Relay Control</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">IoT Device Controls</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Simulate remote relay actions and actuator overrides connected to the wireless sensor network. (Demo Mode)
        </p>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {controls.map((control) => (
          <div
            key={control.id}
            className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className={`p-3 rounded-2xl ${
                    control.state 
                      ? 'bg-emerald-500/10 border border-emerald-500/30' 
                      : darkMode ? 'bg-slate-800' : 'bg-slate-100'
                  }`}>
                    {getControlIcon(control.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      {control.category}
                    </span>
                    <h3 className="font-bold text-base">{control.name}</h3>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  control.state 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {control.state ? 'ACTIVE / ON' : 'INACTIVE / OFF'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {control.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center space-x-1.5 font-mono">
                <Power className="w-3.5 h-3.5" />
                <span>ESP32 Relay Pin #0{controls.indexOf(control) + 1}</span>
              </span>

              <button
                onClick={() => handleToggle(control)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  control.state ? 'bg-emerald-600' : 'bg-slate-400'
                }`}
                role="switch"
                aria-checked={control.state}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    control.state ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
