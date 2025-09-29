import { motion } from 'motion/react';
import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;