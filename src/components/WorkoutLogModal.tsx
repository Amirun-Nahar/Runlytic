import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface WorkoutFormData {
  date: string;
  type: 'easy' | 'tempo' | 'interval' | 'long' | 'recovery';
  distance: number;
  duration: number; // minutes
  pace: number; // minutes per km
  notes?: string;
  weather?: string;
  effort: number;
}

interface WorkoutLogModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const schema = yup.object().shape({
  date: yup.string().required('Date is required'),
  type: yup.string().oneOf(['easy', 'tempo', 'interval', 'long', 'recovery']).required('Workout type is required'),
  distance: yup.number().positive('Distance must be positive').required('Distance is required'),
  duration: yup.number().positive('Duration must be positive').required('Duration is required'),
  pace: yup.number().positive('Pace must be positive').required('Pace is required'),
  notes: yup.string().optional(),
  weather: yup.string().optional(),
  effort: yup.number().min(1).max(5).required('Effort level is required'),
});

const WorkoutLogModal = ({ show, onClose, onSuccess }: WorkoutLogModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<WorkoutFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      effort: 3,
    },
  });

  const watchedDistance = watch('distance');
  const watchedDuration = watch('duration');

  // Auto-calculate pace when distance or duration changes
  React.useEffect(() => {
    if (watchedDistance && watchedDuration && watchedDistance > 0 && watchedDuration > 0) {
      const calculatedPace = watchedDuration / watchedDistance;
      setValue('pace', Math.round(calculatedPace * 100) / 100);
    }
  }, [watchedDistance, watchedDuration, setValue]);

  const logWorkoutMutation = useMutation({
    mutationFn: async (data: WorkoutFormData) => {
      // Save to localStorage for demo purposes with error handling
      let existingWorkouts = [];
      try {
        const stored = localStorage.getItem('demoWorkouts');
        if (stored) {
          existingWorkouts = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to parse existing workouts from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('demoWorkouts');
        existingWorkouts = [];
      }
      
      const newWorkout = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      existingWorkouts.push(newWorkout);
      localStorage.setItem('demoWorkouts', JSON.stringify(existingWorkouts));
      
      // Simulate API delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: 'Workout logged successfully!' } });
        }, 1000);
      });
    },
    onSuccess: () => {
      toast.success('Workout logged successfully! (Demo mode)');
      onSuccess();
      onClose();
      reset();
    },
    onError: () => {
      toast.error('Workout logging is not available yet. This feature is coming soon!');
    },
  });

  const onSubmit = async (data: WorkoutFormData) => {
    setIsSubmitting(true);
    try {
      await logWorkoutMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const workoutTypes = [
    { value: 'easy', label: 'Easy Run', description: 'Comfortable pace, conversational' },
    { value: 'tempo', label: 'Tempo Run', description: 'Moderately hard, sustainable effort' },
    { value: 'interval', label: 'Interval Training', description: 'High intensity intervals' },
    { value: 'long', label: 'Long Run', description: 'Extended distance at easy pace' },
    { value: 'recovery', label: 'Recovery Run', description: 'Very easy pace for recovery' },
  ];

  const weatherOptions = [
    'Sunny',
    'Cloudy',
    'Rainy',
    'Windy',
    'Hot',
    'Cold',
    'Humid',
    'Perfect',
  ];

  return (
    <Modal show={show} onClose={onClose} size="2xl">
      <Modal.Header>Log New Workout</Modal.Header>
      <Modal.Body>
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Demo Mode:</strong> Workout logging is currently in development. Your data will be simulated for demonstration purposes.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <TextInput
                id="date"
                type="date"
                {...register('date')}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Workout Type" />
              </div>
              <Select
                id="type"
                {...register('type')}
                className={errors.type ? 'border-red-500' : ''}
              >
                <option value="">Select workout type</option>
                {workoutTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="distance" value="Distance (km)" />
              </div>
              <TextInput
                id="distance"
                type="number"
                step="0.1"
                min="0"
                {...register('distance', { valueAsNumber: true })}
                className={errors.distance ? 'border-red-500' : ''}
              />
              {errors.distance && (
                <p className="mt-1 text-sm text-red-600">{errors.distance.message}</p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="duration" value="Duration (minutes)" />
              </div>
              <TextInput
                id="duration"
                type="number"
                min="0"
                {...register('duration', { valueAsNumber: true })}
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="pace" value="Pace (min/km)" />
              </div>
              <TextInput
                id="pace"
                type="number"
                step="0.01"
                min="0"
                {...register('pace', { valueAsNumber: true })}
                className={errors.pace ? 'border-red-500' : ''}
              />
              {errors.pace && (
                <p className="mt-1 text-sm text-red-600">{errors.pace.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="effort" value="Effort Level (1-5)" />
              </div>
              <Select
                id="effort"
                {...register('effort', { valueAsNumber: true })}
                className={errors.effort ? 'border-red-500' : ''}
              >
                <option value={1}>1 - Very Easy</option>
                <option value={2}>2 - Easy</option>
                <option value={3}>3 - Moderate</option>
                <option value={4}>4 - Hard</option>
                <option value={5}>5 - Maximum</option>
              </Select>
              {errors.effort && (
                <p className="mt-1 text-sm text-red-600">{errors.effort.message}</p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="weather" value="Weather (Optional)" />
              </div>
              <Select
                id="weather"
                {...register('weather')}
              >
                <option value="">Select weather</option>
                {weatherOptions.map((weather) => (
                  <option key={weather} value={weather}>
                    {weather}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="notes" value="Notes (Optional)" />
            </div>
            <Textarea
              id="notes"
              rows={3}
              placeholder="How did the workout feel? Any observations..."
              {...register('notes')}
            />
          </div>

          {/* Workout Type Descriptions */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Workout Type Guide</h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {workoutTypes.map((type) => (
                <div key={type.value} className="flex justify-between">
                  <span className="font-medium">{type.label}:</span>
                  <span>{type.description}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-marathon-secondary hover:bg-marathon-accent text-white"
        >
          {isSubmitting ? 'Logging...' : 'Log Workout'}
        </Button>
        <Button
          color="gray"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkoutLogModal;
