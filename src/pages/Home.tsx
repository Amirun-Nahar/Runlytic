import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../utils/axiosSecure';
import MarathonCard from '../components/MarathonCard';
import OfflineFallback from '../components/OfflineFallback';
import { Link } from 'react-router-dom';
import { Button, Carousel, Card, TextInput } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineMail } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { data: featuredMarathons, error: featuredError, isLoading: featuredLoading } = useQuery({
    queryKey: ['featuredMarathons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons/featured');
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.name === 'BackendLoadingError' || error?.message?.includes('Backend is still starting up')) {
        return failureCount < 5; // Retry more times for backend loading
      }
      if (error?.name === 'NetworkError') {
        return failureCount < 3; // Retry for network errors
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: upcomingMarathons, error: upcomingError, isLoading: upcomingLoading } = useQuery({
    queryKey: ['upcomingMarathons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons/upcoming');
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.name === 'BackendLoadingError' || error?.message?.includes('Backend is still starting up')) {
        return failureCount < 5; // Retry more times for backend loading
      }
      if (error?.name === 'NetworkError') {
        return failureCount < 3; // Retry for network errors
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Show offline fallback if both API calls fail
  if (featuredError && upcomingError) {
    return <OfflineFallback />;
  }

  const bannerSlides = [
    {
      image: "https://www.canaanvalleyhalfmarathon.com/wp-content/uploads/2020/06/1142900_Copyof5KRaceDayWhattoExpect_080321.jpg",
      title: "Run Your Next Adventure",
      description: "Join thousands of runners in the world's most scenic marathons. Your next finish line awaits."
    },
    {
      image: "https://img.freepik.com/premium-vector/runners-are-rushing-win-marathon-sprint-joggers-sportswear-running-sport-race-athletes-challenge-jogging-long-distance-international-competition-summer-flat-vector-illustration_633472-9158.jpg",
      title: "Challenge Your Limits",
      description: "Push your boundaries and achieve new personal records with our certified marathon events."
    },
    {
      image: "https://thumbs.dreamstime.com/b/cartoon-illustration-runners-race-numbers-happily-running-together-park-blank-banner-above-them-emphasizing-318213997.jpg",
      title: "Community of Champions",
      description: "Be part of a global community of runners supporting each other towards their goals."
    }
  ];

  const successStories = [
    {
      name: "Sarah Johnson",
      age: 34,
      location: "Boston, MA",
      image: "https://i.ibb.co/FkhrSDLN/image.png",
      quote: "RunLytic helped me achieve my dream of completing the Boston Marathon. The training resources and community support were invaluable.",
      achievement: "Completed Boston Marathon in 3:45",
      story: "Started running at 30, now qualified for Boston."
    },
    {
      name: "Michael Chen",
      age: 28,
      location: "San Francisco, CA",
      image: "https://i.ibb.co/JRd92N0N/image.png",
      quote: "From couch potato to marathon finisher in 18 months. The structured programs and supportive community made it possible.",
      achievement: "Lost 30 pounds, Ran first marathon",
      story: "Transformed life through running"
    },
    {
      name: "Emma Rodriguez",
      age: 42,
      location: "Chicago, IL",
      image: "https://i.ibb.co/tGGVDjz/image.png",
      quote: "Running marathons seemed impossible at my age, but RunLytic proved me wrong. Now I'm inspiring other women over 40.",
      achievement: "Completed 5 marathons in 2 years",
      story: "Age is just a number"
    },
    {
      name: "David Park",
      age: 45,
      location: "Seattle, WA",
      image: "https://i.ibb.co/chPQvP9G/image.png",
      quote: "After my health scare, running became my therapy. RunLytic's community kept me motivated through recovery.",
      achievement: "Overcame health issues through running",
      story: "From hospital bed to finish line"
    }
  ];

  const essentialGear = [
    {
      name: "Professional Running Shoes",
      image: "https://i.ibb.co/qF5JWCGP/image.png",
      description: "Proper cushioning and support to prevent injuries during long runs"
    },
    {
      name: "Moisture-Wicking Apparel",
      image: "https://i.ibb.co/xqj03cP1/image.png",
      description: "Keeps you dry and comfortable in your marathon journey"
    },
    {
      name: "Sports Smartwatch",
      image: "https://in.amazfit.com/cdn/shop/files/20230621-201135_2048x2048_151c4a0c-9c48-433b-be4f-c13f938d009a.jpg?v=1694756919",
      description: "Track pace, distance, heart rate, and recovery metrics"
    },
    {
      name: "Hydration Belt",
      image: "https://cdn.thewirecutter.com/wp-content/media/2024/09/running-belt-2048px-3195.jpg",
      description: "Essential for maintaining hydration during long runs"
    },
    {
      name: "Recovery Roller",
      image: "https://rollrecovery.com/cdn/shop/files/12-ROLLRecovery-R4DeepTissueBodyRoller-LavaRed-MaorTiyouri-MuscleMassager-MuscleRoller-MassageRollerBackPain-FoamRoller-BodyFoamRoller-CalfPain_720x.jpg?v=1740175249",
      description: "Helps prevent muscle soreness and improves flexibility"
    },
    {
      name: "Energy Gels",
      image: "https://hips.hearstapps.com/hmg-prod/images/best-running-gels-67dc45e59bb7a.jpg?crop=0.502xw:1.00xh;0.498xw,0&resize=640:*",
      description: "Quick energy boost during long runs and race day"
    }
  ];

  return (
    <div className="min-h-screen font-montserrat">
      <Helmet>
        <title>Home - RunLytic</title>
      </Helmet>

      {/* Banner Carousel - Height adjusted to 60-70% */}
      <div className="h-[65vh]">
        <Carousel slideInterval={5000}>
          {bannerSlides.map((slide, index) => (
            <div key={index} className="relative h-full bg-marathon-dark">
              <div className="absolute inset-0">
                <img 
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className={`w-full h-full object-cover ${isDarkMode ? 'opacity-40' : 'opacity-60'}`}
                />
              </div>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-marathon-dark to-transparent' : 'bg-gradient-to-r from-marathon-primary/95 to-marathon-primary/70'}`} />
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    {slide.title.split(' ').map((word, i, arr) => 
                      i === arr.length - 1 ? 
                        <span key={i} className={`${isDarkMode ? 'text-marathon-secondary' : 'text-marathon-light'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}>{word} </span> : 
                        <span key={i}>{word} </span>
                    )}
                  </h1>
                  <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      as={Link}
                      to="/marathons"
                      size="xl"
                      className={`${isDarkMode ? 'bg-marathon-secondary hover:bg-marathon-accent' : 'bg-marathon-light hover:bg-white'} text-${isDarkMode ? 'white' : 'marathon-primary'} transition-colors duration-300 text-lg px-8`}
                    >
                      Explore Events
                    </Button>
                    {!user && (
                      <Button
                        as={Link}
                        to="/register"
                        size="xl"
                        className={`bg-transparent border-2 ${isDarkMode ? 'border-white text-white hover:bg-white hover:text-marathon-dark' : 'border-marathon-light text-white hover:bg-marathon-light hover:text-marathon-primary'} transition-colors duration-300 text-lg px-8`}
                      >
                        Join Us
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Quick Stats Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-marathon-dark-secondary' : 'bg-marathon-light'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-marathon-secondary'}`}>50+</div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Active Events</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-marathon-secondary'}`}>10K+</div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Registered Runners</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-marathon-secondary'}`}>95%</div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Success Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-marathon-secondary'}`}>4.8/5</div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Marathons Section - 4 cards per row */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              Featured Events
            </h2>
            <p className="text-lg font-poppins text-gray-800 dark:text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              Discover our handpicked selection of premier marathons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marathon-primary mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading featured marathons...</p>
              </div>
            ) : featuredError ? (
              <div className="col-span-full text-center py-8">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {featuredError?.name === 'BackendLoadingError' 
                    ? 'Server is starting up. Please wait a moment and refresh the page.'
                    : featuredError?.name === 'NetworkError'
                    ? 'Unable to connect to server. Please check your internet connection.'
                    : 'Unable to load featured marathons. Please try again later.'
                  }
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-marathon-primary hover:text-marathon-secondary underline"
                >
                  Refresh Page
                </button>
              </div>
            ) : featuredMarathons?.slice(0, 8).map((marathon: any) => (
              <MarathonCard key={marathon._id} marathon={marathon} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-marathon-dark' : 'bg-marathon-light'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Marathon Categories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Find the perfect race for your skill level</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">Beginner Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Perfect for first-time marathon runners</p>
              <Button as={Link} to="/marathons?category=beginner">Explore</Button>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">Intermediate</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For experienced runners looking for a challenge</p>
              <Button as={Link} to="/marathons?category=intermediate">Explore</Button>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">Advanced</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Challenging courses for elite runners</p>
              <Button as={Link} to="/marathons?category=advanced">Explore</Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Running tips, success stories, and training advice</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.slice(0, 3).map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <img src={story.image} alt={story.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-xl font-bold mt-4">{story.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{story.quote}</p>
                <div className="mt-4">
                  <Button as={Link} to="/blog">Read More</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-marathon-dark' : 'bg-marathon-light'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter for the latest marathon updates and training tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TextInput
                type="email"
                placeholder="Enter your email"
                icon={HiOutlineMail}
                className="flex-1 max-w-md"
              />
              <Button className="bg-marathon-secondary hover:bg-marathon-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Marathons Section - 4 cards per row */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-lg font-poppins text-gray-600 dark:text-gray-300">
              Plan your next race with our upcoming marathons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marathon-primary mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading upcoming marathons...</p>
              </div>
            ) : upcomingError ? (
              <div className="col-span-full text-center py-8">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {upcomingError?.name === 'BackendLoadingError' 
                    ? 'Server is starting up. Please wait a moment and refresh the page.'
                    : upcomingError?.name === 'NetworkError'
                    ? 'Unable to connect to server. Please check your internet connection.'
                    : 'Unable to load upcoming marathons. Please try again later.'
                  }
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-marathon-primary hover:text-marathon-secondary underline"
                >
                  Refresh Page
                </button>
              </div>
            ) : upcomingMarathons?.slice(0, 8).map((marathon: any) => (
              <MarathonCard key={marathon._id} marathon={marathon} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as={Link}
              to="/marathons"
              size="xl"
              className="bg-marathon-secondary hover:bg-marathon-accent text-white font-poppins transition-all duration-300 text-lg px-8"
            >
              View All Events
            </Button>
          </div>
        </div>
      </div>

      {/* Essential Gear Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-marathon-dark' : 'bg-marathon-light'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Essential Running Gear</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Everything you need for a successful marathon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {essentialGear.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-xl font-bold mt-4">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 