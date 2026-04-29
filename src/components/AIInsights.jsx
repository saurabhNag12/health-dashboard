import React from 'react';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Lightbulb,
  ArrowRight,
  Heart,
  Droplets
} from 'lucide-react';

/**
 * AIInsights Component
 * Generates intelligent health insights and recommendations based on patient data
 * Logic: sugar > 200 → Critical, hr > 100 → Risk
 */
const AIInsights = ({ patients }) => {
  
  /**
   * Generate insights based on patient data
   * Analyzes critical values and provides recommendations
   */
  const generateInsights = () => {
    const insights = [];
    
    // Find patients with critical blood sugar (>200)
    const criticalSugar = patients.filter(p => p.bloodSugar > 200);
    if (criticalSugar.length > 0) {
      insights.push({
        type: 'critical',
        category: 'Blood Sugar Alert',
        icon: Droplets,
        title: `Critical Blood Sugar Levels`,
        description: `${criticalSugar.length} patient(s) have dangerously high blood sugar levels (>200 mg/dL). Immediate medical intervention is recommended.`,
        patients: criticalSugar.map(p => p.name),
        recommendation: 'Urgent: Schedule endocrinology consultation. Consider insulin adjustment. Monitor for diabetic ketoacidosis symptoms.',
        color: 'red'
      });
    }
    
    // Find patients with high heart rate (>100)
    const highHR = patients.filter(p => p.heartRate > 100);
    if (highHR.length > 0) {
      insights.push({
        type: 'warning',
        category: 'Cardiovascular Risk',
        icon: Heart,
        title: `Elevated Heart Rate Detected`,
        description: `${highHR.length} patient(s) showing tachycardia (HR >100 bpm). Cardiac evaluation advised.`,
        patients: highHR.map(p => p.name),
        recommendation: 'Recommend ECG screening. Assess for arrhythmia, hypertension, or underlying cardiac conditions.',
        color: 'amber'
      });
    }
    
    // Find patients with pre-diabetic sugar (140-200)
    const preDiabetic = patients.filter(p => p.bloodSugar >= 140 && p.bloodSugar <= 200);
    if (preDiabetic.length > 0) {
      insights.push({
        type: 'info',
        category: 'Pre-diabetic Range',
        icon: Activity,
        title: 'Pre-diabetic Monitoring Required',
        description: `${preDiabetic.length} patient(s) in pre-diabetic glucose range (140-200 mg/dL).`,
        patients: preDiabetic.map(p => p.name),
        recommendation: 'Implement lifestyle modifications: dietary changes, increased physical activity, and regular glucose monitoring.',
        color: 'yellow'
      });
    }
    
    // Find patients with low oxygen (<95%)
    const lowOxygen = patients.filter(p => p.oxygenLevel < 95);
    if (lowOxygen.length > 0) {
      insights.push({
        type: 'warning',
        category: 'Respiratory Alert',
        icon: Activity,
        title: 'Low Oxygen Saturation',
        description: `${lowOxygen.length} patient(s) with oxygen levels below 95%.`,
        patients: lowOxygen.map(p => p.name),
        recommendation: 'Evaluate for respiratory conditions. Consider pulmonary function tests and sleep study.',
        color: 'blue'
      });
    }
    
    // Sleep analysis
    const poorSleep = patients.filter(p => p.sleepHours < 6);
    if (poorSleep.length > 0) {
      insights.push({
        type: 'info',
        category: 'Sleep Health',
        icon: Activity,
        title: 'Insufficient Sleep Pattern',
        description: `${poorSleep.length} patient(s) averaging less than 6 hours of sleep.`,
        patients: poorSleep.map(p => p.name),
        recommendation: 'Address sleep hygiene. Consider sleep apnea screening. Insufficient sleep correlates with cardiovascular risk.',
        color: 'purple'
      });
    }
    
    // If all normal, show positive insight
    if (insights.length === 0) {
      insights.push({
        type: 'success',
        category: 'All Clear',
        icon: CheckCircle,
        title: 'All Metrics Within Normal Range',
        description: 'No critical alerts detected. All patient vitals are within acceptable parameters.',
        patients: [],
        recommendation: 'Continue routine monitoring. Schedule regular follow-ups per standard protocols.',
        color: 'green'
      });
    }
    
    return insights;
  };

  const insights = generateInsights();
  
  // Calculate statistics
  const stats = {
    totalPatients: patients.length,
    criticalCount: patients.filter(p => p.riskLevel === 'critical').length,
    highRiskCount: patients.filter(p => p.riskLevel === 'high').length,
    normalCount: patients.filter(p => p.riskLevel === 'normal').length,
  };

  // Color mapping
  const colorMap = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/10',
      border: 'border-red-200 dark:border-red-800',
      icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      text: 'text-red-800 dark:text-red-200'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      text: 'text-amber-800 dark:text-amber-200'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/10',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      text: 'text-yellow-800 dark:text-yellow-200'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      text: 'text-blue-800 dark:text-blue-200'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      text: 'text-purple-800 dark:text-purple-200'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/10',
      border: 'border-green-200 dark:border-green-800',
      icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      text: 'text-green-800 dark:text-green-200'
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-medical-teal/5 to-medical-blue/5">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-medical-teal to-medical-blue rounded-2xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Health Insights</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Intelligent analysis powered by MediFlow AI • {patients.length} patients analyzed
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">AI Active</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Patients', value: stats.totalPatients, color: 'blue' },
            { label: 'Critical', value: stats.criticalCount, color: 'red' },
            { label: 'High Risk', value: stats.highRiskCount, color: 'amber' },
            { label: 'Normal', value: stats.normalCount, color: 'green' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50">
              <p className={`text-2xl font-bold ${stat.color === 'red' ? 'text-red-500' : stat.color === 'amber' ? 'text-amber-500' : stat.color === 'green' ? 'text-green-500' : 'text-medical-blue'}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="grid gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colors = colorMap[insight.color];
          
          return (
            <div 
              key={index}
              className={`glass-card rounded-2xl p-5 border-l-4 ${colors.border} ${colors.bg} hover-lift animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl ${colors.icon} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>
                      {insight.category}
                    </span>
                    {insight.type === 'critical' && (
                      <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {insight.description}
                  </p>
                  
                  {/* Affected Patients */}
                  {insight.patients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {insight.patients.map((name, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Recommendation */}
                  <div className="flex items-start gap-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <Lightbulb className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-medical-teal mb-1">AI Recommendation</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{insight.recommendation}</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrow indicator */}
                <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;
