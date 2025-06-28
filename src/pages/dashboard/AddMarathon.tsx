import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axiosSecure from '../../utils/axiosSecure';
import { useTheme } from '../../contexts/ThemeContext';

interface MarathonFormData {
  title: string;
  location: string;
  startRegistrationDate: Date;
  endRegistrationDate: Date;
  marathonStartDate: Date;
  runningDistance: string;
  description: string;
  image: string;
  organizer: string;
  createdAt: Date;
  totalRegistrations: number;
}

const AddMarathon = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<MarathonFormData>({
    title: '',
    location: '',
    startRegistrationDate: new Date(),
    endRegistrationDate: new Date(),
    marathonStartDate: new Date(),
    runningDistance: '3k',
    description: '',
    image: '',
    organizer: user?.email || '',
    createdAt: new Date(),
    totalRegistrations: 0,
  });
  const [imageError, setImageError] = useState(false);

  const validateDates = () => {
    const now = new Date();
    const { startRegistrationDate, endRegistrationDate, marathonStartDate } = formData;

    if (startRegistrationDate < now) {
      toast.error('Start registration date cannot be in the past');
      return false;
    }

    if (endRegistrationDate <= startRegistrationDate) {
      toast.error('End registration date must be after start registration date');
      return false;
    }

    if (marathonStartDate <= endRegistrationDate) {
      toast.error('Marathon start date must be after end registration date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    try {
      // Update createdAt to current time just before submission
      const dataToSubmit = {
        ...formData,
        createdAt: new Date()
      };

      await axiosSecure.post('/marathons', dataToSubmit);

      // Reset form to initial state
      setFormData({
        title: '',
        location: '',
        startRegistrationDate: new Date(),
        endRegistrationDate: new Date(),
        marathonStartDate: new Date(),
        runningDistance: '3k',
        description: '',
        image: '',
        organizer: user?.email || '',
        createdAt: new Date(),
        totalRegistrations: 0
      });

      toast.success('Marathon created successfully!');
      navigate('/dashboard/my-marathons');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create marathon');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <>
      <Helmet>
        <title>Add Marathon - RunLytic</title>
      </Helmet>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">Create New Marathon</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Marathon Title" className="dark:text-white" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Enter marathon title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location" className="dark:text-white" />
            </div>
            <TextInput
              id="location"
              type="text"
              placeholder="Enter marathon location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <Label value="Image URL" className="dark:text-white" />
            <TextInput
              type="url"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImageError(false);
              }}
              placeholder="Enter marathon image URL"
              required
              className={`w-full ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
            />
            {formData.image && (
              <div className="mt-2">
                {imageError ? (
                  <div className="text-red-500 text-sm">Invalid image URL</div>
                ) : (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border dark:border-gray-600">
                    <img
                      src={formData.image}
                      alt="Marathon preview"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="runningDistance" value="Running Distance" className="dark:text-white" />
            </div>
            <Select
              id="runningDistance"
              value={formData.runningDistance}
              onChange={(e) => setFormData({ ...formData, runningDistance: e.target.value })}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="25k">25K</option>
              <option value="10k">10K</option>
              <option value="3k">3K</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label value="Start Registration Date" className="dark:text-white" />
              <DatePicker
                selected={formData.startRegistrationDate}
                onChange={(date: Date) => setFormData({ ...formData, startRegistrationDate: date })}
                className={`w-full rounded-lg border p-2.5 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                    : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }`}
                required
                minDate={new Date()}
                placeholderText="Select start date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
              />
            </div>

            <div>
              <Label value="End Registration Date" className="dark:text-white" />
              <DatePicker
                selected={formData.endRegistrationDate}
                onChange={(date: Date) => setFormData({ ...formData, endRegistrationDate: date })}
                className={`w-full rounded-lg border p-2.5 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                    : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }`}
                required
                minDate={formData.startRegistrationDate}
                placeholderText="Select end date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
              />
            </div>

            <div>
              <Label value="Marathon Date" className="dark:text-white" />
              <DatePicker
                selected={formData.marathonStartDate}
                onChange={(date: Date) => setFormData({ ...formData, marathonStartDate: date })}
                className={`w-full rounded-lg border p-2.5 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                    : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }`}
                required
                minDate={formData.endRegistrationDate}
                placeholderText="Select marathon date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" className="dark:text-white" />
            </div>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="Enter marathon description"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-marathon-primary hover:bg-marathon-secondary text-white transition-colors duration-300"
          >
            Create Marathon
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddMarathon; 