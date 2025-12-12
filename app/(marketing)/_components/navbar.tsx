"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { verticalFadeIn } from "@/lib/animations";

export function Navbar() {
  return (
    <motion.nav
      initial="initial"
      animate="animate"
      variants={verticalFadeIn}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          CareUp
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-primary transition-colors">
          Fonctionnalités
        </Link>
        <Link href="#about" className="hover:text-primary transition-colors">
          À propos
        </Link>
        <div className="h-4 w-px bg-slate-200" />
        <Link href="/sign-up?role=medical" className="text-blue-600 hover:text-blue-700 transition-colors">
          Vous êtes un service de santé ?
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <Button variant="ghost" size="sm">
            Se connecter
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm">S'inscrire</Button>
        </Link>
      </div>
    </motion.nav>
  );
}
