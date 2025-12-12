"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { signIn } from "@/lib/auth-client";
import { verticalFadeIn } from "@/lib/animations";
import { Label } from "@/components/ui/label";
import {
  MobileLogo,
  FormError,
  EmailInput,
  PasswordInputField,
  SubmitButton,
  AuthSeparator,
} from "../_components";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError(error.message || "Une erreur est survenue lors de la connexion");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
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
          Bon retour parmi nous
        </h1>
        <p className="text-slate-600">
          Connectez-vous pour accéder à votre espace
        </p>
      </motion.div>

      <motion.form
        variants={verticalFadeIn}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && <FormError message={error} />}

        <EmailInput value={email} onChange={setEmail} />

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium">
            Mot de passe
          </Label>
          <PasswordInputField
            id="password"
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>

        <SubmitButton isLoading={isLoading} loadingText="Connexion en cours...">
          Se connecter
        </SubmitButton>
      </motion.form>

      <AuthSeparator />

      <motion.div variants={verticalFadeIn} className="text-center">
        <p className="text-slate-600">
          Pas encore de compte ?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
