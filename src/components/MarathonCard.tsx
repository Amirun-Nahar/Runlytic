import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiCalendar, HiLocationMarker, HiUsers } from 'react-icons/hi';
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
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const MarathonCard = ({ marathon, onEdit, onDelete }: MarathonCardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={marathon.image}
          alt={marathon.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDarkMode 
            ? 'from-gray-900/95 via-gray-900/75 to-gray-900/30' 
            : 'from-marathon-primary/90 via-marathon-primary/70 to-marathon-primary/40'
        }`} />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold mb-3 text-white font-playfair drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          {marathon.title}
        </h3>
        <div className="space-y-2 text-white font-poppins drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          <p className="flex items-center">
            <HiLocationMarker className="mr-2 text-marathon-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            {marathon.location}
          </p>
          <p className="flex items-center">
            <HiCalendar className="mr-2 text-marathon-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            {new Date(marathon.marathonStartDate).toLocaleDateString()}
          </p>
          <p className="flex items-center">
            <HiUsers className="mr-2 text-marathon-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            {marathon.totalRegistrations} Registrations
          </p>
          <p className="font-medium text-marathon-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            Distance: {marathon.runningDistance}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            as={Link} 
            to={`/marathons/${marathon._id}`}
            className="flex-1 bg-marathon-secondary hover:bg-marathon-accent text-white font-poppins transition-all duration-300 shadow-lg"
          >
            View Details
          </Button>
          {onEdit && (
            <Button 
              onClick={onEdit}
              className="bg-marathon-primary hover:bg-marathon-secondary text-white font-poppins transition-all duration-300 shadow-lg"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              onClick={onDelete}
              color="failure"
              className="font-poppins transition-all duration-300 shadow-lg"
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