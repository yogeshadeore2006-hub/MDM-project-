export type SensorType = 'temperature' | 'humidity' | 'air_quality' | 'co2' | 'water_level' | 'noise';

export type SensorStatus = 'Normal' | 'Warning' | 'Critical';

export interface SensorMetric {
  id: SensorType;
  name: string;
  value: number;
  unit: string;
  status: SensorStatus;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  lastUpdated: string;
  icon: string;
  minWarning: number;
  maxWarning: number;
}

export interface IoTNode {
  id: string;
  name: string;
  location: string;
  status: 'Online' | 'Warning' | 'Offline';
  battery: number; // percentage 0-100
  signal: number; // dBm e.g. -65
  primarySensor: string;
  reading: string;
  lastComm: string;
}

export interface EnvironmentalAlert {
  id: string;
  sensorName: string;
  severity: 'Info' | 'Warning' | 'Critical';
  time: string;
  description: string;
  acknowledged: boolean;
}

export interface HistoryRecord {
  id: string;
  time: string;
  sensor: string;
  temperature: number;
  humidity: number;
  aqi: number;
  co2: number;
  status: SensorStatus;
}

export interface DeviceControl {
  id: string;
  name: string;
  icon: string;
  state: boolean;
  category: string;
  description: string;
}

export interface LocationNodeData {
  id: string;
  name: string;
  type: string;
  status: 'Normal' | 'Warning' | 'Critical';
  coordinates: { x: number; y: number }; // percentage for SVG map
  temperature: number;
  humidity: number;
  aqi: number;
  co2: number;
  activeSensors: number;
}
