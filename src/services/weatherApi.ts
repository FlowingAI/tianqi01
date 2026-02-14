import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { WeatherData, WeatherTheme, City, CacheData } from '../types/weather';

// OpenWeatherMap API (免费、稳定、无需认证)
const OPENWEATHER_APP_ID = 'YOUR_OPENWEATHER_APP_ID';

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// 城市名称到 OpenWeatherMap 城市名的映射
const CITY_NAME_MAP: Record<City, string> = {
  beijing: 'Beijing',
  shanghai: 'Shanghai',
  shenzhen: 'Shenzhen',
};

// OpenWeatherMap 天气代码映射 (使用weather[0].icon字段)
const WEATHER_CODE_MAP: Record<string, string> = {
  '01d': '晴',
  '02d': '多云',
  '03d': '阴',
  '04d': '阴',
  '09d': '小雨',
  '10d': '中雨',
  '11d': '雷阵雨',
  '13d': '小雪',
  '50d': '雾',
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

  private getCacheKey(city: City): string {
    return `weather_${city}`;
  }

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

  private setCachedData(city: City, data: WeatherData): void {
    cache.set(this.getCacheKey(city), {
      data,
      timestamp: Date.now(),
    });
  }

  private mapWeatherCodeToTheme(iconCode: string): WeatherTheme {
    // OpenWeatherMap icon codes: https://openweathermap.org/weather-conditions
    const code = iconCode.slice(0, 2); // 取前两位数字

    // 01-02: 晴天/少云
    if (code === '01' || code === '02') return 'sunny';
    // 03-04: 多云/阴
    if (code === '03' || code === '04') return 'sunny';
    // 09-11: 雨阵雨
    if (code >= '09' && code <= '11') return 'rainy';
    // 13: 雪
    if (code === '13') return 'snowy';
    // 50: 雾
    if (code === '50') return 'windy';

    return 'sunny'; // default
  }

  private mapWeatherCondition(iconCode: string): string {
    return WEATHER_CODE_MAP[iconCode] || '晴';
  }

  async fetchWeather(city: City): Promise<WeatherData> {
    const cached = this.getCachedData(city);
    if (cached) {
      return cached;
    }

    try {
      const cityName = CITY_NAME_MAP[city];

      const response = await this.client.get('/weather', {
        params: {
          q: cityName,
          appid: OPENWEATHER_APP_ID,
          units: 'metric',
        },
      });

      if (response.status !== 200 || !response.data) {
        throw new Error('获取天气数据失败');
      }

      const apiData = response.data;

      if (apiData.cod !== 200) {
        throw new Error('获取天气数据失败');
      }

      const weather = apiData.weather[0];
      const iconCode = weather.icon;

      const weatherData: WeatherData = {
        temp: Math.round(apiData.main.temp),
        humidity: apiData.main.humidity || 0,
        windSpeed: Math.round(apiData.wind?.speed || 0),
        condition: this.mapWeatherCondition(iconCode),
        theme: this.mapWeatherCodeToTheme(iconCode),
        lastUpdated: Date.now(),
      };

      this.setCachedData(city, weatherData);
      return weatherData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('获取天气数据失败');
      }
      throw error;
    }
  }

  clearCache(): void {
    cache.clear();
  }
}

export const weatherApi = new WeatherApiService();
