import { motion } from 'framer-motion';

export default function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded shadow bg-white p-4 hover:shadow-md"
    >
      {children}
    </motion.div>
  );
}