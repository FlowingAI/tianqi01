import { motion } from 'framer-motion';

export function Temperature({ temp }: { temp: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="text-center my-8"
    >
      <div className="text-8xl font-bold text-white mb-2">{temp}°</div>
      <div className="text-white/80 text-lg">当前温度</div>
    </motion.div>
  );
}
