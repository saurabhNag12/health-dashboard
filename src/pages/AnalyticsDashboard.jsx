import React from 'react';
import QuickSightDashboard from '../components/QuickSightDashboard';

const AnalyticsDashboard = () => {
  // These would typically come from environment variables or user context
  const dashboardId = import.meta.env.VITE_QUICKSIGHT_DASHBOARD_ID || 'your-dashboard-id';
  const userArn = import.meta.env.VITE_QUICKSIGHT_USER_ARN || 'arn:aws:quicksight:us-east-1:your-account:user/default/username';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Health Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Powered by AWS QuickSight</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4">
          <QuickSightDashboard
            dashboardId={dashboardId}
            userArn={userArn}
            className="h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
