import React from 'react';
import { BarChart3, TrendingUp, Thermometer, Droplets, Wind, CloudFog, Activity, Bell, Cpu } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { SensorMetric, HistoryRecord } from '../types';

interface AnalyticsViewProps {
  sensors: SensorMetric[];
  historyRecords: HistoryRecord[];
  chartData: any[];
  darkMode: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  sensors,
  historyRecords,
  chartData,
  darkMode,
}) => {
  // Calculations
  const temps = historyRecords.map(r => r.temperature);
  const humidities = historyRecords.map(r => r.humidity);
  const aqis = historyRecords.map(r => r.aqi);
  const co2s = historyRecords.map(r => r.co2);

  const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
  const avgHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length);
  const avgAqi = Math.round(aqis.reduce((a, b) => a + b, 0) / aqis.length);
  const avgCo2 = Math.round(co2s.reduce((a, b) => a + b, 0) / co2s.length);

  const highestTemp = Math.max(...temps);
  const lowestTemp = Math.min(...temps);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Statistical Analysis</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Environmental Analytics & Statistics</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Comprehensive statistical breakdown of wireless sensor telemetry, including averages, extremes, and historical trends.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">Avg Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgTemp} °C</div>
          <div className="text-[11px] text-emerald-500 mt-1">Normal Range</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">Avg Humidity</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgHumidity} %</div>
          <div className="text-[11px] text-emerald-500 mt-1">Optimal</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">Avg Air Quality</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgAqi} AQI</div>
          <div className="text-[11px] text-emerald-500 mt-1">Good Quality</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">Avg CO₂ Level</span>
            <CloudFog className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgCo2} ppm</div>
          <div className="text-[11px] text-emerald-500 mt-1">Safe Level</div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Highest Recorded Temp</div>
            <div className="text-xl font-bold text-rose-500 mt-1">{highestTemp} °C</div>
          </div>
          <Thermometer className="w-8 h-8 text-rose-500/20" />
        </div>

        <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Lowest Recorded Temp</div>
            <div className="text-xl font-bold text-blue-500 mt-1">{lowestTemp} °C</div>
          </div>
          <Droplets className="w-8 h-8 text-blue-500/20" />
        </div>

        <div className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Active IoT Nodes</div>
            <div className="text-xl font-bold text-emerald-500 mt-1">6 / 6 Online</div>
          </div>
          <Cpu className="w-8 h-8 text-emerald-500/20" />
        </div>
      </div>

      {/* Temperature & Humidity Trend Area Chart */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-lg font-bold tracking-tight mb-1">Temperature & Humidity Historical Trend</h3>
        <p className="text-xs text-slate-400 mb-6">Overlay correlation between ambient temperature and relative humidity</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="time" stroke={darkMode ? '#94a3b8' : '#64748b'} fontSize={11} tickLine={false} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff', 
                  borderColor: darkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '0.75rem',
                  color: darkMode ? '#f8fafc' : '#0f172a',
                  fontSize: '12px'
                }} 
              />
              <Area type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" />
              <Area type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorHum)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
