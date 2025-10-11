import { motion } from 'framer-motion';
import React from 'react';

// Define the props for the AnimatedButton, extending standard button attributes
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * A button component that uses framer-motion for animations.
 * It forwards all standard button props to the underlying motion.button element.
 */
export default function AnimatedButton({ children, ...rest }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...rest} // Pass all other props to the button
    >
      {children}
    </motion.button>
  );
}
