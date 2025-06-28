import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../contexts/ThemeContext';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
      <Helmet>
        <title>Contact Us - RunLytic</title>
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
          Contact Us
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`p-8 rounded-lg backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-900/85 text-marathon-light' 
              : 'bg-white/85 text-marathon-primary'
          } shadow-lg`}>
            <h2 className="text-3xl font-bold mb-6 font-playfair">Get in Touch</h2>
            <p className="text-lg mb-8 font-poppins">
              Have questions about our marathons? We're here to help! Reach out to us using any of the following methods.
            </p>

            <div className="space-y-6 font-poppins">
              <div className="flex items-center">
                <HiMail className="w-6 h-6 text-marathon-secondary mr-4" />
                <div>
                  <h3 className="font-bold font-playfair">Email</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    info@marathonhub.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <HiPhone className="w-6 h-6 text-marathon-secondary mr-4" />
                <div>
                  <h3 className="font-bold font-playfair">Phone</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  +8803874759660
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <HiLocationMarker className="w-6 h-6 text-marathon-secondary mr-4" />
                <div>
                  <h3 className="font-bold font-playfair">Address</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Dhaka, Bangladesh<br />
                   
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-lg backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-900/85 text-marathon-light' 
              : 'bg-white/85 text-marathon-primary'
          } shadow-lg`}>
            <h2 className="text-3xl font-bold mb-6 font-playfair">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/90 border-gray-600 text-white' 
                      : 'bg-white/90 border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-marathon-secondary`}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/90 border-gray-600 text-white' 
                      : 'bg-white/90 border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-marathon-secondary`}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/90 border-gray-600 text-white' 
                      : 'bg-white/90 border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-marathon-secondary`}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/90 border-gray-600 text-white' 
                      : 'bg-white/90 border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-marathon-secondary`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-marathon-secondary hover:bg-marathon-accent text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 