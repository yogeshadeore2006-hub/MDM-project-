import React from 'react';
import { Cpu, Battery, Wifi, Radio, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { IoTNode } from '../types';

interface SensorNetworkViewProps {
  nodes: IoTNode[];
  darkMode: boolean;
}

export const SensorNetworkView: React.FC<SensorNetworkViewProps> = ({ nodes, darkMode }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Online</span>
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Warning</span>
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Offline</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-emerald-500';
    if (battery > 20) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>LoRaWAN Mesh Network</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Wireless Sensor Network</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real-time telemetry and health diagnostics for all deployed virtual IoT sensor nodes.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Total Nodes: <span className="font-bold">{nodes.length}</span> (5 Active, 1 Warning)
            </div>
          </div>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${
                    node.status === 'Online' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : node.status === 'Warning' 
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{node.name}</h4>
                    <span className="text-xs text-slate-400">{node.location}</span>
                  </div>
                </div>
                {getStatusBadge(node.status)}
              </div>

              {/* Sensor Reading Box */}
              <div className={`my-4 p-3 rounded-xl border ${
                darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Primary Sensor: {node.primarySensor}
                </div>
                <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {node.reading}
                </div>
              </div>
            </div>

            {/* Node Stats: Battery & Signal */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Battery className={`w-4 h-4 ${getBatteryColor(node.battery)}`} />
                <span>Battery: <strong className={getBatteryColor(node.battery)}>{node.battery}%</strong></span>
              </div>

              <div className="flex items-center space-x-1.5" title="Signal Strength">
                <Wifi className="w-4 h-4 text-teal-500" />
                <span className="font-mono">{node.signal} dBm</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Last comm: {node.lastComm}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">ESP32-WROOM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
