import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      className={className}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;