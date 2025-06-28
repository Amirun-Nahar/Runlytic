import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../utils/axiosSecure';
import MarathonCard from '../components/MarathonCard';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineLightningBolt, HiOutlineUserGroup, HiOutlineBadgeCheck } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { data: featuredMarathons } = useQuery({
    queryKey: ['featuredMarathons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons/featured');
      return response.data;
    },
  });

  const { data: upcomingMarathons } = useQuery({
    queryKey: ['upcomingMarathons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons/upcoming');
      return response.data;
    },
  });

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

      {/* Banner Carousel */}
      <div className="h-[85vh]">
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
                  <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
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

      {/* Featured Marathons Section */}
      <div className="py-20 relative">
        {/* Background overlay with gradient patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
          }`} />
          <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
          }`} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              Featured Events
            </h2>
            <p className="text-lg font-poppins text-gray-800 dark:text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              Discover our handpicked selection of premier marathons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMarathons?.slice(0, 6).map((marathon: any) => (
              <MarathonCard key={marathon._id} marathon={marathon} />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Marathons Section */}
      <div className="py-20 relative">
        {/* Background overlay with gradient patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
          }`} />
          <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
          }`} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-lg font-poppins text-gray-600 dark:text-gray-300">
              Plan your next race with our upcoming marathons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingMarathons?.slice(0, 6).map((marathon: any) => (
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

      {/* Features Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-marathon-dark' : 'bg-marathon-light'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <HiOutlineLocationMarker className="w-8 h-8 text-marathon-secondary" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
                World-Class Locations
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Experience running in carefully selected scenic routes across the globe
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <HiOutlineCalendar className="w-8 h-8 text-marathon-secondary" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
                Easy Registration
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Simple and secure registration process for all events
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <HiOutlineLightningBolt className="w-8 h-8 text-marathon-secondary" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
                Runner Support
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Dedicated support team to help you every step of the way
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>
                Join Our Running Community
              </h2>
              <p className={`mb-8 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Connect with fellow runners, share experiences, and be part of a supportive community that celebrates every milestone.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-marathon-light'}`}>
                    <HiOutlineUserGroup className="w-6 h-6 text-marathon-secondary" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>10K+</h4>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Active Runners</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-marathon-light'}`}>
                    <HiOutlineBadgeCheck className="w-6 h-6 text-marathon-secondary" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-marathon-primary'}`}>50+</h4>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Events Yearly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.ibb.co/27gSycbB/image.png" 
                alt="Running Community"
                className="rounded-lg shadow-xl"
              />
              {!user && (
                <div className="absolute -bottom-6 -left-6 bg-marathon-secondary text-white p-6 rounded-lg">
                  <p className="text-2xl font-bold">Join Today</p>
                  <p>Start your running journey</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-20 relative">
        {/* Background overlay with gradient patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
          }`} />
          <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
            isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
          }`} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-lg font-poppins text-gray-600 dark:text-gray-300">
              Be inspired by runners who transformed their lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successStories.map((story, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-lg backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gray-900/85 text-marathon-light' 
                    : 'bg-white/85 text-marathon-primary'
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-playfair">{story.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-poppins">
                    {story.age} • {story.location}
                  </p>
                  <p className="text-sm italic mb-4 font-poppins">"{story.quote}"</p>
                  <div className="text-sm font-poppins">
                    <p className="text-marathon-secondary font-semibold">{story.achievement}</p>
                    <p className="text-gray-600 dark:text-gray-300">{story.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Essential Running Gear Section */}
      <div className={`py-16 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-br from-marathon-dark-primary/20 via-marathon-secondary/10 to-transparent' 
              : 'bg-gradient-to-br from-marathon-light/50 via-marathon-primary/5 to-transparent'
          }`} />
          <div className={`absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-tr from-marathon-dark-primary/20 via-marathon-secondary/10 to-transparent' 
              : 'bg-gradient-to-tr from-marathon-light/50 via-marathon-primary/5 to-transparent'
          }`} />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <span className={`inline-block font-playfair text-lg mb-2 ${
              isDarkMode ? 'text-marathon-secondary' : 'text-marathon-primary'
            }`}>
              For Your Journey
            </span>
            <h2 className={`text-5xl font-playfair font-bold mb-4 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-marathon-secondary via-marathon-accent to-marathon-light text-transparent bg-clip-text' 
                : 'from-marathon-primary via-marathon-secondary to-marathon-accent text-transparent bg-clip-text'
            }`}>
              Essential Running Gear
            </h2>
            <p className={`text-lg mb-6 max-w-2xl mx-auto font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Quality gear that every marathon runner needs for success
            </p>
            <div className={`w-24 h-1 mx-auto bg-gradient-to-r ${
              isDarkMode 
                ? 'from-marathon-secondary via-marathon-accent to-marathon-light' 
                : 'from-marathon-primary via-marathon-secondary to-marathon-accent'
            }`} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {essentialGear.map((item, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800/80 backdrop-blur-sm hover:shadow-marathon-secondary/20' 
                    : 'bg-white/90 backdrop-blur-sm hover:shadow-marathon-primary/20'
                }`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter blur-[0.5px] group-hover:blur-[1px]"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode 
                      ? 'from-gray-900/90 via-gray-900/70 to-gray-900/40' 
                      : 'from-marathon-primary/90 via-marathon-primary/70 to-marathon-primary/40'
                  } transition-opacity duration-500`} />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className={`font-playfair text-lg font-bold mb-3 px-3 py-1.5 rounded-lg ${
                    isDarkMode 
                      ? 'text-marathon-secondary bg-gray-900/85' 
                      : 'text-marathon-primary bg-white/85'
                  } backdrop-blur-sm shadow-lg`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-3 font-medium max-w-[90%] px-3 py-2 rounded-lg relative ${
                    isDarkMode 
                      ? 'text-marathon-light bg-gray-900/85' 
                      : 'text-marathon-primary bg-white/85'
                  } backdrop-blur-sm shadow-lg before:content-['"'] before:absolute before:-left-1 before:-top-2 before:text-2xl before:opacity-70 after:content-['"'] after:absolute after:-right-1 after:-bottom-4 after:text-2xl after:opacity-70`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className={`py-20 ${isDarkMode ? 'bg-marathon-dark-primary' : 'bg-marathon-primary'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of runners and discover your next challenge
            </p>
            <Button
              as={Link}
              to="/register"
              size="xl"
              className={`bg-marathon-secondary hover:bg-marathon-accent dark:bg-marathon-dark-secondary dark:hover:bg-marathon-dark-accent text-white transition-colors duration-300 text-lg px-8`}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 