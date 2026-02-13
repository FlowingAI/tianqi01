import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { WeatherData, WeatherTheme, City, CacheData } from '../types/weather';

const API_BASE_URL = 'https://devapi.qweather.com/v7';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// City location IDs
const CITY_LOCATION_IDS: Record<City, string> = {
  beijing: '101010100',
  shanghai: '101020100',
  shenzhen: '101280601',
};

// Cache storage
const cache = new Map<string, CacheData>();

class WeatherApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * Get cache key for a city
   */
  private getCacheKey(city: City): string {
    return `weather_${city}`;
  }

  /**
   * Get cached weather data if valid
   */
  private getCachedData(city: City): WeatherData | null {
    const cached = cache.get(this.getCacheKey(city));
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      cache.delete(this.getCacheKey(city));
      return null;
    }

    return cached.data;
  }

  /**
   * Set cached weather data
   */
  private setCachedData(city: City, data: WeatherData): void {
    cache.set(this.getCacheKey(city), {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Map weather condition code to theme
   */
  private mapWeatherTheme(text: string): WeatherTheme {
    if (text.includes('雨')) return 'rainy';
    if (text.includes('雪')) return 'snowy';
    if (text.includes('风')) return 'windy';
    return 'sunny';
  }

  /**
   * Fetch weather data for a city
   */
  async fetchWeather(city: City): Promise<WeatherData> {
    // Check cache first
    const cached = this.getCachedData(city);
    if (cached) {
      return cached;
    }

    try {
      const locationId = CITY_LOCATION_IDS[city];
      const response = await this.client.get(`/weather/now`, {
        params: {
          location: locationId,
          key: API_KEY,
        },
      });

      const { now } = response.data;
      const weatherData: WeatherData = {
        temp: parseInt(now.temp),
        humidity: parseInt(now.humidity),
        windSpeed: parseInt(now.windSpeed),
        condition: now.text,
        theme: this.mapWeatherTheme(now.text),
        lastUpdated: Date.now(),
      };

      // Cache the data
      this.setCachedData(city, weatherData);

      return weatherData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('API 请求过于频繁，请稍后再试');
        }
        if (error.response?.status === 401) {
          throw new Error('API 密钥无效，请检查配置');
        }
      }
      throw new Error('获取天气数据失败，请检查网络连接');
    }
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    cache.clear();
  }

  /**
   * Get cache expiry time for a city
   */
  getCacheExpiry(city: City): number | null {
    const cached = cache.get(this.getCacheKey(city));
    if (!cached) return null;

    const expiryTime = cached.timestamp + CACHE_DURATION;
    return Math.max(0, expiryTime - Date.now());
  }
}

// Export singleton instance
export const weatherApi = new WeatherApiService();
