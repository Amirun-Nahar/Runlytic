import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>404 Not Found - RunLytic</title>
      </Helmet>

      {/* Background overlay with gradient patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className={`text-center p-8 rounded-lg backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/85 text-marathon-light' 
            : 'bg-white/85 text-marathon-primary'
        } shadow-lg`}>
          <h1 className="text-7xl font-bold font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold mb-4 font-playfair">
            Page Not Found
          </h2>
          <p className="text-lg mb-8 font-poppins text-gray-600 dark:text-gray-300">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Button 
            as={Link} 
            to="/" 
            size="xl"
            className="bg-marathon-secondary hover:bg-marathon-accent text-white font-poppins transition-all duration-300"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 