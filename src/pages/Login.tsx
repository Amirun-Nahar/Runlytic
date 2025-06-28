import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, googleSignIn } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Marathon Hub</title>
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
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-marathon-secondary dark:text-marathon-dark-secondary font-poppins">
              Sign in to continue your journey
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" className="text-marathon-primary dark:text-marathon-dark-primary font-poppins" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                className="font-poppins dark:bg-marathon-dark-bg dark:border-marathon-dark-accent"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-marathon-primary dark:text-marathon-dark-primary font-poppins">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" className="text-marathon-primary dark:text-marathon-dark-primary font-poppins" />
              </div>
              <TextInput
                id="password"
                type="password"
                className="font-poppins dark:bg-marathon-dark-bg dark:border-marathon-dark-accent"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-marathon-primary dark:text-marathon-dark-primary font-poppins">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-marathon-primary hover:bg-marathon-secondary dark:bg-marathon-dark-primary dark:hover:bg-marathon-dark-secondary text-marathon-light font-poppins transition-all duration-300"
            >
              Sign in
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-marathon-accent dark:border-marathon-dark-accent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-marathon-light dark:bg-marathon-dark-surface text-marathon-secondary dark:text-marathon-dark-secondary font-poppins">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full font-poppins border border-marathon-accent dark:border-marathon-dark-accent hover:bg-marathon-accent dark:hover:bg-marathon-dark-accent hover:text-marathon-light transition-all duration-300"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>

            <p className="mt-2 text-center text-sm text-marathon-secondary dark:text-marathon-dark-secondary font-poppins">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-marathon-primary dark:text-marathon-dark-primary hover:text-marathon-accent dark:hover:text-marathon-dark-accent transition-colors duration-300"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

 