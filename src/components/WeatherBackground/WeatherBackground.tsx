import { motion } from 'framer-motion';
import type { WeatherTheme } from '../../types/weather';
import { WEATHER_THEMES } from '../../utils/themes';

interface WeatherBackgroundProps {
  theme: WeatherTheme;
}

export function WeatherBackground({ theme }: WeatherBackgroundProps) {
  const themeConfig = WEATHER_THEMES[theme];

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 -z-10 ${themeConfig.gradient}`}
      style={{ willChange: 'opacity' }}
    >
      {/* Sun rays animation for sunny theme */}
      {theme === 'sunny' && <SunRays />}

      {/* Rain drops for rainy theme */}
      {theme === 'rainy' && <RainDrops />}

      {/* Snowflakes for snowy theme */}
      {theme === 'snowy' && <Snowflakes />}

      {/* Wind lines for windy theme */}
      {theme === 'windy' && <WindLines />}
    </motion.div>
  );
}

/**
 * Sun rays rotating animation
 */
function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-96 h-96"
        style={{ willChange: 'transform' }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-32 bg-yellow-300/30 rounded-full origin-top"
            style={{
              transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Floating clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -200, opacity: 0.3 }}
          animate={{ x: window.innerWidth + 200, opacity: 0.6 }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            delay: i * 5,
            ease: 'linear',
          }}
          className="absolute top-1/4 w-32 h-16 bg-white/20 rounded-full blur-xl"
          style={{ top: `${20 + i * 20}%`, willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
}

/**
 * Rain drops falling animation
 */
function RainDrops() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0.6 }}
          animate={{ y: window.innerHeight + 20, opacity: 0 }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
          className="absolute w-0.5 h-8 bg-blue-200/50 rounded-full"
          style={{ left: `${Math.random() * 100}%`, willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
}

/**
 * Snowflakes falling animation
 */
function Snowflakes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: 0, opacity: 0.8, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            x: Math.sin(i) * 100,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Wind lines flowing animation
 */
function WindLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: window.innerWidth + 200, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
          className="absolute h-0.5 bg-white/30 rounded-full"
          style={{
            top: `${10 + i * 5}%`,
            width: `${100 + Math.random() * 150}px`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
