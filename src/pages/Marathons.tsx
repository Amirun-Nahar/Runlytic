import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextInput, Select, Button } from 'flowbite-react';
import { HiSearch, HiFilter } from 'react-icons/hi';
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
  price: number;
}

const Marathons = () => {
  const { isDarkMode } = useTheme();
  const [searchTitle, setSearchTitle] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [distance, setDistance] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const { data: marathons = [], isLoading, error } = useQuery<Marathon[]>({
    queryKey: ['marathons', searchTitle, sortBy, distance, priceRange, location],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons');
      return response.data;
    },
    retry: (failureCount, error) => {
      // Retry up to 3 times if backend is still loading
      if (error?.message?.includes('Backend is still starting up')) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnWindowFocus: false,
  });

  const filteredMarathons = marathons
    .filter((marathon) => {
      const titleMatch = marathon.title.toLowerCase().includes(searchTitle.toLowerCase());
      const distanceMatch = distance === 'all' || marathon.runningDistance === distance;
      const locationMatch = location === 'all' || marathon.location.toLowerCase().includes(location.toLowerCase());
      const priceMatch = priceRange === 'all' || 
        (priceRange === 'under50' && marathon.price < 50) ||
        (priceRange === '50to100' && marathon.price >= 50 && marathon.price <= 100) ||
        (priceRange === 'over100' && marathon.price > 100);
      
      return titleMatch && distanceMatch && locationMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.marathonStartDate).getTime() - new Date(a.marathonStartDate).getTime();
        case 'dateAsc':
          return new Date(a.marathonStartDate).getTime() - new Date(b.marathonStartDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        case 'registrations':
          return b.totalRegistrations - a.totalRegistrations;
        case 'registrationsAsc':
          return a.totalRegistrations - b.totalRegistrations;
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return <LoadingBar />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Marathons</h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load marathons'}
          </p>
          <p className="text-sm text-gray-500">
            API URL: {import.meta.env.VITE_API_URL}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
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

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
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
                <option value="date">Latest First</option>
                <option value="dateAsc">Earliest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="titleDesc">Title (Z-A)</option>
                <option value="registrations">Most Popular</option>
                <option value="registrationsAsc">Least Popular</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
              </Select>
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full md:w-auto ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-marathon-light hover:bg-gray-200'}`}
            >
              <HiFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-opacity-50 backdrop-blur-sm bg-white dark:bg-gray-800">
              <div>
                <Select 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)}
                  className="font-poppins"
                >
                  <option value="all">All Distances</option>
                  <option value="3k">3K</option>
                  <option value="5k">5K</option>
                  <option value="10k">10K</option>
                  <option value="21k">Half Marathon (21K)</option>
                  <option value="42k">Full Marathon (42K)</option>
                </Select>
              </div>
              <div>
                <Select 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="font-poppins"
                >
                  <option value="all">All Prices</option>
                  <option value="under50">Under $50</option>
                  <option value="50to100">$50 - $100</option>
                  <option value="over100">Over $100</option>
                </Select>
              </div>
              <div>
                <Select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="font-poppins"
                >
                  <option value="all">All Locations</option>
                  <option value="new york">New York</option>
                  <option value="london">London</option>
                  <option value="tokyo">Tokyo</option>
                  <option value="paris">Paris</option>
                  <option value="berlin">Berlin</option>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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