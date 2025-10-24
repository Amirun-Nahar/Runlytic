import { useState } from 'react';
import { Modal, Button, Checkbox } from 'flowbite-react';
import { HiX } from 'react-icons/hi';

interface UserPreferences {
  preferredDistance: string[];
  maxTravelDistance: number;
  preferredDifficulty: string[];
  preferredTerrain: string[];
  budgetRange: [number, number];
  preferredMonths: string[];
  weatherPreference: string[];
}

interface RecommendationFiltersProps {
  show: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

const RecommendationFilters = ({ show, onClose, preferences, onSave }: RecommendationFiltersProps) => {
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  const handleDistanceChange = (distance: string, checked: boolean) => {
    if (checked) {
      setLocalPreferences(prev => ({
        ...prev,
        preferredDistance: [...prev.preferredDistance, distance]
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        preferredDistance: prev.preferredDistance.filter(d => d !== distance)
      }));
    }
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setLocalPreferences(prev => ({
        ...prev,
        preferredDifficulty: [...prev.preferredDifficulty, difficulty]
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        preferredDifficulty: prev.preferredDifficulty.filter(d => d !== difficulty)
      }));
    }
  };

  const handleTerrainChange = (terrain: string, checked: boolean) => {
    if (checked) {
      setLocalPreferences(prev => ({
        ...prev,
        preferredTerrain: [...prev.preferredTerrain, terrain]
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        preferredTerrain: prev.preferredTerrain.filter(t => t !== terrain)
      }));
    }
  };

  const handleWeatherChange = (weather: string, checked: boolean) => {
    if (checked) {
      setLocalPreferences(prev => ({
        ...prev,
        weatherPreference: [...prev.weatherPreference, weather]
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        weatherPreference: prev.weatherPreference.filter(w => w !== weather)
      }));
    }
  };

  const handleMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setLocalPreferences(prev => ({
        ...prev,
        preferredMonths: [...prev.preferredMonths, month]
      }));
    } else {
      setLocalPreferences(prev => ({
        ...prev,
        preferredMonths: prev.preferredMonths.filter(m => m !== month)
      }));
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="4xl">
      <Modal.Header>
        <div className="flex items-center justify-between w-full">
          <span>Customize Your Preferences</span>
          <Button color="gray" size="sm" onClick={onClose}>
            <HiX className="w-4 h-4" />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-8">
          {/* Distance Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferred Distances</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['3k', '5k', '10k', '21k', '42k'].map((distance) => (
                <label key={distance} className="flex items-center">
                  <Checkbox
                    checked={localPreferences.preferredDistance.includes(distance)}
                    onChange={(e) => handleDistanceChange(distance, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{distance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Difficulty Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'beginner', label: 'Beginner', description: 'Perfect for first-time runners' },
                { value: 'intermediate', label: 'Intermediate', description: 'Some running experience required' },
                { value: 'advanced', label: 'Advanced', description: 'Experienced runners only' }
              ].map((difficulty) => (
                <label key={difficulty.value} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Checkbox
                    checked={localPreferences.preferredDifficulty.includes(difficulty.value)}
                    onChange={(e) => handleDifficultyChange(difficulty.value, e.target.checked)}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{difficulty.label}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{difficulty.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Terrain Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferred Terrain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'flat', label: 'Flat', description: 'Minimal elevation' },
                { value: 'hilly', label: 'Hilly', description: 'Moderate elevation' },
                { value: 'mountain', label: 'Mountain', description: 'High elevation' },
                { value: 'mixed', label: 'Mixed', description: 'Varied terrain' }
              ].map((terrain) => (
                <label key={terrain.value} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Checkbox
                    checked={localPreferences.preferredTerrain.includes(terrain.value)}
                    onChange={(e) => handleTerrainChange(terrain.value, e.target.checked)}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{terrain.label}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{terrain.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Range</h3>
            <div className="px-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>${localPreferences.budgetRange[0]}</span>
                <span>${localPreferences.budgetRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={localPreferences.budgetRange[1]}
                onChange={(e) => setLocalPreferences(prev => ({
                  ...prev,
                  budgetRange: [prev.budgetRange[0], parseInt(e.target.value)]
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Travel Distance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Max Travel Distance</h3>
            <div className="px-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>0 km</span>
                <span>{localPreferences.maxTravelDistance} km</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={localPreferences.maxTravelDistance}
                onChange={(e) => setLocalPreferences(prev => ({
                  ...prev,
                  maxTravelDistance: parseInt(e.target.value)
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Preferred Months */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferred Months</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month) => (
                <label key={month} className="flex items-center">
                  <Checkbox
                    checked={localPreferences.preferredMonths.includes(month)}
                    onChange={(e) => handleMonthChange(month, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{month.slice(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>


          {/* Weather Preferences - Enhanced */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weather Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['sunny', 'cloudy', 'cool', 'warm', 'rainy', 'any'].map((weather) => (
                <label key={weather} className="flex items-center">
                  <Checkbox
                    checked={localPreferences.weatherPreference.includes(weather)}
                    onChange={(e) => handleWeatherChange(weather, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{weather}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              💡 We use OpenWeather API to match your preferences with actual weather forecasts
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSave}
          className="bg-marathon-secondary hover:bg-marathon-accent text-white"
        >
          Save Preferences
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecommendationFilters;
