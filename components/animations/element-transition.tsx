"use client";

import { motion, AnimatePresence } from "motion/react";
import { elementEnterExit, transitionDuration, transitionEasing } from "@/lib/animations";

interface ElementTransitionProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  mode?: "wait" | "sync";
}

export function ElementTransition({
  children,
  show,
  className,
  mode = "sync",
}: ElementTransitionProps) {
  return (
    <AnimatePresence mode={mode}>
      {show && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={elementEnterExit}
          transition={{
            duration: transitionDuration.normal,
            ease: transitionEasing.easeInOut,
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TransitionGroupProps {
  children: React.ReactNode;
  className?: string;
  mode?: "wait" | "sync";
}

export function TransitionGroup({ children, className, mode = "sync" }: TransitionGroupProps) {
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={elementEnterExit}
        transition={{
          duration: transitionDuration.normal,
          ease: transitionEasing.easeInOut,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

