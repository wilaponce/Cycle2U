import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface AnimatedButtonProps extends HTMLMotionProps < 'button' > {
  children: React.ReactNode;
  className ? : string;
}

const AnimatedButton: React.FC < AnimatedButtonProps > = ({ children, className, ...props }) => {
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