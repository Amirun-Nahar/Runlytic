import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Button, Badge, Progress } from 'flowbite-react';
import { HiStar, HiLocationMarker, HiCalendar, HiUsers, HiHeart, HiFilter, HiLightningBolt } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import axiosSecure from '../utils/axiosSecure';
import { Helmet } from 'react-helmet-async';
import RecommendationFilters from '../components/RecommendationFilters';

interface Marathon {
  _id: string;
  title: string;
  location: string;
  marathonStartDate: string;
  image: string;
  runningDistance: string;
  totalRegistrations: number;
  price: number;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  terrain: 'flat' | 'hilly' | 'mountain' | 'mixed';
  weather: string;
  amenities: string[];
}

interface UserPreferences {
  preferredDistance: string[];
  maxTravelDistance: number;
  preferredDifficulty: string[];
  preferredTerrain: string[];
  budgetRange: [number, number];
  preferredMonths: string[];
  weatherPreference: string[];
}

interface RecommendationScore {
  marathon: Marathon;
  score: number;
  reasons: string[];
  warnings?: string[];
  compatibility: {
    distance: number;
    location: number;
    difficulty: number;
    budget: number;
    timing: number;
  };
}

const MarathonRecommendations = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredDistance: ['10k', '21k'],
    maxTravelDistance: 100,
    preferredDifficulty: ['beginner', 'intermediate'],
    preferredTerrain: ['flat', 'mixed'],
    budgetRange: [0, 200],
    preferredMonths: [],
    weatherPreference: ['sunny', 'cloudy']
  });

  // Fetch user's training data for personalized recommendations - DISABLED (endpoint doesn't exist)
  const { data: trainingData } = useQuery({
    queryKey: ['userTrainingData'],
    queryFn: async () => {
      const response = await axiosSecure.get('/training/user-stats');
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, // Disabled to prevent 404 errors
  });

  // Fetch all marathons
  const { data: allMarathons = [] } = useQuery<Marathon[]>({
    queryKey: ['allMarathons'],
    queryFn: async () => {
      const response = await axiosSecure.get('/marathons');
      return response.data;
    },
  });

  // Fetch AI-powered recommendations
  const { data: aiRecommendations, error: recommendationsError, isLoading: recommendationsLoading } = useQuery<{
    recommendations: RecommendationScore[];
    analysis: string;
    totalMarathons: number;
    timestamp: string;
  }>({
    queryKey: ['marathonRecommendations', preferences],
    queryFn: async () => {
      const response = await axiosSecure.post('/recommendations', {
        preferences,
        trainingData,
        userId: user?.uid
      });
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.message?.includes('AI service')) {
        return failureCount < 2; // Retry for AI service errors
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnWindowFocus: false,
  });

  // Calculate personalized recommendations
  const calculateRecommendations = (marathons: Marathon[]): RecommendationScore[] => {
    return marathons.map(marathon => {
      let score = 0;
      const reasons: string[] = [];
      const compatibility = {
        distance: 0,
        location: 0,
        difficulty: 0,
        budget: 0,
        timing: 0
      };

      // Distance compatibility
      if (preferences.preferredDistance.includes(marathon.runningDistance)) {
        score += 30;
        compatibility.distance = 100;
        reasons.push(`Perfect distance match (${marathon.runningDistance})`);
      } else {
        compatibility.distance = 50;
      }

      // Difficulty compatibility
      if (preferences.preferredDifficulty.includes(marathon.difficulty)) {
        score += 25;
        compatibility.difficulty = 100;
        reasons.push(`Matches your skill level (${marathon.difficulty})`);
      } else {
        compatibility.difficulty = 50;
      }

      // Budget compatibility
      if (marathon.price >= preferences.budgetRange[0] && marathon.price <= preferences.budgetRange[1]) {
        score += 20;
        compatibility.budget = 100;
        reasons.push(`Within your budget ($${marathon.price})`);
      } else {
        compatibility.budget = Math.max(0, 100 - Math.abs(marathon.price - preferences.budgetRange[1]) * 2);
      }

      // Weather preference (using OpenWeather API data)
      if (marathon.weather && preferences.weatherPreference.includes(marathon.weather.toLowerCase())) {
        score += 15;
        reasons.push(`Expected weather matches preference (${marathon.weather})`);
      }

      // Terrain preference
      if (marathon.terrain && preferences.preferredTerrain.includes(marathon.terrain)) {
        score += 10;
        reasons.push(`Preferred terrain (${marathon.terrain})`);
      }


      // Training data integration
      if (trainingData) {
        const avgPace = trainingData.averagePace || 0;
        const targetPace = marathon.difficulty === 'beginner' ? 6 : marathon.difficulty === 'intermediate' ? 5 : 4;
        
        if (avgPace > 0 && Math.abs(avgPace - targetPace) <= 1) {
          score += 20;
          reasons.push('Pace matches your training level');
        }
      }

      return {
        marathon,
        score: Math.min(100, score),
        reasons,
        compatibility
      };
    }).sort((a, b) => b.score - a.score);
  };

  // Use AI recommendations if available, otherwise fallback to calculated recommendations
  const personalizedRecommendations = aiRecommendations?.recommendations || calculateRecommendations(allMarathons);
  const topRecommendations = personalizedRecommendations.slice(0, 6);
  
  // Debug logging
  console.log('AI Recommendations data:', aiRecommendations);
  console.log('Personalized recommendations:', personalizedRecommendations);
  console.log('Top recommendations:', topRecommendations);

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Marathon Recommendations - RunLytic</title>
      </Helmet>

      {/* Background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-primary/20' : 'bg-marathon-primary/20'
        }`} />
        <div className={`absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full blur-3xl ${
          isDarkMode ? 'bg-marathon-dark-secondary/20' : 'bg-marathon-secondary/20'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold font-playfair bg-gradient-to-r from-marathon-primary via-marathon-secondary to-marathon-accent bg-clip-text text-transparent">
              Smart Recommendations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              AI-powered marathon suggestions tailored just for you
            </p>
          </div>
          <Button
            onClick={() => setShowFilters(true)}
            className="bg-marathon-secondary hover:bg-marathon-accent text-white"
          >
            <HiFilter className="mr-2" />
            Customize Preferences
          </Button>
        </div>

        {/* Recommendation Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-primary/10 rounded-lg">
                <HiLightningBolt className="w-6 h-6 text-marathon-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topRecommendations.length > 0 ? Math.round(topRecommendations[0].score) : 0}%
                </p>
              </div>
            </div>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-secondary/10 rounded-lg">
                <HiStar className="w-6 h-6 text-marathon-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Perfect Matches</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topRecommendations.filter(r => r.score >= 80).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center">
              <div className="p-2 bg-marathon-accent/10 rounded-lg">
                <HiHeart className="w-6 h-6 text-marathon-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weather Matches</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topRecommendations.filter(r => r.reasons.some(reason => reason.includes('weather'))).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Analysis */}
        {aiRecommendations?.analysis && (
          <div className="mb-8">
            <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-marathon-primary/10 rounded-lg">
                  <HiLightningBolt className="w-6 h-6 text-marathon-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {aiRecommendations.analysis}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Top Recommendations */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Perfect Matches
            </h2>
            {aiRecommendations && (
              <Badge color="success" className="flex items-center gap-1">
                <HiLightningBolt className="w-3 h-3" />
                AI Powered
              </Badge>
            )}
          </div>
          
          {recommendationsLoading ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marathon-primary mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI is analyzing your preferences...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI is finding the perfect marathons for you based on your training data and preferences.
                </p>
              </div>
            </div>
          ) : recommendationsError ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <HiLightningBolt className="w-16 h-16 text-marathon-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI Recommendations Temporarily Unavailable
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our AI recommendation engine is experiencing issues. Showing basic recommendations below.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-marathon-primary hover:bg-marathon-secondary text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : topRecommendations.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <HiStar className="w-16 h-16 text-marathon-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Recommendations Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Adjust your preferences to get personalized recommendations.
                </p>
                <Button
                  onClick={() => setShowFilters(true)}
                  className="bg-marathon-primary hover:bg-marathon-secondary text-white"
                >
                  <HiFilter className="mr-2" />
                  Customize Preferences
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRecommendations.map((recommendation) => (
              <Card key={recommendation.marathon._id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="relative">
                  <img
                    src={recommendation.marathon.image}
                    alt={recommendation.marathon.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge color="success" className="flex items-center gap-1">
                      <HiStar className="w-3 h-3" />
                      {Math.round(recommendation.score)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {recommendation.marathon.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <HiLocationMarker className="w-4 h-4 mr-2" />
                      {recommendation.marathon.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <HiCalendar className="w-4 h-4 mr-2" />
                      {new Date(recommendation.marathon.marathonStartDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <HiUsers className="w-4 h-4 mr-2" />
                      {recommendation.marathon.totalRegistrations} runners
                    </div>
                  </div>

                  {/* Compatibility Scores */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Compatibility</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Distance</span>
                        <span>{recommendation.compatibility.distance}%</span>
                      </div>
                      <Progress progress={recommendation.compatibility.distance} color="blue" size="sm" />
                      
                      <div className="flex justify-between text-xs">
                        <span>Difficulty</span>
                        <span>{recommendation.compatibility.difficulty}%</span>
                      </div>
                      <Progress progress={recommendation.compatibility.difficulty} color="green" size="sm" />
                      
                      <div className="flex justify-between text-xs">
                        <span>Budget</span>
                        <span>{recommendation.compatibility.budget}%</span>
                      </div>
                      <Progress progress={recommendation.compatibility.budget} color="yellow" size="sm" />
                    </div>
                  </div>

                  {/* Why this recommendation */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {aiRecommendations ? 'AI Analysis' : 'Why this match?'}
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {recommendation.reasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-marathon-secondary mr-1">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                    {recommendation.warnings && recommendation.warnings.length > 0 && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
                        <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">⚠️ Considerations:</p>
                        {recommendation.warnings.map((warning: string, idx: number) => (
                          <p key={idx} className="text-yellow-700 dark:text-yellow-300">• {warning}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-marathon-secondary hover:bg-marathon-accent text-white"
                    onClick={() => window.location.href = `/marathons/${recommendation.marathon._id}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
            </div>
          )}
        </div>

        {/* Weather-Based Recommendations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Weather-Optimized Recommendations
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              🌤️ Our AI analyzes current weather conditions and forecasts to recommend marathons with optimal running weather for your preferred conditions.
            </p>
          </div>
        </div>

        {/* Recommendation Filters Modal */}
        <RecommendationFilters
          show={showFilters}
          onClose={() => setShowFilters(false)}
          preferences={preferences}
          onSave={setPreferences}
        />
      </div>
    </div>
  );
};

export default MarathonRecommendations;
