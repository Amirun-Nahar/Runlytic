import { Footer as FlowbiteFooter } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <FlowbiteFooter
      container
      className={`relative ${
        isDarkMode
          ? 'bg-marathon-dark border-t border-gray-700'
          : 'bg-white border-t border-gray-200'
      }`}
    >
      {/* Background overlay with gradient patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl opacity-10 ${
          isDarkMode ? 'bg-marathon-dark-primary' : 'bg-marathon-primary'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl opacity-10 ${
          isDarkMode ? 'bg-marathon-dark-secondary' : 'bg-marathon-secondary'
        }`} />
      </div>

      <div className="w-full relative z-10">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="https://i.ibb.co/5gQwNwcf/Gemini-Generated-Image-z13rg2z13rg2z13r.png"
                alt="RunLytic Logo"
                className="h-8 mr-3"
              />
              <span className={`self-center text-2xl font-playfair font-bold bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent`}>
                RunLytic
              </span>
            </Link>
            <p className={`max-w-xs font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your premier destination for discovering and participating in world-class marathon events.
              Join us in the journey of fitness and achievement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className={`mb-6 text-sm font-bold uppercase font-playfair ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Quick Links
              </h2>
              <ul className={`font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="mb-4">
                  <Link to="/marathons" className="hover:text-marathon-secondary transition-colors duration-300">
                    All Marathons
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-marathon-secondary transition-colors duration-300">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`mb-6 text-sm font-bold uppercase font-playfair ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Help & Support
              </h2>
              <ul className={`font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="mb-4">
                  <Link to="/contact" className="hover:text-marathon-secondary transition-colors duration-300">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-marathon-secondary transition-colors duration-300">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={`mb-6 text-sm font-bold uppercase font-playfair ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Legal
              </h2>
              <ul className={`font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="mb-4">
                  <Link to="/privacy-policy" className="hover:text-marathon-secondary transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-marathon-secondary transition-colors duration-300">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className={`my-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sm:mx-auto lg:my-8`} />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className={`text-sm font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} sm:text-center`}>
            © {new Date().getFullYear()} <Link to="/" className="hover:text-marathon-secondary transition-colors duration-300">Marathon Hub™</Link>. All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <p className={`text-sm font-poppins ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Made with ❤️ for runners worldwide
            </p>
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
};

export default Footer; 