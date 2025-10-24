import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';
import ProgressTracker from '../components/ProgressTracker';
import ProgressCharts from '../components/ProgressCharts';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../utils/axiosSecure';
import { useAuth } from '../contexts/AuthContext';

const ProgressTracking: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  // Fetch progress statistics for charts
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['progressStats', user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get('/progress/stats?period=30');
      return response.data;
    },
    enabled: !!user
  });

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Progress Tracking - RunLytic</title>
      </Helmet>

      {/* Background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
            Progress Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Track your training progress, analyze your performance, and stay motivated on your marathon journey.
          </p>
        </div>

        {/* Progress Tracker Component */}
        <div className="mb-8">
          <ProgressTracker />
        </div>

        {/* Progress Charts */}
        {statsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marathon-primary"></div>
          </div>
        ) : stats ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Training Analytics
            </h2>
            <ProgressCharts stats={stats} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Data Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start logging your activities to see detailed analytics and charts.
              </p>
            </div>
          </div>
        )}

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-marathon-primary to-marathon-secondary rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Keep Going! 🏃‍♂️
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Every step counts towards your marathon goal. Track your progress and celebrate your achievements!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Set Goals</h4>
                <p className="text-sm opacity-80">
                  Define your training targets and milestones
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">📈</div>
                <h4 className="font-semibold mb-2">Track Progress</h4>
                <p className="text-sm opacity-80">
                  Monitor your improvement over time
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">🏆</div>
                <h4 className="font-semibold mb-2">Celebrate Wins</h4>
                <p className="text-sm opacity-80">
                  Acknowledge your achievements and milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
