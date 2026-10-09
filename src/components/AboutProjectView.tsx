import React from 'react';
import { Info, Cpu, Wifi, Cloud, LayoutDashboard, Bell, ArrowDown, ShieldCheck, Database, Sliders, Activity } from 'lucide-react';

interface AboutProjectViewProps {
  darkMode: boolean;
}

export const AboutProjectView: React.FC<AboutProjectViewProps> = ({ darkMode }) => {
  const features = [
    { title: 'Real-time Monitoring', desc: 'Continuous live telemetry collection across temperature, humidity, AQI, CO₂, water level, and noise.', icon: Activity },
    { title: 'Wireless Sensor Network', desc: 'Virtual LoRaWAN mesh network with 6 active IoT nodes featuring battery and signal diagnostics.', icon: Cpu },
    { title: 'Environmental Alerts', desc: 'Automated threshold checking generating instant warnings and critical notifications.', icon: Bell },
    { title: 'Data Visualization', desc: 'Interactive Recharts graphs showing real-time trends and historical analytics.', icon: LayoutDashboard },
    { title: 'Sensor Health Monitoring', desc: 'Battery percentage, signal strength (dBm), and last communication timestamp tracking.', icon: ShieldCheck },
    { title: 'Historical Data & CSV', desc: 'Searchable, filterable, sortable telemetry archive with one-click CSV export.', icon: Database },
    { title: 'Device Control Panel', desc: 'Simulated IoT actuator relays for cooling fans, water pumps, air purifiers, and alarms.', icon: Sliders },
    { title: 'Environmental Health Score', desc: 'Overall health calculation from 0 to 100 with categorical status (Good, Moderate, Warning, Critical).', icon: Wifi },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Info className="w-4 h-4" />
          <span>College Project Documentation</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">About EcoSense IoT</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Architecture overview, working flow diagram, and core feature specifications for the wireless environmental monitoring demo.
        </p>
      </div>

      {/* What is the project */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-lg font-bold mb-3">What is the project?</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          “EcoSense IoT is a wireless environmental monitoring system that collects environmental data from IoT sensors and displays it on a web dashboard in real time.”
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Designed specifically as an advanced college demonstration project, EcoSense IoT showcases how low-power microcontrollers (such as ESP32 and Arduino) communicate over wireless mesh protocols (LoRaWAN/Wi-Fi) to central cloud dashboards for automated environmental safety and climate regulation.
        </p>
      </div>

      {/* IoT Working Flow Diagram */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="text-lg font-bold mb-6 text-center">IoT Working Flow Diagram</h3>
        
        <div className="max-w-md mx-auto flex flex-col items-center space-y-3">
          {[
            { label: 'Environmental Sensors', sub: 'Temperature, Humidity, AQI, CO₂, Water Level, Noise', icon: Activity },
            { label: 'ESP32 / IoT Sensor Node', sub: 'Microcontroller analog/digital signal sampling', icon: Cpu },
            { label: 'Wireless Communication', sub: 'LoRaWAN / Wi-Fi Mesh Transmission', icon: Wifi },
            { label: 'IoT Gateway / Cloud', sub: 'Data packet ingestion & routing', icon: Cloud },
            { label: 'Web Dashboard', sub: 'React / Tailwind CSS frontend visualization', icon: LayoutDashboard },
            { label: 'User Monitoring & Alerts', sub: 'Threshold evaluation, notifications & control relays', icon: Bell },
          ].map((step, idx, arr) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className={`w-full p-4 rounded-xl border flex items-center space-x-4 transition-all ${
                  darkMode ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                }`}>
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{step.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{step.sub}</p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowDown className="w-5 h-5 text-emerald-500 animate-pulse my-1" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Project Features Cards */}
      <div>
        <h3 className="text-lg font-bold mb-4">Project Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm mb-1">{feat.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
