import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { WeatherState, City } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

type WeatherContextType = WeatherState & {
  setCity: (city: City) => void;
  retry: () => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const STORAGE_KEY = 'selected_city';

/**
 * Weather Provider Component
 */
export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WeatherState>(() => {
    // Initialize with saved city preference
    const savedCity = localStorage.getItem(STORAGE_KEY) as City;
    return {
      currentCity: savedCity || 'beijing',
      weatherData: null,
      isLoading: true,
      error: null,
    };
  });

  /**
   * Fetch weather data for current city
   */
  const fetchWeather = async (city: City) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await weatherApi.fetchWeather(city);
      setState((prev) => ({ ...prev, weatherData: data, isLoading: false, error: null }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取天气数据失败';
      setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
    }
  };

  /**
   * Set city and fetch weather data
   */
  const setCity = (city: City) => {
    localStorage.setItem(STORAGE_KEY, city);
    setState((prev) => ({ ...prev, currentCity: city }));
    fetchWeather(city);
  };

  /**
   * Retry fetching weather data
   */
  const retry = () => {
    fetchWeather(state.currentCity);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchWeather(state.currentCity);
  }, []);

  const value: WeatherContextType = {
    ...state,
    setCity,
    retry,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

/**
 * Hook to access weather state
 */
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
}
