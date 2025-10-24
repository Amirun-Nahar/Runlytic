import { Badge, Progress } from 'flowbite-react';
import { HiFire, HiClock, HiStar, HiCheckCircle } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

interface Achievement {
  _id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'distance' | 'consistency' | 'speed' | 'special';
  requirement: number;
  current: number;
  unlocked: boolean;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  const { isDarkMode } = useTheme();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'distance':
        return <HiFire className="w-4 h-4" />;
      case 'consistency':
        return <HiClock className="w-4 h-4" />;
      case 'speed':
        return <HiStar className="w-4 h-4" />;
      case 'special':
        return <HiStar className="w-4 h-4" />;
      default:
        return <HiStar className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'distance':
        return 'blue';
      case 'consistency':
        return 'green';
      case 'speed':
        return 'yellow';
      case 'special':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const progress = achievement.unlocked ? 100 : (achievement.current / achievement.requirement) * 100;

  return (
    <div className={`p-3 rounded-lg border ${
      achievement.unlocked 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
        : isDarkMode 
          ? 'bg-gray-700 border-gray-600' 
          : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full ${
            achievement.unlocked 
              ? 'bg-green-100 dark:bg-green-800' 
              : 'bg-gray-100 dark:bg-gray-600'
          }`}>
            {achievement.unlocked ? (
              <HiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              getCategoryIcon(achievement.category)
            )}
          </div>
          <div>
            <h4 className={`font-medium ${
              achievement.unlocked 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {achievement.name}
            </h4>
            <p className={`text-sm ${
              achievement.unlocked 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {achievement.description}
            </p>
          </div>
        </div>
        
        {achievement.unlocked && (
          <Badge color="success" className="flex items-center gap-1">
            <HiCheckCircle className="w-3 h-3" />
            Unlocked
          </Badge>
        )}
      </div>

      {!achievement.unlocked && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {achievement.current}/{achievement.requirement}
            </span>
          </div>
          <Progress 
            progress={progress} 
            color={getCategoryColor(achievement.category) as any}
            size="sm"
          />
        </div>
      )}

      {achievement.unlocked && achievement.unlockedAt && (
        <div className="mt-2 text-xs text-green-600 dark:text-green-400">
          Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
