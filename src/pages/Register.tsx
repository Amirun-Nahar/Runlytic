import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormData {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  photoURL: yup.string().url('Invalid URL').required('Photo URL is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
});

const Register = () => {
  const { isDarkMode } = useTheme();
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const password = watch('password', '');
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const { register, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign in with Google');
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Marathon Hub</title>
      </Helmet>
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url("https://media.cntraveler.com/photos/6604663c52f6820ec0b6d0a0/16:9/w_1920,c_limit/CNT_wide_marathon.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Background overlay with gradient patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
          }`} />
          <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
          }`} />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </div>

        <div className="relative z-10 max-w-md w-full space-y-8 bg-marathon-light/95 dark:bg-marathon-dark-surface/95 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div>
            <h2 className="mt-2 text-center text-4xl font-extrabold font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="mt-2 text-center text-sm text-marathon-secondary dark:text-marathon-dark-secondary font-poppins">
              Join us on your marathon journey
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" className="text-marathon-primary font-poppins" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="John Doe"
                className="font-poppins"
                {...registerField('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-marathon-primary font-poppins">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" className="text-marathon-primary font-poppins" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                className="font-poppins"
                {...registerField('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-marathon-primary font-poppins">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="photoURL" value="Photo URL" className="text-marathon-primary font-poppins" />
              </div>
              <TextInput
                id="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="font-poppins"
                {...registerField('photoURL')}
              />
              {errors.photoURL && (
                <p className="mt-1 text-sm text-marathon-primary font-poppins">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" className="text-marathon-primary font-poppins" />
              </div>
              <TextInput
                id="password"
                type="password"
                className="font-poppins"
                {...registerField('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-marathon-primary font-poppins">
                  {errors.password.message}
                </p>
              )}
              
              {/* Password Requirements */}
              <div className="mt-2 space-y-1">
                <p className={`text-sm ${hasUpperCase ? 'text-marathon-accent' : 'text-marathon-secondary'} font-poppins flex items-center`}>
                  <span className={`mr-2 ${hasUpperCase ? 'text-marathon-accent' : 'text-marathon-secondary'}`}>
                    {hasUpperCase ? '✓' : '○'}
                  </span>
                  Must have an uppercase letter
                </p>
                <p className={`text-sm ${hasLowerCase ? 'text-marathon-accent' : 'text-marathon-secondary'} font-poppins flex items-center`}>
                  <span className={`mr-2 ${hasLowerCase ? 'text-marathon-accent' : 'text-marathon-secondary'}`}>
                    {hasLowerCase ? '✓' : '○'}
                  </span>
                  Must have a lowercase letter
                </p>
                <p className={`text-sm ${hasMinLength ? 'text-marathon-accent' : 'text-marathon-secondary'} font-poppins flex items-center`}>
                  <span className={`mr-2 ${hasMinLength ? 'text-marathon-accent' : 'text-marathon-secondary'}`}>
                    {hasMinLength ? '✓' : '○'}
                  </span>
                  Length must be at least 6 characters
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-marathon-primary hover:bg-marathon-secondary text-marathon-light font-poppins transition-all duration-300"
            >
              Register
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-marathon-accent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-marathon-light text-marathon-secondary font-poppins">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full font-poppins border border-marathon-accent hover:bg-marathon-accent hover:text-marathon-light transition-all duration-300"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>

            <p className="mt-2 text-center text-sm text-marathon-secondary font-poppins">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-marathon-primary hover:text-marathon-accent transition-colors duration-300"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register; 