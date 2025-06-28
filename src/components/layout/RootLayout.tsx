import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { usePageTitle } from '../../utils/usePageTitle';

const RootLayout = () => {
  const { isDarkMode } = useTheme();

  // Set dynamic page title based on current route
  usePageTitle();

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-marathon-dark' : 'bg-white'}`}>
      <Navbar />
      <main className={`flex-grow pt-16 ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout; 