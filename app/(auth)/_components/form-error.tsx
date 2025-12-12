"use client";

import { motion } from "motion/react";

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
    >
      {message}
    </motion.div>
  );
}

