import React, { useState } from 'react';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle, Info, Filter, Trash2, CheckCheck } from 'lucide-react';
import { EnvironmentalAlert } from '../types';

interface AlertsViewProps {
  alerts: EnvironmentalAlert[];
  onAcknowledgeAlert: (id: string) => void;
  onClearAll: () => void;
  darkMode: boolean;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onAcknowledgeAlert,
  onClearAll,
  darkMode,
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  const filteredAlerts = alerts.filter(alert => {
    if (severityFilter === 'All') return true;
    return alert.severity === severityFilter;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Critical</span>
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Warning</span>
          </span>
        );
      case 'Info':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Info</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-500 font-semibold text-xs uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 animate-bounce" />
              <span>Threshold Protection System</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Environmental Alerts & Notifications</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Automated notifications triggered when sensor readings cross predefined environmental safety thresholds.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClearAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-500">Filter by severity:</span>
          {['All', 'Critical', 'Warning', 'Info'].map((level) => (
            <button
              key={level}
              onClick={() => setSeverityFilter(level)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                severityFilter === level
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
          }`}>
            <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
            <h4 className="font-bold text-base text-slate-800 dark:text-white">No active alerts found</h4>
            <p className="text-xs text-slate-400 mt-1">All sensor readings are currently within normal operating parameters.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {alert.severity === 'Critical' ? (
                    <ShieldAlert className="w-6 h-6 text-rose-500" />
                  ) : alert.severity === 'Warning' ? (
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Info className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-bold text-sm">{alert.sensorName}</h4>
                    {getSeverityBadge(alert.severity)}
                    <span className="text-xs text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                {alert.acknowledged ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCheck className="w-4 h-4" />
                    <span>Acknowledged</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
