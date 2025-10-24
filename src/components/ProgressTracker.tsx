import React, { useState } from 'react';
import { Card, Button, Badge, Modal, TextInput, Select, Textarea } from 'flowbite-react';
import { HiPlus, HiTrendingUp, HiFire, HiCalendar, HiChartBar } from 'react-icons/hi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../utils/axiosSecure';
import { useAuth } from '../contexts/AuthContext';

interface ProgressEntry {
  _id: string;
  type: 'run' | 'walk' | 'cross_training' | 'rest';
  distance: number;
  duration: number;
  pace: number;
  notes?: string;
  weather?: string;
  difficulty?: number;
  mood?: string;
  isRestDay: boolean;
  date: string;
}

interface ProgressStats {
  totalStats: {
    totalDistance: number;
    totalDuration: number;
    totalActivities: number;
    averagePace: number;
    averageDifficulty: number;
  };
  typeBreakdown: Array<{
    _id: string;
    count: number;
    totalDistance: number;
    totalDuration: number;
  }>;
  weeklyProgress: Array<{
    _id: { year: number; week: number };
    totalDistance: number;
    totalDuration: number;
    activityCount: number;
  }>;
}

const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'run' as const,
    distance: '',
    duration: '',
    notes: '',
    weather: '',
    difficulty: '',
    mood: '',
    isRestDay: false
  });
  const queryClient = useQueryClient();

  // Fetch progress entries
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['progress', user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get('/progress?limit=10');
      return response.data;
    },
    enabled: !!user
  });

  // Fetch progress statistics
  const { data: stats, isLoading: statsLoading } = useQuery<ProgressStats>({
    queryKey: ['progressStats', user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get('/progress/stats?period=30');
      return response.data;
    },
    enabled: !!user
  });

  // Fetch training streak
  const { data: streakData } = useQuery({
    queryKey: ['trainingStreak', user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get('/progress/streak');
      return response.data;
    },
    enabled: !!user
  });

  // Add progress entry mutation
  const addProgressMutation = useMutation({
    mutationFn: async (entry: any) => {
      const response = await axiosSecure.post('/progress', entry);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['progressStats'] });
      queryClient.invalidateQueries({ queryKey: ['trainingStreak'] });
      setShowAddModal(false);
      setNewEntry({
        type: 'run',
        distance: '',
        duration: '',
        notes: '',
        weather: '',
        difficulty: '',
        mood: '',
        isRestDay: false
      });
    }
  });

  const handleAddProgress = () => {
    const entry = {
      ...newEntry,
      distance: parseFloat(newEntry.distance) || 0,
      duration: parseFloat(newEntry.duration) || 0,
      difficulty: newEntry.difficulty ? parseInt(newEntry.difficulty) : undefined
    };
    addProgressMutation.mutate(entry);
  };

  const formatPace = (pace: number) => {
    if (!pace) return 'N/A';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')} min/km`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'run': return '🏃‍♂️';
      case 'walk': return '🚶‍♂️';
      case 'cross_training': return '💪';
      case 'rest': return '😴';
      default: return '🏃‍♂️';
    }
  };

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'excellent': return 'green';
      case 'good': return 'blue';
      case 'okay': return 'yellow';
      case 'tough': return 'orange';
      case 'difficult': return 'red';
      default: return 'gray';
    }
  };

  if (progressLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marathon-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Progress Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your training progress and stay motivated
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-marathon-primary hover:bg-marathon-secondary text-white"
        >
          <HiPlus className="mr-2" />
          Add Activity
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Distance</p>
              <p className="text-2xl font-bold">
                {stats?.totalStats?.totalDistance?.toFixed(1) || 0} km
              </p>
            </div>
            <HiTrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Training Streak</p>
              <p className="text-2xl font-bold">
                {streakData?.streak || 0} days
              </p>
            </div>
            <HiFire className="w-8 h-8 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Activities</p>
              <p className="text-2xl font-bold">
                {stats?.totalStats?.totalActivities || 0}
              </p>
            </div>
            <HiChartBar className="w-8 h-8 text-purple-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Avg Pace</p>
              <p className="text-2xl font-bold">
                {formatPace(stats?.totalStats?.averagePace || 0)}
              </p>
            </div>
            <HiCalendar className="w-8 h-8 text-orange-200" />
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Activities
          </h3>
        </div>
        
        {progressData?.progress?.length > 0 ? (
          <div className="space-y-3">
            {progressData.progress.map((entry: ProgressEntry) => (
              <div key={entry._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getActivityIcon(entry.type)}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {entry.type.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {entry.distance > 0 && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
                      <p className="font-semibold">{entry.distance} km</p>
                    </div>
                  )}
                  
                  {entry.duration > 0 && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                      <p className="font-semibold">{entry.duration} min</p>
                    </div>
                  )}
                  
                  {entry.pace && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pace</p>
                      <p className="font-semibold">{formatPace(entry.pace)}</p>
                    </div>
                  )}
                  
                  {entry.mood && (
                    <Badge color={getMoodColor(entry.mood)}>
                      {entry.mood}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <HiChartBar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No activities recorded yet. Start tracking your progress!
            </p>
          </div>
        )}
      </Card>

      {/* Add Activity Modal */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <Modal.Header>Add New Activity</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activity Type
              </label>
              <Select
                value={newEntry.type}
                onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as any })}
              >
                <option value="run">Run</option>
                <option value="walk">Walk</option>
                <option value="cross_training">Cross Training</option>
                <option value="rest">Rest Day</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distance (km)
                </label>
                <TextInput
                  type="number"
                  step="0.1"
                  value={newEntry.distance}
                  onChange={(e) => setNewEntry({ ...newEntry, distance: e.target.value })}
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (min)
                </label>
                <TextInput
                  type="number"
                  value={newEntry.duration}
                  onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weather
                </label>
                <Select
                  value={newEntry.weather}
                  onChange={(e) => setNewEntry({ ...newEntry, weather: e.target.value })}
                >
                  <option value="">Select weather</option>
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="snowy">Snowy</option>
                  <option value="hot">Hot</option>
                  <option value="cold">Cold</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty (1-10)
                </label>
                <TextInput
                  type="number"
                  min="1"
                  max="10"
                  value={newEntry.difficulty}
                  onChange={(e) => setNewEntry({ ...newEntry, difficulty: e.target.value })}
                  placeholder="5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <Select
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
              >
                <option value="">Select mood</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="okay">Okay</option>
                <option value="tough">Tough</option>
                <option value="difficult">Difficult</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes
              </label>
              <Textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="How did it feel? Any observations?"
                rows={3}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleAddProgress}
            disabled={addProgressMutation.isPending}
            className="bg-marathon-primary hover:bg-marathon-secondary text-white"
          >
            {addProgressMutation.isPending ? 'Adding...' : 'Add Activity'}
          </Button>
          <Button color="gray" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProgressTracker;
