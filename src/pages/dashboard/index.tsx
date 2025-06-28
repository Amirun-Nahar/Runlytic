import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../contexts/ThemeContext';
import { HiPlus, HiCollection, HiClipboardList } from 'react-icons/hi';
import AddMarathon from './AddMarathon';
import MyMarathons from './MyMarathons';
import MyApplications from './MyApplications';

type TabType = 'add' | 'myMarathons' | 'myApplications';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('add');

  const tabs = [
    { id: 'add', label: 'Add Marathon', icon: HiPlus },
    { id: 'myMarathons', label: 'My Marathons', icon: HiCollection },
    { id: 'myApplications', label: 'My Applications', icon: HiClipboardList },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <AddMarathon />;
      case 'myMarathons':
        return <MyMarathons />;
      case 'myApplications':
        return <MyApplications />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Dashboard - RunLytic</title>
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

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <h1 className="text-5xl font-bold mb-8 text-center font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
          Dashboard
        </h1>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-poppins backdrop-blur-sm ${
                activeTab === tab.id
                  ? 'bg-marathon-secondary text-white shadow-lg scale-105'
                  : `${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} 
                     ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} 
                     hover:bg-marathon-secondary/90 hover:text-white hover:scale-105`
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`rounded-xl shadow-lg p-6 backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/85 text-marathon-light' 
            : 'bg-white/85 text-marathon-primary'
        }`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 