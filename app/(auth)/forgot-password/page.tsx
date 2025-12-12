"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { verticalFadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import {
  MobileLogo,
  FormError,
  EmailInput,
  SubmitButton,
} from "../_components";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, redirectTo: "/sign-in" }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Une erreur est survenue");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Une erreur est survenue");
    }
    setIsLoading(false);
  }

  if (isSuccess) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="space-y-8"
      >
        <motion.div variants={verticalFadeIn} className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Email envoyé !
          </h1>
          <p className="text-slate-600">
            Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous
            recevrez un lien pour réinitialiser votre mot de passe.
          </p>
        </motion.div>

        <motion.div variants={verticalFadeIn} className="space-y-4">
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 border-slate-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
      className="space-y-8"
    >
      <motion.div
        variants={verticalFadeIn}
        className="space-y-2 text-center lg:text-left"
      >
        <MobileLogo />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Mot de passe oublié ?
        </h1>
        <p className="text-slate-600">
          Entrez votre adresse email et nous vous enverrons un lien de
          réinitialisation
        </p>
      </motion.div>

      <motion.form
        variants={verticalFadeIn}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && <FormError message={error} />}

        <EmailInput value={email} onChange={setEmail} />

        <SubmitButton isLoading={isLoading} loadingText="Envoi en cours...">
          <Mail className="w-4 h-4 mr-2" />
          Envoyer le lien
        </SubmitButton>
      </motion.form>

      <motion.div variants={verticalFadeIn} className="text-center">
        <Link
          href="/sign-in"
          className="text-slate-600 hover:text-slate-700 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la connexion
        </Link>
      </motion.div>
    </motion.div>
  );
}
