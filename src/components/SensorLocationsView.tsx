import React, { useState } from 'react';
import { MapPin, Building2, Trees, Droplet, Car, FlaskConical, Activity, Thermometer, Wind, CheckCircle2, AlertTriangle } from 'lucide-react';
import { locationNodes } from '../mockData';
import { LocationNodeData } from '../types';

interface SensorLocationsViewProps {
  darkMode: boolean;
}

export const SensorLocationsView: React.FC<SensorLocationsViewProps> = ({ darkMode }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationNodeData>(locationNodes[0]);

  const getLocationIcon = (name: string) => {
    if (name.includes('Main')) return <Building2 className="w-5 h-5 text-emerald-500" />;
    if (name.includes('Garden')) return <Trees className="w-5 h-5 text-teal-500" />;
    if (name.includes('Water')) return <Droplet className="w-5 h-5 text-blue-500" />;
    if (name.includes('Parking')) return <Car className="w-5 h-5 text-amber-500" />;
    return <FlaskConical className="w-5 h-5 text-purple-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <MapPin className="w-4 h-4" />
          <span>Interactive Schematic Map</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Sensor Locations & Campus Layout</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Click any active marker on the campus schematic to inspect real-time sensor node telemetry and zone status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG / CSS Schematic Map */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border relative flex flex-col items-center justify-center min-h-[420px] overflow-hidden ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800 text-white shadow-sm'
        }`}>
          {/* Background grid pattern & radar styling */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Campus Schematic v2.4 (Live Feed)</span>
          </div>

          {/* SVG Connecting paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-emerald-500" strokeWidth="1.5" strokeDasharray="4 4">
            <line x1="30%" y1="35%" x2="50%" y2="50%" />
            <line x1="70%" y1="25%" x2="50%" y2="50%" />
            <line x1="20%" y1="75%" x2="50%" y2="50%" />
            <line x1="75%" y1="70%" x2="50%" y2="50%" />
          </svg>

          {/* Location Nodes Markers */}
          <div className="relative w-full h-80 max-w-lg my-auto">
            {locationNodes.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ top: `${loc.coordinates.y}%`, left: `${loc.coordinates.x}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center focus:outline-none transition-all duration-300`}
                >
                  <div className={`relative p-3 rounded-2xl border shadow-xl flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-emerald-500 text-white border-white scale-125 ring-4 ring-emerald-500/40' 
                      : loc.status === 'Warning'
                        ? 'bg-amber-500 text-white border-amber-300 animate-pulse'
                        : 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                  }`}>
                    {getLocationIcon(loc.name)}
                    
                    {/* Ping ring */}
                    <span className="absolute -inset-1 rounded-2xl bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />
                  </div>

                  <div className="mt-2 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shadow-md text-white group-hover:border-emerald-500 transition-colors">
                    {loc.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-4 right-4 text-[11px] text-slate-400 font-mono">
            Grid Coordinates: Active & Synced
          </div>
        </div>

        {/* Selected Location Details Card */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {getLocationIcon(selectedLocation.name)}
                </div>
                <div>
                  <h3 className="font-bold text-base">{selectedLocation.name}</h3>
                  <span className="text-xs text-slate-400">{selectedLocation.type}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedLocation.status === 'Normal' 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {selectedLocation.status}
              </span>
            </div>

            <div className="space-y-4 my-6">
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs text-slate-400 mb-1">Temperature</div>
                  <div className="text-lg font-bold text-rose-500 flex items-center space-x-1">
                    <Thermometer className="w-4 h-4" />
                    <span>{selectedLocation.temperature}°C</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs text-slate-400 mb-1">Humidity</div>
                  <div className="text-lg font-bold text-blue-500 flex items-center space-x-1">
                    <Droplet className="w-4 h-4" />
                    <span>{selectedLocation.humidity}%</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs text-slate-400 mb-1">Air Quality</div>
                  <div className="text-lg font-bold text-teal-500 flex items-center space-x-1">
                    <Wind className="w-4 h-4" />
                    <span>{selectedLocation.aqi} AQI</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs text-slate-400 mb-1">CO₂ Level</div>
                  <div className="text-lg font-bold text-purple-500 flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>{selectedLocation.co2} ppm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Active Sensors: <strong className="text-emerald-600 dark:text-emerald-400">{selectedLocation.activeSensors} Units</strong></span>
            <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fully Operational</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
