import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MetricCardGrid } from '../components/MetricCard';
import ChartsGrid from '../components/Charts';
import PatientTable from '../components/PatientTable';
import AIInsights from '../components/AIInsights';
import AddPatientModal from '../components/AddPatientModal';
import { initialPatients } from '../data/patients';
import { 
  Users, 
  Plus, 
  Download, 
  Activity,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Heart,
  Droplets,
  Wind,
  Moon,
  Settings,
  FileText,
  BarChart3,
  Construction,
  ArrowLeft
} from 'lucide-react';

/**
 * Dashboard Component
 * Main dashboard page integrating all components
 * Handles state management, data persistence, and feature coordination
 */
const Dashboard = ({ darkMode }) => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load patients from localStorage on mount
  useEffect(() => {
    const loadPatients = () => {
      try {
        const savedPatients = localStorage.getItem('mediflow_patients');
        if (savedPatients) {
          setPatients(JSON.parse(savedPatients));
        } else {
          // Initialize with default data
          setPatients(initialPatients);
          localStorage.setItem('mediflow_patients', JSON.stringify(initialPatients));
        }
      } catch (error) {
        console.error('Error loading patients:', error);
        setPatients(initialPatients);
      }
      setIsLoading(false);
    };
    
    loadPatients();
  }, []);

  // Persist patients to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && patients.length > 0) {
      localStorage.setItem('mediflow_patients', JSON.stringify(patients));
    }
  }, [patients, isLoading]);

  /**
   * Add or update patient
   */
  const handleSavePatient = useCallback((patientData) => {
    setPatients(prev => {
      if (patientData.id) {
        // Update existing patient
        return prev.map(p => p.id === patientData.id ? patientData : p);
      } else {
        // Add new patient with generated ID
        const newPatient = {
          ...patientData,
          id: Date.now(), // Simple ID generation
        };
        return [...prev, newPatient];
      }
    });
    setEditPatient(null);
  }, []);

  /**
   * Delete patient
   */
  const handleDeletePatient = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  }, []);

  /**
   * Edit patient handler
   */
  const handleEditPatient = useCallback((patient) => {
    setEditPatient(patient);
    setIsModalOpen(true);
  }, []);

  /**
   * Export data to CSV
   */
  const handleExport = useCallback(() => {
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Email', 'Phone', 'Heart Rate', 'Blood Sugar', 'Oxygen Level', 'Sleep Hours', 'Risk Level', 'Status', 'Last Checkup'];
    
    const csvContent = [
      headers.join(','),
      ...patients.map(p => [
        p.id,
        `"${p.name}"`,
        p.age,
        p.gender,
        p.email,
        `"${p.phone}"`,
        p.heartRate,
        p.bloodSugar,
        p.oxygenLevel,
        p.sleepHours,
        p.riskLevel,
        p.status,
        p.lastCheckup
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `mediflow_patients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [patients]);

  /**
   * Calculate dashboard statistics
   */
  const stats = {
    totalPatients: patients.length,
    criticalPatients: patients.filter(p => p.riskLevel === 'critical').length,
    highRiskPatients: patients.filter(p => p.riskLevel === 'high').length,
    avgHeartRate: patients.length > 0 
      ? Math.round(patients.reduce((sum, p) => sum + p.heartRate, 0) / patients.length)
      : 0,
    avgBloodSugar: patients.length > 0
      ? Math.round(patients.reduce((sum, p) => sum + p.bloodSugar, 0) / patients.length)
      : 0,
    avgOxygen: patients.length > 0
      ? Math.round(patients.reduce((sum, p) => sum + p.oxygenLevel, 0) / patients.length)
      : 0,
    avgSleep: patients.length > 0
      ? (patients.reduce((sum, p) => sum + p.sleepHours, 0) / patients.length).toFixed(1)
      : 0,
    checkupsToday: patients.filter(p => p.lastCheckup === new Date().toISOString().split('T')[0]).length
  };

  // Quick stats cards for dashboard header
  const quickStats = [
    { 
      label: 'Total Patients', 
      value: stats.totalPatients, 
      icon: Users, 
      color: 'blue',
      change: '+2 this week'
    },
    { 
      label: 'Critical Cases', 
      value: stats.criticalPatients, 
      icon: AlertCircle, 
      color: 'red',
      change: 'Needs attention'
    },
    { 
      label: 'Avg Heart Rate', 
      value: stats.avgHeartRate, 
      unit: 'bpm',
      icon: Heart, 
      color: 'pink',
      change: stats.avgHeartRate > 100 ? 'Above normal' : 'Normal range'
    },
    { 
      label: 'Avg Blood Sugar', 
      value: stats.avgBloodSugar, 
      unit: 'mg/dL',
      icon: Droplets, 
      color: 'amber',
      change: stats.avgBloodSugar > 140 ? 'Monitor closely' : 'Within range'
    },
  ];

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-medical-teal/20 border-t-medical-teal animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">Loading MediFlow AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExport={handleExport}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Dashboard Overview
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Welcome back, Dr. Vishakha Rani • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditPatient(null);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-medical-teal to-medical-blue text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Patient
                  </button>
                  <button
                    onClick={handleExport}
                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={stat.label}
                      className="glass-card rounded-2xl p-5 hover-lift animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/20 text-red-600' :
                          stat.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' :
                          stat.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600' :
                          'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                          {stat.value}{stat.unit && <span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>}
                        </p>
                        <p className={`text-xs mt-1 ${
                          stat.change.includes('Needs') || stat.change.includes('Above') || stat.change.includes('Monitor')
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                {/* Charts Section - Takes up 2 columns */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Health Analytics</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Last 7 days
                    </div>
                  </div>
                  <ChartsGrid patients={patients} />
                </div>

                {/* AI Insights Section - Takes up 1 column */}
                <div className="xl:col-span-1">
                  <AIInsights patients={patients} />
                </div>
              </div>

              {/* Patient Records Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Patient Records</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="hidden sm:inline">{patients.length} total patients</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span>{patients.filter(p => p.riskLevel === 'normal').length} Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>{patients.filter(p => p.riskLevel === 'critical').length} Critical</span>
                    </div>
                  </div>
                </div>
                
                <PatientTable
                  patients={patients}
                  onDelete={handleDeletePatient}
                  onEdit={handleEditPatient}
                  searchQuery={searchQuery}
                  riskFilter={riskFilter}
                  setRiskFilter={setRiskFilter}
                />
              </div>
            </>
          )}

          {activeTab === 'patients' && (
            <>
              {/* Patients Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Patient Management
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage all patient records and health data
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditPatient(null);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-medical-teal to-medical-blue text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Patient
                  </button>
                </div>
              </div>

              {/* Full-width Patient Table */}
              <div className="space-y-6">
                <PatientTable
                  patients={patients}
                  onDelete={handleDeletePatient}
                  onEdit={handleEditPatient}
                  searchQuery={searchQuery}
                  riskFilter={riskFilter}
                  setRiskFilter={setRiskFilter}
                />
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <>
              {/* Analytics Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Health Analytics
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Comprehensive health data visualization
                  </p>
                </div>
              </div>

              {/* Full-width Charts */}
              <div className="space-y-6">
                <ChartsGrid patients={patients} />
              </div>
              
              {/* Additional Analytics Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Risk Analysis</h3>
                  </div>
                  <div className="space-y-3">
                    {['critical', 'high', 'moderate', 'normal'].map(risk => (
                      <div key={risk} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{risk}</span>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {patients.filter(p => p.riskLevel === risk).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Normal Vitals</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">
                    {patients.filter(p => p.riskLevel === 'normal').length}
                    <span className="text-sm font-normal text-gray-500 ml-2">patients</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {Math.round((patients.filter(p => p.riskLevel === 'normal').length / patients.length) * 100)}% of total
                  </p>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Needs Attention</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">
                    {patients.filter(p => p.riskLevel === 'critical' || p.riskLevel === 'high').length}
                    <span className="text-sm font-normal text-gray-500 ml-2">patients</span>
                  </div>
                  <p className="text-sm text-red-500 mt-2">
                    Require immediate care
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'reports' && (
            <>
              {/* Reports Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Reports
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Generate and download health reports
                  </p>
                </div>
              </div>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Patient Summary Report', desc: 'Complete patient health overview', icon: Users },
                  { title: 'Critical Cases Report', desc: 'High-risk patient analysis', icon: AlertCircle },
                  { title: 'Weekly Analytics', desc: '7-day health trends', icon: Activity },
                  { title: 'Monthly Summary', desc: 'Comprehensive monthly data', icon: Calendar },
                  { title: 'Export All Data', desc: 'Full database CSV export', icon: Download },
                  { title: 'Custom Report', desc: 'Build your own report', icon: FileText },
                ].map((report, index) => {
                  const Icon = report.icon;
                  return (
                    <div key={report.title} className="glass-card rounded-2xl p-6 hover-lift">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-medical-teal/10 rounded-xl">
                          <Icon className="w-6 h-6 text-medical-teal" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{report.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{report.desc}</p>
                      <button 
                        onClick={handleExport}
                        className="w-full py-2.5 bg-medical-teal/10 text-medical-teal rounded-xl font-medium hover:bg-medical-teal/20 transition-colors"
                      >
                        Generate Report
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              {/* Settings Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Settings
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Configure your dashboard preferences
                  </p>
                </div>
              </div>

              {/* Coming Soon Message */}
              <div className="glass-card rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-medical-teal/10 flex items-center justify-center">
                  <Construction className="w-10 h-10 text-medical-teal" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Coming Soon</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Settings page is under development. Check back later for profile settings, notifications, and system preferences.
                </p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-medical-teal text-white rounded-xl font-medium mx-auto hover:bg-medical-teal/90 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
              </div>
            </>
          )}

          {/* Footer - Show on all tabs except hide on settings for cleaner look */}
          {activeTab !== 'settings' && (
            <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                <p> 2024 MediFlow AI. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-medical-teal transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-medical-teal transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-medical-teal transition-colors">Support</a>
                </div>
              </div>
            </footer>
          )}
        </main>
      </div>

      {/* Add/Edit Patient Modal */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditPatient(null);
        }}
        onSave={handleSavePatient}
        editPatient={editPatient}
      />
    </div>
  );
};

export default Dashboard;
