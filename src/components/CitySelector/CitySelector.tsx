import { motion } from 'framer-motion';
import type { City } from '../../types/weather';
import { useWeather } from '../../hooks/useWeather';

const CITIES: Record<City, string> = {
  beijing: '北京',
  shanghai: '上海',
  shenzhen: '深圳',
};

export function CitySelector() {
  const { currentCity, setCity, isLoading } = useWeather();

  return (
    <div className="flex justify-center gap-4 mb-8">
      {(Object.keys(CITIES) as City[]).map((city) => (
        <CityButton
          key={city}
          city={city}
          label={CITIES[city]}
          isSelected={currentCity === city}
          isLoading={isLoading}
          onSelect={() => setCity(city)}
        />
      ))}
    </div>
  );
}

interface CityButtonProps {
  city: City;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

function CityButton({ city: _city, label, isSelected, isLoading, onSelect }: CityButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onSelect}
      disabled={isLoading}
      className={`
        relative px-6 py-3 rounded-pill font-medium text-base
        transition-all duration-200 ease-out
        ${
          isSelected
            ? 'bg-white text-gray-900 shadow-soft'
            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-glass'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {label}
      {isSelected && (
        <motion.span
          layoutId="activeCity"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
