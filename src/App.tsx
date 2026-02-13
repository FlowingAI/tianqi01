import { motion } from 'framer-motion';
import { WeatherProvider } from './hooks/useWeather';
import { CitySelector } from './components/CitySelector';
import { WeatherCard } from './components/WeatherInfo';

function App() {
  return (
    <WeatherProvider>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Page load stagger animation */}
        <div className="w-full max-w-4xl">
          {/* Header with title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
          >
            实时天气
          </motion.h1>

          {/* City Selector */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CitySelector />
          </motion.div>

          {/* Weather Card */}
          <WeatherCard />
        </div>
      </main>
    </WeatherProvider>
  );
}

export default App;
