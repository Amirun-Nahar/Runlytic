import { Link, useNavigate } from 'react-router-dom';
import { Button, Navbar as FlowbiteNavbar, Avatar } from 'flowbite-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <FlowbiteNavbar
      fluid
      className={`sticky top-0 w-full z-50 border-b mx-auto max-w-[1920px] px-4 backdrop-blur-md bg-opacity-90 shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-marathon-primary/90 to-marathon-dark/90 border-gray-700 text-white' 
          : 'bg-gradient-to-r from-marathon-light/95 to-white/95 border-gray-200 text-marathon-primary'
      }`}
    >
      <FlowbiteNavbar.Brand as={Link} to="/" className="flex items-center">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden ${
          isDarkMode ? 'border-white' : 'border-marathon-primary'
        }`}>
          <img
            src="https://i.ibb.co/5gQwNwcf/Gemini-Generated-Image-z13rg2z13rg2z13r.png"
            alt="RunLytic Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="self-center whitespace-nowrap text-xl font-orbitron font-semibold ml-3">
          RunLytic
        </span>
      </FlowbiteNavbar.Brand>

      <div className="flex items-center gap-2 md:order-2">
        <Button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ring-1 ${
            isDarkMode
              ? 'bg-gradient-to-r from-marathon-dark to-gray-800 hover:from-gray-800 hover:to-marathon-dark text-yellow-400 hover:text-yellow-300 ring-gray-600 shadow-lg shadow-marathon-dark/30'
              : 'bg-gradient-to-r from-marathon-light to-white hover:from-white hover:to-marathon-light text-marathon-primary hover:text-marathon-secondary ring-marathon-primary/20 shadow-md shadow-marathon-primary/20'
          }`}
        >
          {isDarkMode ? (
            <HiSun className="w-6 h-6 transform transition-transform animate-pulse" />
          ) : (
            <HiMoon className="w-6 h-6 transform transition-transform" />
          )}
        </Button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <div className="group relative">
              <Avatar
                img={user.photoURL || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                rounded
                size="md"
                className="cursor-pointer ring-2 ring-transparent group-hover:ring-marathon-secondary transition-all duration-300 hover:scale-110"
              />
              <div className="absolute -bottom-12 right-0 w-auto min-w-max opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                <div className={`relative px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap ${
                  isDarkMode 
                    ? 'bg-gray-800 text-marathon-secondary shadow-lg shadow-black/20' 
                    : 'bg-white text-marathon-secondary shadow-lg shadow-gray-200/50'
                }`}>
                  <div className="absolute -top-1 right-4 w-2 h-2 rotate-45 bg-inherit"></div>
                  {user.displayName || 'Runner'}
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-marathon-secondary hover:bg-marathon-accent text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              to="/login"
              className={
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-marathon-light hover:bg-gray-200 text-marathon-primary'
              }
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              className="bg-marathon-secondary hover:bg-marathon-accent text-white"
            >
              Register
            </Button>
          </div>
        )}
        <FlowbiteNavbar.Toggle className="ml-3" />
      </div>

      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link
          as={Link}
          to="/"
          className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
        >
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link
          as={Link}
          to="/marathons"
          className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
        >
          All Marathons
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link
          as={Link}
          to="/about"
          className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
        >
          About Us
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link
          as={Link}
          to="/contact"
          className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
        >
          Contact
        </FlowbiteNavbar.Link>
        {user && (
          <>
            <FlowbiteNavbar.Link
              as={Link}
              to="/dashboard"
              className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
            >
              Dashboard
            </FlowbiteNavbar.Link>
            <FlowbiteNavbar.Link
              as={Link}
              to="/dashboard/add-marathon"
              className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
            >
              Add Marathon
            </FlowbiteNavbar.Link>
            <FlowbiteNavbar.Link
              as={Link}
              to="/dashboard/my-marathons"
              className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-marathon-primary'}
            >
              My Marathons
            </FlowbiteNavbar.Link>
          </>
        )}
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
};

export default Navbar; 