import { motion } from 'framer-motion';

export default function GlowEffect({ visible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: visible ? 0.3 : 0,
        scale: visible ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl rounded-lg -z-10"
    />
  );
}