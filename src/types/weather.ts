export type WeatherTheme = 'sunny' | 'rainy' | 'snowy' | 'windy';

export type City = 'beijing' | 'shanghai' | 'shenzhen';

export interface CityInfo {
  id: City;
  name: string;
  locationId: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  theme: WeatherTheme;
  lastUpdated: number;
}

export interface WeatherState {
  currentCity: City;
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export type WeatherAction =
  | { type: 'SET_CITY'; payload: City }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DATA'; payload: WeatherData };

export interface CacheData {
  data: WeatherData;
  timestamp: number;
}
