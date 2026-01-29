"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { verticalFadeIn } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight, Building2, Stethoscope } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={verticalFadeIn} className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Vous êtes...
          </motion.h2>
          <motion.p variants={verticalFadeIn} className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Que vous soyez une entreprise cherchant à se conformer ou un service de santé souhaitant se digitaliser, Oxygenial est fait pour vous.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-12 hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building2 className="w-32 h-32 text-blue-600" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Une TPE / PME</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Trouvez rapidement un médecin du travail, gérez vos adhésions et restez en conformité avec la loi. Simplifiez vos démarches administratives dès aujourd&apos;hui.
              </p>
              <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 group-hover:scale-[1.02] transition-transform">
                <Link href="/sign-up">
                  Inscrire mon entreprise
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 border border-emerald-500 p-8 md:p-12 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Stethoscope className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Un Service de Santé</h3>
              <p className="text-emerald-100 mb-8 leading-relaxed">
                Augmentez votre visibilité, digitalisez la gestion de vos adhésions et facilitez la communication avec vos entreprises adhérentes.
              </p>
              <Button asChild size="lg" variant="secondary" className="w-full bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg group-hover:scale-[1.02] transition-transform">
                <Link href="/medical/register">
                  Référencer mon service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
