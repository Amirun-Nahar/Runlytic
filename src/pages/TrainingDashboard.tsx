import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button, Badge } from 'flowbite-react';
import { HiPlus, HiFire, HiClock, HiLocationMarker, HiChartBar } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import TrainingPlanCard from '../components/TrainingPlanCard';
import ProgressChart from '../components/ProgressChart';
import AchievementBadge from '../components/AchievementBadge';
import WorkoutLogModal from '../components/WorkoutLogModal';
import ProgressTracker from '../components/ProgressTracker';

// Demo interfaces for training data

const TrainingDashboard = () => {
  const { isDarkMode } = useTheme();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user's training plans (demo data)
  const { data: trainingPlans = [], error: plansError } = useQuery<any[]>({
    queryKey: ['trainingPlans'],
    queryFn: async () => {
      // Return demo training plans
      return [
        {
          _id: '1',
          name: 'Beginner 5K Plan',
          description: 'Perfect for first-time runners',
          duration: 8,
          difficulty: 'beginner',
          totalRuns: 16,
          weeklyRuns: 3,
          weeklySchedule: [
            {
              week: 1,
              runs: [
                { day: 'Monday', type: 'Easy Run', distance: 2, duration: 20, description: 'Easy pace' },
                { day: 'Wednesday', type: 'Easy Run', distance: 2.5, duration: 25, description: 'Easy pace' },
                { day: 'Saturday', type: 'Long Run', distance: 3, duration: 30, description: 'Long run' }
              ]
            },
            {
              week: 2,
              runs: [
                { day: 'Monday', type: 'Easy Run', distance: 2.5, duration: 25, description: 'Easy pace' },
                { day: 'Wednesday', type: 'Easy Run', distance: 3, duration: 30, description: 'Easy pace' },
                { day: 'Saturday', type: 'Long Run', distance: 3.5, duration: 35, description: 'Long run' }
              ]
            }
          ]
        },
        {
          _id: '2',
          name: 'Intermediate 10K Plan',
          description: 'Build endurance and speed',
          duration: 12,
          difficulty: 'intermediate',
          totalRuns: 24,
          weeklyRuns: 4,
          weeklySchedule: [
            {
              week: 1,
              runs: [
                { day: 'Monday', type: 'Easy Run', distance: 3, duration: 30, description: 'Easy pace' },
                { day: 'Wednesday', type: 'Tempo Run', distance: 4, duration: 35, description: 'Tempo pace' },
                { day: 'Friday', type: 'Easy Run', distance: 3, duration: 30, description: 'Easy pace' },
                { day: 'Sunday', type: 'Long Run', distance: 6, duration: 60, description: 'Long run' }
              ]
            }
          ]
        },
        {
          _id: '3',
          name: 'Advanced Half Marathon',
          description: 'Elite training program',
          duration: 16,
          difficulty: 'advanced',
          totalRuns: 32,
          weeklyRuns: 5,
          weeklySchedule: [
            {
              week: 1,
              runs: [
                { day: 'Monday', type: 'Easy Run', distance: 5, duration: 45, description: 'Easy pace' },
                { day: 'Tuesday', type: 'Interval', distance: 6, duration: 50, description: 'Speed work' },
                { day: 'Thursday', type: 'Tempo Run', distance: 8, duration: 70, description: 'Tempo pace' },
                { day: 'Friday', type: 'Easy Run', distance: 5, duration: 45, description: 'Easy pace' },
                { day: 'Sunday', type: 'Long Run', distance: 12, duration: 120, description: 'Long run' }
              ]
            }
          ]
        }
      ];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Fetch user's workouts from localStorage (demo mode)
  const { data: workouts = [], error: workoutsError } = useQuery<any[]>({
    queryKey: ['workouts'],
    queryFn: async () => {
      // Get workouts from localStorage for demo with error handling
      try {
        const stored = localStorage.getItem('demoWorkouts');
        if (!stored) return [];
        return JSON.parse(stored);
      } catch (error) {
        console.warn('Failed to parse workouts from localStorage:', error);
        // Clear invalid data and return empty array
        localStorage.removeItem('demoWorkouts');
        return [];
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Fetch user's achievements (demo data)
  const { data: achievements = [], error: achievementsError } = useQuery<any[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      // Return demo achievements
      return [
        {
          _id: '1',
          name: 'First Steps',
          description: 'Complete your first run',
          category: 'distance',
          unlocked: true,
          progress: 100,
          icon: '🏃‍♂️'
        },
        {
          _id: '2',
          name: 'Consistent Runner',
          description: 'Run 7 days in a row',
          category: 'consistency',
          unlocked: false,
          progress: 60,
          icon: '🔥'
        },
        {
          _id: '3',
          name: 'Speed Demon',
          description: 'Run 5K under 25 minutes',
          category: 'speed',
          unlocked: false,
          progress: 30,
          icon: '⚡'
        },
        {
          _id: '4',
          name: 'Marathon Ready',
          description: 'Complete a marathon',
          category: 'special',
          unlocked: false,
          progress: 0,
          icon: '🏆'
        }
      ];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Fetch started training plans from localStorage
  const { data: startedPlans = [] } = useQuery<any[]>({
    queryKey: ['startedTrainingPlans'],
    queryFn: async () => {
      try {
        const stored = localStorage.getItem('startedTrainingPlans');
        if (!stored) return [];
        return JSON.parse(stored);
      } catch (error) {
        console.warn('Failed to parse started training plans from localStorage:', error);
        localStorage.removeItem('startedTrainingPlans');
        return [];
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Start training plan mutation - handled locally since backend endpoint doesn't exist
  const startPlanMutation = useMutation({
    mutationFn: async (planId: string) => {
      // Store the started plan in localStorage for demo purposes with error handling
      let startedPlans = [];
      try {
        const stored = localStorage.getItem('startedTrainingPlans');
        if (stored) {
          startedPlans = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to parse started training plans from localStorage:', error);
        localStorage.removeItem('startedTrainingPlans');
        startedPlans = [];
      }
      
      const planToStart = trainingPlans.find(plan => plan._id === planId);
      
      if (!planToStart) {
        throw new Error('Training plan not found');
      }
      
      // Check if plan is already started
      if (startedPlans.some((plan: any) => plan._id === planId)) {
        throw new Error('Training plan already started');
      }
      
      const startedPlan = {
        ...planToStart,
        startedAt: new Date().toISOString(),
        progress: 0,
        completedWorkouts: []
      };
      
      startedPlans.push(startedPlan);
      localStorage.setItem('startedTrainingPlans', JSON.stringify(startedPlans));
      
      // Simulate API delay
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: startedPlan }), 500);
      });
    },
    onSuccess: () => {
      toast.success('Training plan started successfully!');
      queryClient.invalidateQueries({ queryKey: ['trainingPlans'] });
      queryClient.invalidateQueries({ queryKey: ['startedTrainingPlans'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to start training plan');
    },
  });

  // Calculate stats
  const totalDistance = workouts?.reduce((sum, workout) => sum + workout.distance, 0) || 0;
  const totalTime = workouts?.reduce((sum, workout) => sum + workout.duration, 0) || 0;
  const averagePace = workouts?.length > 0 
    ? workouts.reduce((sum, workout) => sum + workout.pace, 0) / workouts.length 
    : 0;
  const currentStreak = calculateStreak(workouts || []);
  const unlockedAchievements = achievements?.filter(a => a.unlocked).length || 0;

  // Get recent workouts (last 7 days)
  const recentWorkouts = (workouts || [])
    .filter(workout => {
      const workoutDate = new Date(workout.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return workoutDate >= weekAgo;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Training Dashboard - RunLytic</title>
      </Helmet>

      {/* Background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
            Training Dashboard
          </h1>
          <Button
            onClick={() => setShowWorkoutModal(true)}
            className="bg-marathon-secondary hover:bg-marathon-accent text-white"
          >
            <HiPlus className="mr-2" />
            Log Workout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-primary/10 rounded-lg">
                <HiLocationMarker className="w-6 h-6 text-marathon-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Distance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalDistance.toFixed(1)} km
                </p>
              </div>
            </div>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-secondary/10 rounded-lg">
                <HiClock className="w-6 h-6 text-marathon-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.floor(totalTime / 60)}h {totalTime % 60}m
                </p>
              </div>
            </div>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-accent/10 rounded-lg">
                <HiChartBar className="w-6 h-6 text-marathon-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Pace</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averagePace > 0 ? `${Math.floor(averagePace)}:${Math.floor((averagePace % 1) * 60).toString().padStart(2, '0')}/km` : 'N/A'}
                </p>
              </div>
            </div>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <HiFire className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentStreak} days
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Training Plans */}
          <div className="lg:col-span-2">
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Training Plans</h2>
                <Button
                  onClick={() => {/* TODO: Implement browse all plans */}}
                  className="bg-marathon-primary hover:bg-marathon-secondary text-white"
                >
                  Browse All Plans
                </Button>
              </div>
              
              <div className="space-y-4">
                {plansError ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Training plans are not available at the moment.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      This feature is coming soon!
                    </p>
                  </div>
                ) : trainingPlans.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No training plans available.
                    </p>
                    <Button
                      onClick={() => {/* TODO: Implement create plan */}}
                      className="bg-marathon-primary hover:bg-marathon-secondary text-white"
                    >
                      Create Your First Plan
                    </Button>
                  </div>
                ) : (
                  trainingPlans.slice(0, 3).map((plan) => (
                    <TrainingPlanCard
                      key={plan._id}
                      plan={plan}
                      onStart={() => startPlanMutation.mutate(plan._id)}
                      isLoading={startPlanMutation.isPending}
                      isStarted={startedPlans.some((startedPlan: any) => startedPlan._id === plan._id)}
                    />
                  ))
                )}
              </div>
            </Card>

            {/* Progress Tracker */}
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mt-6`}>
              <ProgressTracker />
            </Card>

            {/* Progress Charts */}
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mt-6`}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Progress Analytics</h2>
              {workoutsError ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Progress analytics are not available at the moment.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    This feature is coming soon!
                  </p>
                </div>
              ) : (
                <ProgressChart workouts={workouts} />
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Workouts */}
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Workouts</h3>
              <div className="space-y-3">
                {recentWorkouts.slice(0, 5).map((workout) => (
                  <div key={workout._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{workout.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.distance}km • {workout.duration}min
                      </p>
                    </div>
                    <Badge color="success">{workout.pace.toFixed(1)}/km</Badge>
                  </div>
                ))}
                {recentWorkouts.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No recent workouts. Start logging your runs!
                  </p>
                )}
              </div>
            </Card>

            {/* Achievements */}
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h3>
                <Badge color="success">{unlockedAchievements}/{achievements.length}</Badge>
              </div>
              <div className="space-y-3">
                {achievementsError ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Achievements are not available at the moment.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      This feature is coming soon!
                    </p>
                  </div>
                ) : achievements.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      No achievements available yet.
                    </p>
                  </div>
                ) : (
                  achievements.slice(0, 5).map((achievement) => (
                    <AchievementBadge
                      key={achievement._id}
                      achievement={achievement}
                    />
                  ))
                )}
              </div>
            </Card>

          </div>
        </div>

        {/* Workout Log Modal */}
        <WorkoutLogModal
          show={showWorkoutModal}
          onClose={() => setShowWorkoutModal(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
            queryClient.invalidateQueries({ queryKey: ['achievements'] });
          }}
        />
      </div>
    </div>
  );
};

// Helper function to calculate current streak
function calculateStreak(workouts: any[]): number {
  if (workouts.length === 0) return 0;
  
  const sortedWorkouts = workouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let streak = 0;
  let currentDate = new Date();
  
  for (const workout of sortedWorkouts) {
    const workoutDate = new Date(workout.date);
    const daysDiff = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
      currentDate = workoutDate;
    } else {
      break;
    }
  }
  
  return streak;
}

export default TrainingDashboard;
