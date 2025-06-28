import { Spinner } from 'flowbite-react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner = ({ fullScreen = false }: LoadingSpinnerProps) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50'
    : 'min-h-[60vh]';

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 