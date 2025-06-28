import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ErrorPage = () => {
  const error = useRouteError();
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen relative">
      {/* Background overlay with gradient patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className={`text-center p-8 rounded-lg backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/85 text-marathon-light' 
            : 'bg-white/85 text-marathon-primary'
        } shadow-lg max-w-lg mx-4`}>
          <h1 className="text-6xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
            Oops!
          </h1>
          <p className="text-xl mb-4 font-poppins">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="mb-8 text-gray-500 font-poppins">
            {isRouteErrorResponse(error) 
              ? error.statusText 
              : error instanceof Error 
                ? error.message 
                : 'Unknown error'}
          </p>
          <Link
            to="/"
            className="inline-block bg-marathon-secondary hover:bg-marathon-accent text-white px-6 py-3 rounded-lg transition-all duration-300 font-poppins"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 