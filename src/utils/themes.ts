import type { WeatherTheme } from '../types/weather';

export interface WeatherThemeConfig {
  name: string;
  gradient: string;
  icon: string;
}

export const WEATHER_THEMES: Record<WeatherTheme, WeatherThemeConfig> = {
  sunny: {
    name: '晴天',
    gradient: 'bg-gradient-to-br from-[#FFB347] to-[#FFCC33]',
    icon: '☀️',
  },
  rainy: {
    name: '降雨',
    gradient: 'bg-gradient-to-br from-[#4A90E2] to-[#7B68EE]',
    icon: '🌧️',
  },
  snowy: {
    name: '下雪',
    gradient: 'bg-gradient-to-br from-[#E8E8E8] to-[#B0C4DE]',
    icon: '❄️',
  },
  windy: {
    name: '大风',
    gradient: 'bg-gradient-to-br from-[#87CEEB] to-[#98D8C8]',
    icon: '💨',
  },
};
