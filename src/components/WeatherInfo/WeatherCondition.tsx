import { motion } from 'framer-motion';

export function WeatherCondition({ condition }: { condition: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-3xl font-semibold text-white mb-2">{condition}</h2>
    </motion.div>
  );
}
