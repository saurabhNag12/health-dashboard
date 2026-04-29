import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

/**
 * Navbar Component
 * Top navigation bar with search, notifications, and user profile
 * Features responsive design and glassmorphism styling
 */
const Navbar = ({ searchQuery, setSearchQuery, onExport }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample notifications
  const notifications = [
    { id: 1, message: 'Patient Robert Williams needs immediate attention', type: 'critical', time: '5 min ago' },
    { id: 2, message: 'New patient data uploaded successfully', type: 'success', time: '1 hour ago' },
    { id: 3, message: 'Daily health report is ready', type: 'info', time: '3 hours ago' },
  ];

  return (
    <header className="sticky top-0 z-30 glass-header">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, records, or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Export Button - Desktop only */}
            <button
              onClick={onExport}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-medical-teal/10 text-medical-teal rounded-xl hover:bg-medical-teal/20 transition-colors text-sm font-medium"
            >
              Export Report
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-2xl p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <button className="text-xs text-medical-teal hover:underline">Mark all read</button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                      >
                        <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                          notification.type === 'critical' ? 'bg-red-500' :
                          notification.type === 'success' ? 'bg-green-500' : 'bg-medical-blue'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-1.5 pl-3 pr-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-medical-teal to-medical-blue flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dr. Vishakha Rani</p>
                  <p className="text-xs text-gray-400">Cardiologist</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl shadow-2xl p-2 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <p className="font-semibold text-gray-800 dark:text-white">Dr. Vishakha Rani</p>
                    <p className="text-sm text-gray-500">dr.vishakha@mediflow.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-header border-b border-gray-200 dark:border-gray-700 p-4 animate-slide-up">
          <button
            onClick={onExport}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-medical-teal text-white rounded-xl font-medium"
          >
            Export Report
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
