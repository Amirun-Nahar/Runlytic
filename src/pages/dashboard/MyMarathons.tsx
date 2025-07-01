import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Table, Button } from 'flowbite-react';
import { useAuth } from '../../contexts/AuthContext';
import axiosSecure from '../../utils/axiosSecure';
import toast from 'react-hot-toast';
import UpdateMarathonModal from '../../components/UpdateMarathonModal';
import { Helmet } from 'react-helmet-async';
import { HiPencil, HiTrash, HiEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

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
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const MyMarathons = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
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
    <div className="min-h-screen">
      <Helmet>
        <title>My Marathons | RunLytic</title>
      </Helmet>

      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-playfair">
            My Marathons
          </h1>
          <Button
            as={Link}
            to="/dashboard/add-marathon"
            className="bg-marathon-secondary hover:bg-marathon-accent"
          >
            Create New Marathon
          </Button>
        </div>

        {marathons.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-2">No marathons found</h3>
            <p className="text-gray-600 dark:text-gray-400">You haven't created any marathons yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table striped className={isDarkMode ? 'dark' : ''}>
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Distance</Table.HeadCell>
                <Table.HeadCell>Start Date</Table.HeadCell>
                <Table.HeadCell>Registrations</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {marathons.map((marathon) => (
                  <Table.Row key={marathon._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {marathon.title}
                    </Table.Cell>
                    <Table.Cell>{marathon.location}</Table.Cell>
                    <Table.Cell>{marathon.runningDistance}</Table.Cell>
                    <Table.Cell>
                      {new Date(marathon.marathonStartDate).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{marathon.totalRegistrations}</Table.Cell>
                    <Table.Cell>${marathon.price}</Table.Cell>
                    <Table.Cell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        marathon.status === 'upcoming' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : marathon.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {marathon.status.charAt(0).toUpperCase() + marathon.status.slice(1)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button
                          as={Link}
                          to={`/marathons/${marathon._id}`}
                          size="sm"
                          color="info"
                        >
                          <HiEye className="mr-1" /> View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleEdit(marathon)}
                          className="bg-marathon-primary hover:bg-marathon-secondary"
                        >
                          <HiPencil className="mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          color="failure"
                          onClick={() => handleDelete(marathon._id)}
                        >
                          <HiTrash className="mr-1" /> Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
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