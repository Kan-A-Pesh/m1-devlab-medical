"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { verticalFadeIn } from "@/lib/animations";

export function AuthSeparator() {
  return (
    <motion.div variants={verticalFadeIn} className="relative">
      <Separator className="bg-slate-200" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-4 text-sm text-slate-500">
        ou
      </span>
    </motion.div>
  );
}

