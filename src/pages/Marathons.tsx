import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextInput, Select } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import axiosSecure from '../utils/axiosSecure';
import MarathonCard from '../components/MarathonCard';
import LoadingBar from '../components/LoadingBar';

interface Marathon {
  _id: string;
  title: string;
  location: string;
  marathonStartDate: string;
  image: string;
  runningDistance: string;
  totalRegistrations: number;
}

const Marathons = () => {
  const { isDarkMode } = useTheme();
  const [searchTitle, setSearchTitle] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [distance, setDistance] = useState('all');

  const { data: marathons = [], isLoading } = useQuery<Marathon[]>({
    queryKey: ['marathons', searchTitle, sortBy, distance],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons');
      return response.data;
    }
  });

  const filteredMarathons = marathons
    .filter((marathon) => {
      const titleMatch = marathon.title.toLowerCase().includes(searchTitle.toLowerCase());
      const distanceMatch = distance === 'all' || marathon.runningDistance === distance;
      return titleMatch && distanceMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.marathonStartDate).getTime() - new Date(a.marathonStartDate).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'registrations') {
        return b.totalRegistrations - a.totalRegistrations;
      }
      return 0;
    });

  if (isLoading) {
    return <LoadingBar />;
  }

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

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <h1 className="text-5xl font-bold mb-8 text-center font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
          Upcoming Marathons
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
          <div className="flex-1">
            <TextInput
              icon={HiSearch}
              placeholder="Search marathons..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="font-poppins"
              theme={{
                field: {
                  input: {
                    base: `bg-${isDarkMode ? 'gray-800/90' : 'white/90'} backdrop-blur-sm border-${isDarkMode ? 'gray-600' : 'gray-300'} rounded-lg focus:ring-2 focus:ring-marathon-secondary transition-all duration-300`,
                  }
                }
              }}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="font-poppins"
              theme={{
                field: {
                  select: {
                    base: `bg-${isDarkMode ? 'gray-800/90' : 'white/90'} backdrop-blur-sm border-${isDarkMode ? 'gray-600' : 'gray-300'} rounded-lg focus:ring-2 focus:ring-marathon-secondary transition-all duration-300`,
                  }
                }
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="registrations">Sort by Registrations</option>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select 
              value={distance} 
              onChange={(e) => setDistance(e.target.value)}
              className="font-poppins"
              theme={{
                field: {
                  select: {
                    base: `bg-${isDarkMode ? 'gray-800/90' : 'white/90'} backdrop-blur-sm border-${isDarkMode ? 'gray-600' : 'gray-300'} rounded-lg focus:ring-2 focus:ring-marathon-secondary transition-all duration-300`,
                  }
                }
              }}
            >
              <option value="all">All Distances</option>
              <option value="3k">3K</option>
              <option value="10k">10K</option>
              <option value="25k">25K</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarathons.map((marathon) => (
            <MarathonCard key={marathon._id} marathon={marathon} />
          ))}
        </div>

        {filteredMarathons.length === 0 && (
          <div className={`text-center py-12 p-8 rounded-lg backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-900/85 text-marathon-light' 
              : 'bg-white/85 text-marathon-primary'
          } shadow-lg`}>
            <h3 className="text-2xl font-bold mb-2 font-playfair">
              No marathons found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-poppins">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marathons; 