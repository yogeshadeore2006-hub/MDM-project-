import React, { useState } from 'react';
import { Database, Search, Filter, ArrowUpDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { HistoryRecord } from '../types';

interface DataHistoryViewProps {
  historyRecords: HistoryRecord[];
  darkMode: boolean;
}

export const DataHistoryView: React.FC<DataHistoryViewProps> = ({ historyRecords, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sensorFilter, setSensorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extract unique sensors
  const sensorsList = ['All', ...Array.from(new Set(historyRecords.map(r => r.sensor)))];

  const filteredRecords = historyRecords.filter(record => {
    const matchesSearch = record.sensor.toLowerCase().includes(searchTerm.toLowerCase()) || record.time.includes(searchTerm);
    const matchesSensor = sensorFilter === 'All' || record.sensor === sensorFilter;
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesSensor && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.time.localeCompare(a.time);
    }
    return a.time.localeCompare(b.time);
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportCSV = () => {
    const headers = ['Time', 'Sensor', 'Temperature (°C)', 'Humidity (%)', 'AQI', 'CO2 (ppm)', 'Status'];
    const rows = filteredRecords.map(r => [r.time, r.sensor, r.temperature, r.humidity, r.aqi, r.co2, r.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ecosense_iot_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Database className="w-4 h-4" />
              <span>Telemetry Archive</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Sensor Data History</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Search, filter, sort, and export chronological sensor logs recorded across the wireless IoT network.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search time or sensor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border transition-colors outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>

          <div>
            <select
              value={sensorFilter}
              onChange={(e) => setSensorFilter(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs border transition-colors outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              {sensorsList.map(s => <option key={s} value={s}>Sensor: {s}</option>)}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs border transition-colors outline-none ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">Status: All Statuses</option>
              <option value="Normal">Normal</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
            <span className="text-slate-400">Sort Time:</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400"
            >
              <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b font-semibold uppercase tracking-wider text-[11px] ${
                darkMode ? 'bg-slate-800/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4">Sensor Node</th>
                <th className="py-3.5 px-4">Temperature</th>
                <th className="py-3.5 px-4">Humidity</th>
                <th className="py-3.5 px-4">AQI</th>
                <th className="py-3.5 px-4">CO₂</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching sensor history records found.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((rec) => (
                  <tr key={rec.id} className={`transition-colors ${
                    darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-emerald-50/40'
                  }`}>
                    <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">{rec.time}</td>
                    <td className="py-3.5 px-4 font-semibold">{rec.sensor}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-rose-500">{rec.temperature} °C</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-500">{rec.humidity} %</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-teal-500">{rec.aqi} AQI</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-purple-500">{rec.co2} ppm</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.status === 'Normal' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-slate-600 dark:text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold px-2">Page {currentPage} of {totalPages || 1}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-slate-600 dark:text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
