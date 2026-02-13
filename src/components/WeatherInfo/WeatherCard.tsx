import { motion } from 'framer-motion';
import { useWeather } from '../../hooks/useWeather';
import { WeatherBackground } from '../WeatherBackground';
import { Temperature } from './Temperature';
import { Humidity } from './Humidity';
import { WindSpeed } from './WindSpeed';
import { WeatherCondition } from './WeatherCondition';

export function WeatherCard() {
  const { weatherData, isLoading, error } = useWeather();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <>
      <WeatherBackground theme={weatherData.theme} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card max-w-md w-full mx-auto"
        style={{
          WebkitBackdropFilter: 'blur(20px)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <WeatherCondition condition={weatherData.condition} />
        <Temperature temp={weatherData.temp} />
        <div className="flex justify-between gap-4 mt-6">
          <Humidity humidity={weatherData.humidity} />
          <WindSpeed windSpeed={weatherData.windSpeed} />
        </div>
        <LastUpdated timestamp={weatherData.lastUpdated} />
      </motion.div>
    </>
  );
}

/**
 * Loading skeleton state
 */
function LoadingSkeleton() {
  return (
    <div className="glass-card max-w-md w-full mx-auto">
      <div className="space-y-6">
        <div className="skeleton h-8 w-32 rounded-card" />
        <div className="skeleton h-32 w-48 mx-auto rounded-card" />
        <div className="flex justify-between gap-4">
          <div className="skeleton h-20 flex-1 rounded-card" />
          <div className="skeleton h-20 flex-1 rounded-card" />
        </div>
      </div>
    </div>
  );
}

/**
 * Error state with retry button
 */
function ErrorState({ error }: { error: string }) {
  const { retry } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card max-w-md w-full mx-auto text-center"
      style={{
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2 text-white">获取天气失败</h3>
      <p className="text-white/80 mb-6">{error}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={retry}
        className="px-6 py-3 bg-white text-gray-900 rounded-pill font-medium"
      >
        重试
      </motion.button>
    </motion.div>
  );
}

/**
 * Last updated timestamp
 */
function LastUpdated({ timestamp }: { timestamp: number }) {
  const timeAgo = getTimeAgo(timestamp);

  return (
    <div className="text-center text-white/60 text-sm mt-6">
      最后更新: {timeAgo}
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return '刚刚';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小时前`;
  return `${Math.floor(seconds / 86400)} 天前`;
}
