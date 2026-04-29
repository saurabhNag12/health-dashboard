import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Stethoscope
} from 'lucide-react';

/**
 * Sidebar Component
 * Provides navigation and branding for the dashboard
 * Features collapsible design and glassmorphism styling
 */
const Sidebar = ({ activeTab, setActiveTab, darkMode }) => {
  // State for sidebar collapse on mobile/tablet
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items configuration
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full glass-sidebar flex flex-col">
        {/* Logo Section */}
        <div className={`p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-medical-teal to-medical-blue rounded-xl shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
                  MediFlow
                </h1>
                <p className="text-xs text-medical-teal font-medium">AI Dashboard</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="p-2 bg-gradient-to-br from-medical-teal to-medical-blue rounded-xl shadow-lg">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-medical-teal/20 to-medical-blue/20 text-medical-teal dark:text-medical-teal border border-medical-teal/30' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'animate-pulse-slow' : ''}`} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-medical-teal" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Health Status Card - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-4 mx-4 mb-4">
            <div className="glass-card rounded-2xl p-4 bg-gradient-to-br from-medical-teal/10 to-medical-blue/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-medical-teal/20 rounded-lg">
                  <Heart className="w-5 h-5 text-medical-teal" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">System Status</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Operational</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-medical-teal to-medical-blue h-1.5 rounded-full" style={{ width: '98%' }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">98% Uptime</p>
            </div>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 p-1.5 rounded-full bg-medical-teal text-white shadow-lg hover:bg-medical-teal/90 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
