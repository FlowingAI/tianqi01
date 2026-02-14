import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { WeatherData, WeatherTheme, City, CacheData } from '../types/weather';

// OpenWeatherMap API (免费、稳定、无需认证)
const OPENWEATHER_APP_ID = 'YOUR_OPENWEATHER_APP_ID'; // 需要替换

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// 城市名称到 OpenWeatherMap 城市名的映射
const CITY_NAME_MAP: Record<City, string> = {
  beijing: 'Beijing',
  shanghai: 'Shanghai',
  shenzhen: 'Shenzhen',
};

// OpenWeatherMap 天气代码映射
const WEATHER_CODE_MAP: Record<string, string> = {
  '01d': '晴',
  '02d': '多云',
  '03d': '阴',
  '04d': '雷阵雨',
  '09d': '小雨',
  '10d': '中雨',
  '11d': '大雨',
  '13d': '小雪',
  '50d': '晴',
};

// Cache storage
const cache = new Map<string, CacheData>();

class WeatherApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5',
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
   * Map weather code to theme
   */
  private mapWeatherTheme(code: string): WeatherTheme {
    const codeNum = parseInt(code.substring(0, 2));

    // 01d-09d: 白天
    if (codeNum >= 1 && codeNum <= 9) return 'sunny';

    // 10d-19d: 多云/阴
    if (codeNum >= 10 && codeNum <= 19) return 'sunny';

    // 20d-29d: 雨阵雨/小雨
    if (codeNum >= 20 && codeNum <= 29) return 'rainy';

    // 30d-39d: 小雪
    if (codeNum >= 30 && codeNum <= 39) return 'snowy';

    // 50d: 晴天
    if (codeNum >= 50 && codeNum <= 50) return 'sunny';

    return 'sunny';
  }

  /**
   * Map weather description to condition text
   */
  private mapWeatherCondition(code: string): string {
    const condition = WEATHER_CODE_MAP[code] || '晴';
    return condition;
  }

  /**
   * Fetch weather data for a city using OpenWeatherMap
   */
  async fetchWeather(city: City): Promise<WeatherData> {
    // Check cache first
    const cached = this.getCachedData(city);
    if (cached) {
      return cached;
    }

    try {
      const cityName = CITY_NAME_MAP[city];

      // 调用 OpenWeatherMap API
      const response = await this.client.get('', {
        params: {
          q: cityName,
          appid: OPENWEATHER_APP_ID,
          units: 'metric',
        },
      });

      const { data } = response;

      if (!data || !data.list || data.list.length === 0) {
        throw new Error('获取天气数据失败');
      }

      const weatherData = data.list[0];

      const weatherData: WeatherData = {
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity || 0,
        windSpeed: Math.round((weatherData.wind?.speed || 0) * 3.6),
        condition: this.mapWeatherCondition(weatherData.weather[0].description),
        theme: this.mapWeatherTheme(weatherData.weather[0].icon),
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
          throw new Error('API Key 无效，请检查配置');
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
}

// Export singleton instance
export const weatherApi = new WeatherApiService();
