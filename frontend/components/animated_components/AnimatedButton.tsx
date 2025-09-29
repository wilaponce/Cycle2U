import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

type AnimatedButtonProps = {
  children: ReactNode;
  className ? : string;
  onClick ? : () => void;
  type ? : 'button' | 'submit' | 'reset';
  disabled ? : boolean;
};

const AnimatedButton = ({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: AnimatedButtonProps) => {
  return (
    <motion.button
      className={className}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;