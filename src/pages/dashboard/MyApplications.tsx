import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Table, TextInput, Label } from 'flowbite-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosSecure from '../../utils/axiosSecure';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingBar from '../../components/LoadingBar';

interface Application {
  _id: string;
  marathonId: string;
  marathonTitle: string;
  status: string;
  marathonStartDate: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  additionalInfo: string;
  userEmail: string;
}

interface UpdateFormData {
  firstName: string;
  lastName: string;
  contactNo: string;
  additionalInfo?: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  contactNo: yup.string().required('Contact number is required'),
  additionalInfo: yup.string(),
});

const MyApplications = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateFormData>({
    resolver: yupResolver(schema),
  });

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['my-applications', user?.email, searchQuery],
    queryFn: async () => {
      if (!user?.email) return [];
      const response = await axiosSecure.get(`/registrations/user/${user.email}`, {
        params: { search: searchQuery }
      });
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async () => {
    if (!selectedApplication) return;

    try {
      await axiosSecure.delete(`/registrations/${selectedApplication._id}`);
      
      // Invalidate and refetch queries
      await queryClient.invalidateQueries({
        queryKey: ['my-applications', user?.email]
      });
      
      toast.success('Registration cancelled successfully');
      setShowDeleteModal(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to cancel registration');
    }
  };

  const handleUpdate = async (data: UpdateFormData) => {
    if (!selectedApplication) return;

    try {
      await axiosSecure.patch(`/registrations/${selectedApplication._id}`, data);
      
      // Invalidate and refetch queries
      await queryClient.invalidateQueries({
        queryKey: ['my-applications', user?.email]
      });
      
      toast.success('Registration updated successfully');
      setShowUpdateModal(false);
      setSelectedApplication(null);
    } catch (error) {
      toast.error('Failed to update registration');
    }
  };

  const openUpdateModal = (application: Application) => {
    setSelectedApplication(application);
    setValue('firstName', application.firstName);
    setValue('lastName', application.lastName);
    setValue('contactNo', application.contactNo);
    setValue('additionalInfo', application.additionalInfo);
    setShowUpdateModal(true);
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <Helmet>
        <title>My Applications - RunLytic</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold dark:text-white">My Applications</h2>
        
        {/* Search Box */}
        <div className="relative w-full md:w-96">
          <TextInput
            type="search"
            icon={HiOutlineSearch}
            placeholder="Search by marathon title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
          />
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {searchQuery 
            ? 'No marathons found matching your search.'
            : 'You haven\'t applied for any marathons yet.'}
        </p>
      ) : (
        <div className="relative overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Marathon Title</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Contact</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {applications.map((application: Application) => (
                <Table.Row key={application._id}>
                  <Table.Cell className="font-medium">
                    {application.marathonTitle}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(application.marathonStartDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {`${application.firstName} ${application.lastName}`}
                  </Table.Cell>
                  <Table.Cell>{application.contactNo}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="info"
                        onClick={() => openUpdateModal(application)}
                      >
                        <HiOutlinePencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        color="failure"
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDeleteModal(true);
                        }}
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* Update Modal */}
      <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <Modal.Header>Update Registration</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="marathonTitle" value="Marathon Title" />
              </div>
              <TextInput
                id="marathonTitle"
                value={selectedApplication?.marathonTitle || ''}
                readOnly
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="marathonDate" value="Marathon Start Date" />
              </div>
              <TextInput
                id="marathonDate"
                value={selectedApplication ? new Date(selectedApplication.marathonStartDate).toLocaleDateString() : ''}
                readOnly
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="contactNo" value="Contact Number" />
              </div>
              <TextInput
                id="contactNo"
                type="tel"
                placeholder="Enter your contact number"
                {...register('contactNo')}
              />
              {errors.contactNo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contactNo.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="additionalInfo" value="Additional Information" />
              </div>
              <TextInput
                id="additionalInfo"
                type="text"
                placeholder="Any additional information (optional)"
                {...register('additionalInfo')}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button color="gray" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Registration</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="md">
        <Modal.Header>Cancel Registration</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel your registration for{' '}
              <span className="font-medium">{selectedApplication?.marathonTitle}</span>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, cancel it
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, keep it
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyApplications; 