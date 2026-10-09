import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudFog, 
  Waves, 
  Volume2, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  AlertTriangle, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { SensorMetric, SensorType } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DashboardViewProps {
  sensors: SensorMetric[];
  chartData: any[];
  darkMode: boolean;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  sensors,
  chartData,
  darkMode,
  onNavigateTab,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<SensorType>('temperature');

  const getSensorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Thermometer': return <Thermometer className="w-4 h-4 text-rose-500" />;
      case 'Droplets': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'Wind': return <Wind className="w-4 h-4 text-teal-500" />;
      case 'CloudFog': return <CloudFog className="w-4 h-4 text-purple-500" />;
      case 'Waves': return <Waves className="w-4 h-4 text-cyan-500" />;
      case 'Volume2': return <Volume2 className="w-4 h-4 text-amber-500" />;
      default: return <Activity className="w-4 h-4 text-emerald-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-rose-500" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-emerald-500" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  const calculateHealthScore = () => {
    let score = 92;
    sensors.forEach(s => {
      if (s.status === 'Warning') score -= 10;
      if (s.status === 'Critical') score -= 25;
    });
    return Math.max(50, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();
  const getHealthStatus = (score: number) => {
    if (score >= 80) return { label: 'GOOD', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 65) return { label: 'MODERATE', color: 'text-teal-500 bg-teal-500/10 border-teal-500/20' };
    if (score >= 50) return { label: 'WARNING', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
    return { label: 'CRITICAL', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
  };

  const healthStatus = getHealthStatus(healthScore);

  const getMetricKey = (type: SensorType) => {
    switch (type) {
      case 'temperature': return { key: 'temperature', name: 'Temperature (°C)', color: '#f43f5e' };
      case 'humidity': return { key: 'humidity', name: 'Humidity (%)', color: '#3b82f6' };
      case 'air_quality': return { key: 'air_quality', name: 'Air Quality (AQI)', color: '#14b8a6' };
      case 'co2': return { key: 'co2', name: 'CO₂ (ppm)', color: '#a855f7' };
      default: return { key: 'temperature', name: 'Temperature (°C)', color: '#f43f5e' };
    }
  };

  const activeMetricMeta = getMetricKey(selectedMetric);

  return (
    <div className="space-y-5">
      {/* Environmental Health Overview Bar */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${healthStatus.color}`}>
              {healthStatus.label}
            </span>
            <span className="text-[11px] font-mono text-slate-400">STATUS MONITORING</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            Environmental Health: <span className="text-emerald-600 dark:text-emerald-400">{healthStatus.label}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 leading-none">
              {healthScore}<span className="text-xs text-slate-400 font-sans">/100</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Health Score</div>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-0.5 text-[11px] font-mono">
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>5 Active</span>
            </div>
            <div className="flex items-center space-x-1 text-amber-500">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>1 Warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live Sensor Telemetry</span>
          </h3>
          <button 
            onClick={() => onNavigateTab('network')}
            className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400 flex items-center space-x-1"
          >
            <span>Sensor Network</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className={`p-4 rounded-xl border transition-all hover:border-emerald-500/40 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    {getSensorIcon(sensor.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs">{sensor.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{sensor.lastUpdated}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  sensor.status === 'Normal' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {sensor.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-mono font-bold tracking-tight">{sensor.value}</span>
                  <span className="text-xs text-slate-400 font-mono">{sensor.unit}</span>
                </div>

                <div className="flex items-center space-x-1 text-[11px] font-mono">
                  {getTrendIcon(sensor.trend)}
                  <span className={sensor.trend === 'up' ? 'text-rose-500' : sensor.trend === 'down' ? 'text-emerald-500' : 'text-slate-400'}>
                    {sensor.trendValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Chart Section */}
      <div className={`p-5 rounded-xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-sm">Telemetry Stream (Last 30 Readings)</h3>
            <p className="text-[11px] text-slate-400">Real-time interval sampling</p>
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            {(['temperature', 'humidity', 'air_quality', 'co2'] as SensorType[]).map((type) => {
              const labels: Record<SensorType, string> = {
                temperature: 'Temp',
                humidity: 'Humidity',
                air_quality: 'AQI',
                co2: 'CO₂',
                water_level: 'Water',
                noise: 'Noise',
              };
              const isSelected = selectedMetric === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedMetric(type)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    isSelected 
                      ? 'bg-emerald-600 text-white font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {labels[type]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e293b' : '#f1f5f9'} />
              <XAxis dataKey="time" stroke={darkMode ? '#64748b' : '#94a3b8'} fontSize={10} tickLine={false} />
              <YAxis stroke={darkMode ? '#64748b' : '#94a3b8'} fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                  borderColor: darkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '0.5rem',
                  color: darkMode ? '#f8fafc' : '#0f172a',
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey={activeMetricMeta.key} 
                name={activeMetricMeta.name} 
                stroke={activeMetricMeta.color} 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: activeMetricMeta.color }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
