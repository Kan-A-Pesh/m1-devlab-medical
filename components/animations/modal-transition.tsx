"use client";

import { motion } from "motion/react";
import { modalBackdrop, modalContent, transitionDuration, transitionEasing } from "@/lib/animations";

interface ModalBackdropProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function ModalBackdrop({ children, onClick }: ModalBackdropProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalBackdrop}
      transition={{
        duration: transitionDuration.normal,
        ease: transitionEasing.easeOut,
      }}
      onClick={onClick}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalContent}
      transition={{
        duration: transitionDuration.normal,
        ease: transitionEasing.easeOut,
      }}
      onClick={(event) => event.stopPropagation()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

