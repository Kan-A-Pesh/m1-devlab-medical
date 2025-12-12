"use client";

import { motion } from "motion/react";
import { pageTransition, transitionDuration, transitionEasing } from "@/lib/animations";

interface PageTemplateProps {
  children: React.ReactNode;
}

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{
        duration: transitionDuration.normal,
        ease: transitionEasing.easeInOut,
      }}
    >
      {children}
    </motion.div>
  );
}

