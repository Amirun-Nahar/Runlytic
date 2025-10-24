import { Button } from 'flowbite-react';
import { forwardRef } from 'react';

const StandardButton = forwardRef<HTMLButtonElement, any>(
  ({ variant = 'filled', className = '', children, as, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'outline':
          return 'border-2 border-marathon-primary text-marathon-primary hover:bg-marathon-primary hover:text-white';
        case 'ghost':
          return 'bg-transparent text-marathon-primary hover:bg-marathon-primary/10';
        case 'filled':
        default:
          return 'bg-marathon-primary hover:bg-marathon-secondary text-white';
      }
    };

    const Component = as || Button;

    return (
      <Component
        ref={ref}
        className={`font-poppins font-medium px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-marathon-primary/50 focus:outline-none ${getVariantClasses()} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

StandardButton.displayName = 'StandardButton';

export default StandardButton;
