import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiCalendar, HiLocationMarker, HiUsers, HiArrowRight } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

interface MarathonCardProps {
  marathon: {
    _id: string;
    title: string;
    location: string;
    marathonStartDate: string;
    image: string;
    runningDistance: string;
    totalRegistrations: number;
    description?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const MarathonCard = ({ marathon, onEdit, onDelete }: MarathonCardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={marathon.image}
          alt={marathon.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 font-playfair ${
          isDarkMode ? 'text-white' : 'text-marathon-primary'
        }`}>
          {marathon.title}
        </h3>
        
        <div className={`space-y-2 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-poppins`}>
          <p className="flex items-center">
            <HiLocationMarker className="mr-2 text-marathon-secondary" />
            {marathon.location}
          </p>
          <p className="flex items-center">
            <HiCalendar className="mr-2 text-marathon-secondary" />
            {new Date(marathon.marathonStartDate).toLocaleDateString()}
          </p>
          <p className="flex items-center">
            <HiUsers className="mr-2 text-marathon-secondary" />
            {marathon.totalRegistrations} Registrations
          </p>
          <p className="font-medium text-marathon-secondary">
            Distance: {marathon.runningDistance}
          </p>
        </div>

        <p className={`text-sm mb-6 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {marathon.description || "Join us for an exciting marathon event that challenges your limits and celebrates the spirit of running. Experience a well-planned route with stunning views and great support."}
        </p>

        <div className="flex gap-2">
          <Button 
            as={Link} 
            to={`/marathons/${marathon._id}`}
            className="flex-1 bg-marathon-secondary hover:bg-marathon-accent text-white font-poppins transition-all duration-300"
          >
            See More
            <HiArrowRight className="ml-2" />
          </Button>
          {onEdit && (
            <Button 
              onClick={onEdit}
              className="bg-marathon-primary hover:bg-marathon-secondary text-white font-poppins transition-all duration-300"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              onClick={onDelete}
              color="failure"
              className="font-poppins transition-all duration-300"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarathonCard; 