import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
      <Helmet>
        <title>About - RunLytic</title>
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl font-bold mb-8 text-center font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
          About RunLytic
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6 font-poppins">
            RunLytic is your premier destination for discovering and participating in world-class marathon events. 
            We connect runners with exceptional racing experiences across the globe.
          </p>

          <h2 className="text-3xl font-bold mb-4 font-playfair">Our Mission</h2>
          <p className="text-lg mb-6 font-poppins">
            Our mission is to make marathon participation accessible to everyone, from beginners to elite runners. 
            We believe in the transformative power of running and its ability to build communities.
          </p>

          <h2 className="text-3xl font-bold mb-4 font-playfair">What We Offer</h2>
          <ul className="list-disc list-inside text-lg mb-6 space-y-2 font-poppins">
            <li>Curated selection of premium marathon events</li>
            <li>Seamless registration process</li>
            <li>Comprehensive event information</li>
            <li>Runner support services</li>
            <li>Community engagement opportunities</li>
          </ul>

          <h2 className="text-3xl font-bold mb-4 font-playfair">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-lg backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-900/85 text-marathon-light' 
                : 'bg-white/85 text-marathon-primary'
            } shadow-lg`}>
              <h3 className="text-xl font-bold mb-2 font-playfair">Excellence</h3>
              <p className="font-poppins">We strive for excellence in every aspect of our service.</p>
            </div>
            <div className={`p-6 rounded-lg backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-900/85 text-marathon-light' 
                : 'bg-white/85 text-marathon-primary'
            } shadow-lg`}>
              <h3 className="text-xl font-bold mb-2 font-playfair">Community</h3>
              <p className="font-poppins">Building and nurturing the running community is at our core.</p>
            </div>
            <div className={`p-6 rounded-lg backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-900/85 text-marathon-light' 
                : 'bg-white/85 text-marathon-primary'
            } shadow-lg`}>
              <h3 className="text-xl font-bold mb-2 font-playfair">Innovation</h3>
              <p className="font-poppins">Continuously improving the marathon experience through technology.</p>
            </div>
            <div className={`p-6 rounded-lg backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-900/85 text-marathon-light' 
                : 'bg-white/85 text-marathon-primary'
            } shadow-lg`}>
              <h3 className="text-xl font-bold mb-2 font-playfair">Inclusivity</h3>
              <p className="font-poppins">Creating opportunities for runners of all levels and backgrounds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 