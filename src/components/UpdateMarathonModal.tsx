import { useForm } from 'react-hook-form';
import { Button, Label, Modal, Select, TextInput, Textarea } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosSecure from '../utils/axiosSecure';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

interface UpdateMarathonModalProps {
  show: boolean;
  onClose: () => void;
  marathon: Marathon;
  onSuccess: () => void;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().url('Invalid URL').required('Image URL is required'),
  startRegistrationDate: yup.date().required('Registration start date is required'),
  endRegistrationDate: yup
    .date()
    .required('Registration end date is required')
    .min(
      yup.ref('startRegistrationDate'),
      'End date must be after start date'
    ),
  marathonStartDate: yup
    .date()
    .required('Marathon start date is required')
    .min(
      yup.ref('endRegistrationDate'),
      'Marathon date must be after registration end date'
    ),
  runningDistance: yup.string().required('Distance is required'),
});

const UpdateMarathonModal = ({
  show,
  onClose,
  marathon,
  onSuccess,
}: UpdateMarathonModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: marathon.title,
      location: marathon.location,
      description: marathon.description,
      image: marathon.image,
      startRegistrationDate: new Date(marathon.startRegistrationDate),
      endRegistrationDate: new Date(marathon.endRegistrationDate),
      marathonStartDate: new Date(marathon.marathonStartDate),
      runningDistance: marathon.runningDistance,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Validate dates
      const now = new Date();
      if (new Date(data.startRegistrationDate) < now) {
        toast.error('Start registration date cannot be in the past');
        return;
      }

      if (new Date(data.endRegistrationDate) <= new Date(data.startRegistrationDate)) {
        toast.error('End registration date must be after start registration date');
        return;
      }

      if (new Date(data.marathonStartDate) <= new Date(data.endRegistrationDate)) {
        toast.error('Marathon start date must be after end registration date');
        return;
      }

      await axiosSecure.patch(`/marathons/${marathon._id}`, data);
      toast.success('Marathon updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to update marathon');
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Update Marathon</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Enter marathon title"
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location" />
            </div>
            <TextInput
              id="location"
              type="text"
              placeholder="Enter location"
              {...register('location')}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder="Enter description"
              rows={4}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="image" value="Image URL" />
            </div>
            <TextInput
              id="image"
              type="url"
              placeholder="Enter image URL"
              {...register('image')}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
            {watch('image') && (
              <img
                src={watch('image')}
                alt="Marathon preview"
                className="mt-2 max-w-xs rounded-lg shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="startRegistrationDate" value="Registration Start" />
              </div>
              <DatePicker
                selected={watch('startRegistrationDate')}
                onChange={(date) => setValue('startRegistrationDate', date || new Date())}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select start date"
              />
              {errors.startRegistrationDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startRegistrationDate.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="endRegistrationDate" value="Registration End" />
              </div>
              <DatePicker
                selected={watch('endRegistrationDate')}
                onChange={(date) => setValue('endRegistrationDate', date || new Date())}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                minDate={watch('startRegistrationDate')}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select end date"
              />
              {errors.endRegistrationDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endRegistrationDate.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="marathonStartDate" value="Marathon Date" />
              </div>
              <DatePicker
                selected={watch('marathonStartDate')}
                onChange={(date) => setValue('marathonStartDate', date || new Date())}
                className="w-full rounded-lg border border-gray-300 p-2.5"
                minDate={watch('endRegistrationDate')}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select marathon date"
              />
              {errors.marathonStartDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.marathonStartDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="runningDistance" value="Running Distance" />
            </div>
            <Select id="runningDistance" {...register('runningDistance')}>
              <option value="25k">25K</option>
              <option value="10k">10K</option>
              <option value="3k">3K</option>
            </Select>
            {errors.runningDistance && (
              <p className="mt-1 text-sm text-red-600">
                {errors.runningDistance.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Marathon</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateMarathonModal; 