import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import { useAuth } from '../../contexts/AuthContext';
import axiosSecure from '../../utils/axiosSecure';
import toast from 'react-hot-toast';
import MarathonCard from '../../components/MarathonCard';
import UpdateMarathonModal from '../../components/UpdateMarathonModal';
import { Helmet } from 'react-helmet-async';

interface Marathon {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  startRegistrationDate: string;
  endRegistrationDate: string;
  marathonStartDate: string;
  runningDistance: string;
  totalRegistrations: number;
}

const MyMarathons = () => {
  const { user } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState<Marathon | null>(null);

  const { data: marathons = [], isLoading, refetch } = useQuery<Marathon[]>({
    queryKey: ['myMarathons', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/marathons/organizer/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleEdit = (marathon: Marathon) => {
    setSelectedMarathon(marathon);
    setShowUpdateModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/marathons/${id}`);
      toast.success('Marathon deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete marathon');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Helmet>
        <title>My Marathons | RunLytic</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center font-playfair">
          My Marathons
        </h1>

      {marathons.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-2">No marathons found</h3>
            <p className="text-gray-600">You haven't created any marathons yet.</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <MarathonCard
              key={marathon._id}
              marathon={marathon}
                onEdit={() => handleEdit(marathon)}
                onDelete={() => handleDelete(marathon._id)}
            />
          ))}
        </div>
      )}
      </div>

      {selectedMarathon && (
        <UpdateMarathonModal
          show={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedMarathon(null);
          }}
          marathon={selectedMarathon}
          onSuccess={() => {
            refetch();
            setShowUpdateModal(false);
            setSelectedMarathon(null);
          }}
        />
      )}
    </div>
  );
};

export default MyMarathons; 