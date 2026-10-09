import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { SensorNetworkView } from './components/SensorNetworkView';
import { AlertsView } from './components/AlertsView';
import { SensorLocationsView } from './components/SensorLocationsView';
import { DataHistoryView } from './components/DataHistoryView';
import { DeviceControlsView } from './components/DeviceControlsView';
import { AnalyticsView } from './components/AnalyticsView';
import { AboutProjectView } from './components/AboutProjectView';
import { Footer } from './components/Footer';

import { 
  initialSensors, 
  initialNodes, 
  initialAlerts, 
  initialHistoryRecords, 
  initialDeviceControls, 
  generateChartHistoryData 
} from './mockData';
import { SensorMetric, IoTNode, EnvironmentalAlert, HistoryRecord, DeviceControl } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [sensors, setSensors] = useState<SensorMetric[]>(initialSensors);
  const [nodes, setNodes] = useState<IoTNode[]>(initialNodes);
  const [alerts, setAlerts] = useState<EnvironmentalAlert[]>(initialAlerts);
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>(initialHistoryRecords);
  const [deviceControls, setDeviceControls] = useState<DeviceControl[]>(initialDeviceControls);
  const [chartData, setChartData] = useState<any[]>(generateChartHistoryData(28.6, 64, 72, 421));

  // Real-time IoT simulation loop (every 3.5 seconds)
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // 1. Update sensors smoothly with realistic mini-fluctuations
      setSensors(prev => {
        return prev.map(sensor => {
          let delta = (Math.random() - 0.49) * 0.4;
          let newVal = +(sensor.value + delta).toFixed(1);

          // Keep within realistic bound ranges
          if (sensor.id === 'temperature') newVal = Math.max(20, Math.min(38, newVal));
          if (sensor.id === 'humidity') newVal = Math.max(30, Math.min(95, Math.round(newVal)));
          if (sensor.id === 'air_quality') newVal = Math.max(30, Math.min(180, Math.round(newVal)));
          if (sensor.id === 'co2') newVal = Math.max(380, Math.min(1100, Math.round(newVal)));
          if (sensor.id === 'water_level') newVal = Math.max(20, Math.min(95, Math.round(newVal)));
          if (sensor.id === 'noise') newVal = Math.max(40, Math.min(85, Math.round(newVal)));

          let status: 'Normal' | 'Warning' | 'Critical' = 'Normal';
          if (newVal > sensor.maxWarning || newVal < sensor.minWarning) {
            status = 'Warning';
          }

          return {
            ...sensor,
            value: newVal,
            status,
            lastUpdated: 'Just now',
            trend: delta > 0.05 ? 'up' : delta < -0.05 ? 'down' : 'stable',
            trendValue: `${delta > 0 ? '+' : ''}${delta.toFixed(1)}${sensor.unit}`,
          };
        });
      });

      // Find current temp and humidity for chart & nodes sync
      setSensors(currentSensors => {
        const tempObj = currentSensors.find(s => s.id === 'temperature')?.value || 28.6;
        const humObj = currentSensors.find(s => s.id === 'humidity')?.value || 64;
        const aqiObj = currentSensors.find(s => s.id === 'air_quality')?.value || 72;
        const co2Obj = currentSensors.find(s => s.id === 'co2')?.value || 421;

        // Update Node 01 & Node 02 readings live
        setNodes(prevNodes => prevNodes.map(node => {
          if (node.id === 'node-01') {
            return { ...node, reading: `${tempObj}°C / ${humObj}%`, lastComm: 'Just now' };
          }
          if (node.id === 'node-02') {
            return { ...node, reading: `${aqiObj} AQI / ${co2Obj} ppm`, lastComm: 'Just now' };
          }
          return { ...node, lastComm: 'Just now' };
        }));

        // Update chart data point
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setChartData(prev => [
          ...prev.slice(1),
          {
            time: timeStr,
            temperature: tempObj,
            humidity: humObj,
            air_quality: aqiObj,
            co2: co2Obj,
          }
        ]);

        // Add history record
        const newRec: HistoryRecord = {
          id: 'rec-' + Date.now(),
          time: timeStr,
          sensor: 'Node 01 – Main',
          temperature: tempObj,
          humidity: humObj,
          aqi: aqiObj,
          co2: co2Obj,
          status: tempObj > 35 ? 'Warning' : 'Normal',
        };
        setHistoryRecords(prev => [newRec, ...prev.slice(0, 49)]);

        return currentSensors;
      });

    }, 3500);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleRefresh = () => {
    setSensors(prev => prev.map(s => ({ ...s, lastUpdated: 'Just now' })));
    const t = sensors.find(s => s.id === 'temperature')?.value || 28.6;
    const h = sensors.find(s => s.id === 'humidity')?.value || 64;
    const a = sensors.find(s => s.id === 'air_quality')?.value || 72;
    const c = sensors.find(s => s.id === 'co2')?.value || 421;
    setChartData(generateChartHistoryData(t, h, a, c));
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const handleToggleControl = (id: string) => {
    setDeviceControls(prev => prev.map(c => c.id === id ? { ...c, state: !c.state } : c));
  };

  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        alertsCount={unreadAlertsCount}
      />

      {/* Main Content Layout Wrapper */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Header
          isLive={isLive}
          setIsLive={setIsLive}
          onRefresh={handleRefresh}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenMobileMenu={() => setMobileOpen(true)}
          unreadAlertsCount={unreadAlertsCount}
          onNavigateAlerts={() => setCurrentTab('alerts')}
        />

        <main className="flex-1 px-4 lg:px-8 py-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              sensors={sensors}
              chartData={chartData}
              darkMode={darkMode}
              onNavigateTab={(tab) => setCurrentTab(tab as NavTab)}
            />
          )}

          {currentTab === 'live' && (
            <DashboardView
              sensors={sensors}
              chartData={chartData}
              darkMode={darkMode}
              onNavigateTab={(tab) => setCurrentTab(tab as NavTab)}
            />
          )}

          {currentTab === 'network' && (
            <SensorNetworkView
              nodes={nodes}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onClearAll={handleClearAlerts}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'locations' && (
            <SensorLocationsView
              darkMode={darkMode}
            />
          )}

          {currentTab === 'history' && (
            <DataHistoryView
              historyRecords={historyRecords}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'controls' && (
            <DeviceControlsView
              controls={deviceControls}
              onToggleControl={handleToggleControl}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              sensors={sensors}
              historyRecords={historyRecords}
              chartData={chartData}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'about' && (
            <AboutProjectView
              darkMode={darkMode}
            />
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}
