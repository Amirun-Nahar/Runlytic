import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Button, Label, TextInput, Modal } from 'flowbite-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import axiosSecure from '../utils/axiosSecure';
import toast from 'react-hot-toast';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { HiCalendar, HiLocationMarker, HiUsers } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingBar from '../components/LoadingBar';

interface Marathon {
  _id: string;
  title: string;
  location: string;
  startRegistrationDate: string;
  endRegistrationDate: string;
  marathonStartDate: string;
  image: string;
  runningDistance: string;
  description: string;
  totalRegistrations: number;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  contactNo: string;
  additionalInfo?: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  contactNo: yup.string().required('Contact number is required'),
  additionalInfo: yup.string().optional(),
});

const MarathonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
  });

  const { data: marathon, isLoading: marathonLoading, error: marathonError } = useQuery<Marathon>({
    queryKey: ['marathon', id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/marathons/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const { data: isRegistered } = useQuery({
    queryKey: ['isRegistered', id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/applications/check/${id}`);
      return response.data;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      const registrationData = {
        ...data,
        marathonId: id,
        marathonTitle: marathon?.title,
        marathonStartDate: marathon?.marathonStartDate,
        userEmail: user?.email,
        registeredAt: new Date(),
      };
      return axiosSecure.post('/registrations', registrationData);
    },
    onSuccess: () => {
      // Batch our query invalidations
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey[0];
          return queryKey === 'my-applications' || 
                 queryKey === 'registration' || 
                 queryKey === 'marathon';
        },
      });
      
      toast.success('Successfully registered for the marathon!');
      setShowModal(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to register for the marathon');
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    registerMutation.mutate(data);
  };

  const isRegistrationOpen = marathon && 
    new Date() >= new Date(marathon.startRegistrationDate) && 
    new Date() <= new Date(marathon.endRegistrationDate);

  const isRegistrationNotStarted = marathon ? 
    new Date() < new Date(marathon.startRegistrationDate) : 
    false;

  const renderTime = ({ days, hours, minutes }: { days: number, hours: number, minutes: number }) => {
    return (
      <div className="text-center">
        <div className="text-3xl font-bold">{days}d {hours}h {minutes}m</div>
        <div className="text-sm">until start</div>
      </div>
    );
  };

  if (marathonLoading) {
    return <LoadingBar />;
  }

  if (marathonError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Marathon</h2>
        <p className="text-gray-600">
          We couldn't load the marathon details. Please try again later.
        </p>
      </div>
    );
  }

  if (!marathon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Marathon Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          The marathon you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const timeUntilStart = Math.max(0, new Date(marathon.marathonStartDate).getTime() - new Date().getTime());

  return (
    <>
      <Helmet>
        <title>{marathon.title} - RunLytic</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={marathon.image}
            alt={marathon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
                {marathon.title}
              </h1>
              <p className="text-xl text-white/90">
                {marathon.runningDistance} Marathon
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="space-y-4">
              <p className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                <HiLocationMarker className="mr-2" />
                {marathon.location}
              </p>
              <p className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                <HiCalendar className="mr-2" />
                Event Date: {new Date(marathon.marathonStartDate).toLocaleDateString()}
              </p>
              <p className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                <HiUsers className="mr-2" />
                Total Registrations: {marathon.totalRegistrations}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">About This Marathon</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {marathon.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Registration Period</h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Start: {new Date(marathon.startRegistrationDate).toLocaleDateString()}
                </p>
              <p className="text-gray-700 dark:text-gray-300">
                  End: {new Date(marathon.endRegistrationDate).toLocaleDateString()}
              </p>
              </div>
            </div>

            {user && !isRegistered && (
              <Button
                onClick={() => setShowModal(true)}
                disabled={!isRegistrationOpen || registerMutation.isPending}
                className={`w-full ${
                  isRegistrationOpen
                    ? 'bg-marathon-secondary hover:bg-marathon-accent'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
              >
                {registerMutation.isPending 
                  ? 'Registering...' 
                  : isRegistrationOpen 
                    ? 'Register Now'
                    : isRegistrationNotStarted
                      ? 'Marathon Registration Not Started Yet'
                      : 'Registration Closed'}
              </Button>
            )}

            {isRegistered && (
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-700 dark:text-green-200">
                  You're already registered for this marathon!
                </p>
              </div>
            )}

            {!user && (
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-200">
                  Please login to register for this marathon.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Countdown Timer */}
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4 text-center dark:text-white">Time Until Start</h3>
              <div className="flex justify-center">
              <CountdownCircleTimer
                isPlaying
                  duration={timeUntilStart / 1000}
                  colors={['#00C853', '#FFB74D', '#FF5252']}
                  colorsTime={[7 * 24 * 60 * 60, 3 * 24 * 60 * 60, 0]}
                size={200}
                  strokeWidth={12}
              >
                  {({ elapsedTime }) => {
                    const remainingTime = timeUntilStart / 1000 - elapsedTime;
                  const days = Math.floor(remainingTime / (24 * 60 * 60));
                    const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
                    const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
                  return renderTime({ days, hours, minutes });
                }}
              </CountdownCircleTimer>
              </div>
            </div>

            {/* Marathon Stats */}
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-bold mb-4 text-center dark:text-white">Marathon Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-marathon-secondary">{marathon.runningDistance}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
            </div>
            <div className="text-center">
                  <p className="text-3xl font-bold text-marathon-secondary">{marathon.totalRegistrations}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Registered Runners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onClose={() => !registerMutation.isPending && setShowModal(false)}>
          <Modal.Header>Register for {marathon.title}</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="marathonTitle" value="Marathon" />
                </div>
                <TextInput
                  id="marathonTitle"
                  value={marathon.title}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="marathonStartDate" value="Event Date" />
                </div>
                <TextInput
                  id="marathonStartDate"
                  value={new Date(marathon.marathonStartDate).toLocaleDateString()}
                  readOnly
                  disabled
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="contactNo" value="Contact Number" />
                </div>
                <TextInput
                  id="contactNo"
                  type="tel"
                  {...register('contactNo')}
                />
                {errors.contactNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNo.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="additionalInfo" value="Additional Information (Optional)" />
                </div>
                <TextInput
                  id="additionalInfo"
                  type="text"
                  {...register('additionalInfo')}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              onClick={handleSubmit(onSubmit)}
              disabled={registerMutation.isPending}
              className="bg-marathon-secondary hover:bg-marathon-accent text-white"
            >
              {registerMutation.isPending ? 'Registering...' : 'Register'}
            </Button>
            <Button 
              color="gray" 
              onClick={() => !registerMutation.isPending && setShowModal(false)}
              disabled={registerMutation.isPending}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MarathonDetails; 