import { Card, Button, Badge, Progress } from 'flowbite-react';
import { HiClock, HiFire, HiPlay, HiStar } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

interface TrainingPlan {
  _id: string;
  name?: string;
  duration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  targetDistance?: string;
  description?: string;
  weeklySchedule?: Array<{
    week: number;
    runs?: Array<{
      day: string;
      type: string;
      distance: number;
      duration: number;
      description: string;
    }>;
  }>;
}

interface TrainingPlanCardProps {
  plan?: TrainingPlan;
  onStart: () => void;
  isLoading?: boolean;
  progress?: number;
  isStarted?: boolean;
}

const TrainingPlanCard = ({ plan, onStart, isLoading = false, progress = 0, isStarted = false }: TrainingPlanCardProps) => {
  const { isDarkMode } = useTheme();

  // Early return if plan is undefined or null
  if (!plan) {
    return (
      <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading training plan...</p>
        </div>
      </Card>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'failure';
      default:
        return 'gray';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <HiPlay className="w-4 h-4" />;
      case 'intermediate':
        return <HiFire className="w-4 h-4" />;
      case 'advanced':
        return <HiFire className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Safe calculation with proper null checks
  const totalRuns = plan.weeklySchedule?.reduce((total, week) => {
    return total + (week.runs?.length || 0);
  }, 0) || 0;
  
  const totalDistance = plan.weeklySchedule?.reduce((total, week) => {
    return total + (week.runs?.reduce((weekTotal, run) => {
      return weekTotal + (run.distance || 0);
    }, 0) || 0);
  }, 0) || 0;

  return (
    <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.name || 'Untitled Plan'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {plan.description || 'No description available'}
          </p>
        </div>
        <Badge color={getDifficultyColor(plan.difficulty || 'beginner')} className="flex items-center gap-1">
          {getDifficultyIcon(plan.difficulty || 'beginner')}
          {(plan.difficulty || 'beginner').charAt(0).toUpperCase() + (plan.difficulty || 'beginner').slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <HiClock className="w-4 h-4 text-marathon-primary mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Duration</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {plan.duration || 0} weeks
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <HiFire className="w-4 h-4 text-marathon-secondary mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Target</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {plan.targetDistance || 'N/A'}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <HiStar className="w-4 h-4 text-marathon-accent mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Runs</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {totalRuns}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <HiFire className="w-4 h-4 text-marathon-primary mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Distance</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {totalDistance}km
          </p>
        </div>
      </div>

      {progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-sm font-bold text-marathon-secondary">{progress}%</span>
          </div>
          <Progress progress={progress} color="success" size="sm" />
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={onStart}
          disabled={isLoading || isStarted}
          className={`flex-1 ${
            isStarted 
              ? 'bg-green-600 hover:bg-green-700 text-white cursor-not-allowed' 
              : 'bg-marathon-secondary hover:bg-marathon-accent text-white'
          }`}
        >
          {isLoading ? 'Starting...' : isStarted ? 'Plan Started' : 'Start Plan'}
        </Button>
        <Button
          color="gray"
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default TrainingPlanCard;
