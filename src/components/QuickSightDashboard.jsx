import React, { useState, useEffect } from 'react';
import { getQuickSightEmbedUrl } from '../config/aws';

const QuickSightDashboard = ({ dashboardId, userArn, className }) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        setLoading(true);
        const url = await getQuickSightEmbedUrl(dashboardId, userArn);
        setEmbedUrl(url);
        setError(null);
      } catch (err) {
        setError('Failed to load QuickSight dashboard');
        console.error('QuickSight error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (dashboardId && userArn) {
      fetchEmbedUrl();
    }
  }, [dashboardId, userArn]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0 rounded-lg"
        title="QuickSight Dashboard"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default QuickSightDashboard;
