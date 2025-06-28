import { useTheme } from '../contexts/ThemeContext';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service - RunLytic</title>
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
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using RunLytic, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              2. Marathon Registration
            </h2>
            <p>When registering for marathons through our platform:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All registrations are final and non-refundable unless stated otherwise</li>
              <li>You must provide accurate and complete information</li>
              <li>Age restrictions and qualification requirements must be met</li>
              <li>Registration fees are subject to change</li>
              <li>Event dates may be modified due to unforeseen circumstances</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              3. User Responsibilities
            </h2>
            <p>As a RunLytic user, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain the security of your account credentials</li>
              <li>Not share your account with others</li>
              <li>Provide accurate personal and payment information</li>
              <li>Follow event rules and guidelines</li>
              <li>Respect other users and event organizers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              4. Liability and Disclaimers
            </h2>
            <p>
              RunLytic is not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal injuries during events</li>
              <li>Lost or stolen personal belongings</li>
              <li>Weather-related event modifications</li>
              <li>Technical issues beyond our control</li>
              <li>Third-party service disruptions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              5. Intellectual Property
            </h2>
            <p>
              All content on RunLytic, including but not limited to text, graphics, logos, and software, is the property of RunLytic and protected by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              6. Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent activity, or disrupt the platform's operation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-playfair text-marathon-primary dark:text-marathon-secondary">
              7. Contact Information
            </h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: legal@runlytic.com</li>
              <li>Phone: +8803874759660</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms; 