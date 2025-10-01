import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { easeInOut } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.5,
  ease: easeInOut,
};

const AnimatedPageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;