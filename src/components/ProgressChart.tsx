import { useMemo } from 'react';
import { Card } from 'flowbite-react';
import { useTheme } from '../contexts/ThemeContext';

interface Workout {
  _id: string;
  date: string;
  type: 'easy' | 'tempo' | 'interval' | 'long' | 'recovery';
  distance: number;
  duration: number;
  pace: number;
  notes?: string;
  weather?: string;
  effort: 1 | 2 | 3 | 4 | 5;
}

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart = ({ workouts }: ProgressChartProps) => {
  const { isDarkMode } = useTheme();

  // Process data for the last 30 days
  const chartData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return last30Days.map(date => {
      const dayWorkouts = workouts.filter(workout => workout.date === date);
      const totalDistance = dayWorkouts.reduce((sum, workout) => sum + workout.distance, 0);
      const totalDuration = dayWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
      const avgPace = dayWorkouts.length > 0 
        ? dayWorkouts.reduce((sum, workout) => sum + workout.pace, 0) / dayWorkouts.length 
        : 0;

      return {
        date,
        distance: totalDistance,
        duration: totalDuration,
        pace: avgPace,
        workoutCount: dayWorkouts.length,
        dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
      };
    });
  }, [workouts]);

  // Calculate weekly totals
  const weeklyData = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < chartData.length; i += 7) {
      const weekData = chartData.slice(i, i + 7);
      const weekDistance = weekData.reduce((sum, day) => sum + day.distance, 0);
      const weekDuration = weekData.reduce((sum, day) => sum + day.duration, 0);
      const weekWorkouts = weekData.reduce((sum, day) => sum + day.workoutCount, 0);
      
      weeks.push({
        week: Math.floor(i / 7) + 1,
        distance: weekDistance,
        duration: weekDuration,
        workouts: weekWorkouts,
        avgPace: weekData.filter(day => day.pace > 0).length > 0
          ? weekData.filter(day => day.pace > 0).reduce((sum, day) => sum + day.pace, 0) / weekData.filter(day => day.pace > 0).length
          : 0
      });
    }
    return weeks;
  }, [chartData]);

  const maxDistance = Math.max(...chartData.map(day => day.distance), 1);

  return (
    <div className="space-y-6">
      {/* Daily Distance Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Distance (Last 30 Days)</h3>
        <div className="flex items-end space-x-1 h-32">
          {chartData.map((day, index) => {
            const height = (day.distance / maxDistance) * 100;
            const isToday = index === chartData.length - 1;
            
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    day.distance > 0 
                      ? 'bg-marathon-secondary' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } ${isToday ? 'ring-2 ring-marathon-primary' : ''}`}
                  style={{ height: `${Math.max(height, 2)}%` }}
                  title={`${day.dayName}: ${day.distance}km`}
                />
                {index % 7 === 6 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {day.dayName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklyData.slice(-4).map((week) => (
            <Card key={week.week} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Week {week.week}</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Distance: <span className="font-bold text-marathon-secondary">{week.distance.toFixed(1)}km</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Time: <span className="font-bold text-marathon-primary">{Math.floor(week.duration / 60)}h {week.duration % 60}m</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Runs: <span className="font-bold text-marathon-accent">{week.workouts}</span>
                  </p>
                  {week.avgPace > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Pace: <span className="font-bold text-marathon-secondary">
                        {Math.floor(week.avgPace)}:{(Math.floor((week.avgPace % 1) * 60)).toString().padStart(2, '0')}/km
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">This Month</h4>
            <p className="text-2xl font-bold text-marathon-secondary">
              {chartData.reduce((sum, day) => sum + day.distance, 0).toFixed(1)}km
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Distance</p>
          </div>
        </Card>

        <Card className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Workouts</h4>
            <p className="text-2xl font-bold text-marathon-primary">
              {chartData.reduce((sum, day) => sum + day.workoutCount, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
          </div>
        </Card>

        <Card className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Avg Pace</h4>
            <p className="text-2xl font-bold text-marathon-accent">
              {(() => {
                const validPaces = chartData.filter(day => day.pace > 0);
                if (validPaces.length === 0) return 'N/A';
                const avgPace = validPaces.reduce((sum, day) => sum + day.pace, 0) / validPaces.length;
                return `${Math.floor(avgPace)}:${Math.floor((avgPace % 1) * 60).toString().padStart(2, '0')}/km`;
              })()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Pace</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressChart;
