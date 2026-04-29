import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

/**
 * Charts Component
 * Comprehensive dashboard charts for health analytics
 * Includes Heart Rate Trends, Sugar Trends, Risk Distribution, and Recovery Analytics
 */

// Chart color palette
const COLORS = {
  primary: '#14b8a6',
  secondary: '#0ea5e9',
  accent: '#8b5cf6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#a855f7',
  pink: '#ec4899'
};

const RISK_COLORS = {
  critical: '#ef4444',
  high: '#f59e0b',
  moderate: '#eab308',
  normal: '#22c55e'
};

/**
 * HeartRateChart - Line chart showing heart rate trends across days
 */
export const HeartRateChart = ({ patients }) => {
  // Aggregate heart rate data across all patients
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = days.map(day => {
    const dayData = { day };
    patients.forEach(patient => {
      const trendPoint = patient.trendData.find(t => t.day === day);
      if (trendPoint) {
        dayData[patient.name] = trendPoint.heartRate;
      }
    });
    return dayData;
  });

  return (
    <div className="glass-card rounded-2xl p-6 h-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Heart Rate Trends</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Weekly monitoring across patients</p>
        </div>
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} domain={[60, 120]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              border: 'none',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'High Risk', fill: '#ef4444', fontSize: 10 }} />
          {patients.slice(0, 6).map((patient, index) => (
            <Line
              key={patient.id}
              type="monotone"
              dataKey={patient.name}
              stroke={Object.values(COLORS)[index % 7]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * SugarTrendChart - Area chart showing blood sugar trends
 */
export const SugarTrendChart = ({ patients }) => {
  // Aggregate blood sugar data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = days.map(day => {
    const dayData = { day };
    patients.forEach(patient => {
      const trendPoint = patient.trendData.find(t => t.day === day);
      if (trendPoint) {
        dayData[patient.name] = trendPoint.sugar;
      }
    });
    return dayData;
  });

  return (
    <div className="glass-card rounded-2xl p-6 h-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Blood Sugar Trends</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Glucose levels over time</p>
        </div>
        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.3} />
              <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} domain={[70, 250]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              border: 'none',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'High Threshold', fill: '#f59e0b', fontSize: 10 }} />
          <ReferenceLine y={200} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Critical', fill: '#ef4444', fontSize: 10 }} />
          {patients.slice(0, 4).map((patient, index) => (
            <Area
              key={patient.id}
              type="monotone"
              dataKey={patient.name}
              stroke={Object.values(COLORS)[(index + 2) % 7]}
              strokeWidth={2}
              fillOpacity={0.1}
              fill="url(#colorSugar)"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * RiskDistributionChart - Pie chart showing patient risk level distribution
 */
export const RiskDistributionChart = ({ patients }) => {
  // Calculate risk distribution
  const riskCounts = patients.reduce((acc, patient) => {
    acc[patient.riskLevel] = (acc[patient.riskLevel] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Normal', value: riskCounts.normal || 0, color: RISK_COLORS.normal },
    { name: 'Moderate', value: riskCounts.moderate || 0, color: RISK_COLORS.moderate },
    { name: 'High', value: riskCounts.high || 0, color: RISK_COLORS.high },
    { name: 'Critical', value: riskCounts.critical || 0, color: RISK_COLORS.critical },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 h-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Risk Distribution</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Patient count by risk level</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              border: 'none',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value, entry) => (
              <span style={{ color: entry.color, fontSize: '12px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * RecoveryAnalyticsChart - Bar chart showing recovery metrics
 */
export const RecoveryAnalyticsChart = ({ patients }) => {
  // Calculate recovery scores based on metrics improvement
  const data = patients.map(p => ({
    name: p.name.split(' ')[0], // First name only
    recoveryScore: Math.min(100, Math.round(
      (p.oxygenLevel * 0.3) + 
      ((100 - Math.abs(p.heartRate - 72)) * 0.3) + 
      ((150 - p.bloodSugar) * 0.2) + 
      (p.sleepHours * 8 * 0.2)
    )),
    trend: p.riskLevel === 'normal' ? 'up' : p.riskLevel === 'critical' ? 'down' : 'stable'
  }));

  return (
    <div className="glass-card rounded-2xl p-6 h-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recovery Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recovery score by patient</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded bg-green-500" />
          <span className="text-gray-600 dark:text-gray-400">Good</span>
          <span className="w-3 h-3 rounded bg-amber-500 ml-2" />
          <span className="text-gray-600 dark:text-gray-400">Fair</span>
          <span className="w-3 h-3 rounded bg-red-500 ml-2" />
          <span className="text-gray-600 dark:text-gray-400">Poor</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              border: 'none',
              borderRadius: '12px',
              color: '#fff'
            }}
            formatter={(value) => [`${value}%`, 'Recovery Score']}
          />
          <Bar dataKey="recoveryScore" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.recoveryScore > 75 ? COLORS.success : entry.recoveryScore > 50 ? COLORS.warning : COLORS.danger}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * ChartsGrid - Container component for all charts
 */
const ChartsGrid = ({ patients }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HeartRateChart patients={patients} />
      <SugarTrendChart patients={patients} />
      <RiskDistributionChart patients={patients} />
      <RecoveryAnalyticsChart patients={patients} />
    </div>
  );
};

export default ChartsGrid;
