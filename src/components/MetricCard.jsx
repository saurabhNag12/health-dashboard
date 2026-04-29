import React from 'react';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Wind, 
  Moon,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

/**
 * MetricCard Component
 * Displays individual health metrics with icons, values, and trend indicators
 * Features glassmorphism styling and animated transitions
 */
const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'blue',
  normalRange,
  isAbnormal 
}) => {
  // Color configurations for different metric types
  const colorConfig = {
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500'
    },
    red: {
      bg: 'bg-red-500/10',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      iconBg: 'bg-red-500',
      gradient: 'from-red-500 to-pink-500'
    },
    green: {
      bg: 'bg-green-500/10',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      iconBg: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-500',
      gradient: 'from-amber-500 to-orange-500'
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      iconBg: 'bg-purple-500',
      gradient: 'from-purple-500 to-violet-500'
    },
    teal: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-600 dark:text-teal-400',
      border: 'border-teal-200 dark:border-teal-800',
      iconBg: 'bg-teal-500',
      gradient: 'from-teal-500 to-cyan-500'
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  // Trend icon selection
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400';

  return (
    <div className={`glass-card rounded-2xl p-6 hover-lift ${isAbnormal ? 'ring-2 ring-red-400/50' : ''}`}>
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${config.bg}`}>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-100 dark:bg-green-900/30' : 
            trend === 'down' ? 'bg-red-100 dark:bg-red-900/30' : 
            'bg-gray-100 dark:bg-gray-800'
          }`}>
            <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {trendValue || '0%'}
            </span>
          </div>
        )}
      </div>

      {/* Metric Value */}
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl sm:text-3xl font-bold ${isAbnormal ? 'text-red-500' : 'text-gray-800 dark:text-white'}`}>
            {value}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>

      {/* Normal Range Indicator */}
      {normalRange && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Normal: {normalRange}</span>
            {isAbnormal && (
              <span className="text-red-500 font-medium">Abnormal</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
              style={{ width: isAbnormal ? '100%' : '75%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * MetricCardGrid Component
 * Container for displaying multiple MetricCards with summary calculations
 */
export const MetricCardGrid = ({ patients }) => {
  // Calculate average metrics across all patients
  const avgHeartRate = Math.round(
    patients.reduce((sum, p) => sum + p.heartRate, 0) / patients.length
  );
  const avgSugar = Math.round(
    patients.reduce((sum, p) => sum + p.bloodSugar, 0) / patients.length
  );
  const avgOxygen = Math.round(
    patients.reduce((sum, p) => sum + p.oxygenLevel, 0) / patients.length
  );
  const avgSleep = (patients.reduce((sum, p) => sum + p.sleepHours, 0) / patients.length).toFixed(1);
  
  // Count abnormal metrics
  const abnormalHR = patients.filter(p => p.heartRate > 100).length;
  const abnormalSugar = patients.filter(p => p.bloodSugar > 140).length;

  const metrics = [
    {
      title: 'Avg Heart Rate',
      value: avgHeartRate,
      unit: 'bpm',
      icon: Heart,
      color: 'red',
      trend: abnormalHR > 0 ? 'up' : 'stable',
      trendValue: abnormalHR > 0 ? `${abnormalHR} high` : 'Normal',
      normalRange: '60-100',
      isAbnormal: avgHeartRate > 100
    },
    {
      title: 'Avg Blood Sugar',
      value: avgSugar,
      unit: 'mg/dL',
      icon: Droplets,
      color: 'amber',
      trend: abnormalSugar > 0 ? 'up' : 'stable',
      trendValue: abnormalSugar > 0 ? `${abnormalSugar} high` : 'Normal',
      normalRange: '70-140',
      isAbnormal: avgSugar > 140
    },
    {
      title: 'Oxygen Level',
      value: avgOxygen,
      unit: '%',
      icon: Wind,
      color: 'blue',
      trend: 'stable',
      trendValue: 'Normal',
      normalRange: '95-100',
      isAbnormal: avgOxygen < 95
    },
    {
      title: 'Sleep Hours',
      value: avgSleep,
      unit: 'hrs',
      icon: Moon,
      color: 'purple',
      trend: avgSleep < 7 ? 'down' : 'stable',
      trendValue: avgSleep < 7 ? 'Low' : 'Good',
      normalRange: '7-9',
      isAbnormal: avgSleep < 7
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={metric.title}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <MetricCard {...metric} />
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
