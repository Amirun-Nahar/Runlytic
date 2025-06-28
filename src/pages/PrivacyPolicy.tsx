import { useTheme } from '../contexts/ThemeContext';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - RunLytic</title>
      </Helmet>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-playfair mb-4 bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className={`rounded-2xl p-8 backdrop-blur-xl ${
          isDarkMode 
            ? 'bg-gray-900/50 text-gray-300' 
            : 'bg-white/80 text-gray-700'
        } shadow-xl space-y-8`}>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              1. Information We Collect
            </h2>
            <p>
              At RunLytic, we collect various types of information to provide you with the best possible marathon registration experience:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Running history and performance data</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Device and browser information</li>
              <li>Location data (with your consent)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              2. How We Use Your Information
            </h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing marathon registrations</li>
              <li>Sending important event updates and notifications</li>
              <li>Improving our services and user experience</li>
              <li>Analyzing running trends and patterns</li>
              <li>Providing personalized training recommendations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              3. Data Security
            </h2>
            <p>
              We implement robust security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Regular security audits and updates</li>
              <li>Secure data storage with regular backups</li>
              <li>Limited access to personal information by authorized personnel</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              4. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: privacy@runlytic.com</li>
              <li>Phone: +8803874759660</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 