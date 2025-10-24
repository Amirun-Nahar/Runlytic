import { Card, Button } from 'flowbite-react';
import { HiWifi, HiRefresh } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const OfflineFallback = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-marathon-dark' : 'bg-marathon-light'}`}>
      <Card className="max-w-md mx-4">
        <div className="text-center">
          <HiWifi className="w-16 h-16 text-marathon-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connection Issue
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're having trouble connecting to our servers. This might be a temporary issue.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-marathon-primary hover:bg-marathon-secondary"
            >
              <HiRefresh className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If the problem persists, please check your internet connection or try again later.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OfflineFallback;
