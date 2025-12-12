"use client";

import { motion } from "motion/react";
import { verticalFadeIn } from "@/lib/animations";
import { Search, FileCheck, Calendar, Users, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Recherche intelligente",
    description: "Trouvez les services de santé au travail par code postal, secteur d&apos;activité ou couverture géographique.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileCheck,
    title: "Demande d&apos;adhésion",
    description: "Envoyez votre demande directement en ligne et suivez son avancement en temps réel.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Calendar,
    title: "Gestion des rendez-vous",
    description: "Planifiez les visites médicales de vos employés et recevez des rappels automatiques.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Users,
    title: "Suivi des employés",
    description: "Centralisez les informations de santé de vos équipes et gérez leurs documents.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Shield,
    title: "Conformité garantie",
    description: "Restez en règle avec vos obligations légales de suivi médical au travail.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Zap,
    title: "Tableau de bord",
    description: "Visualisez les prochains rendez-vous, les documents et l&apos;état de vos démarches.",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={verticalFadeIn} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tout ce dont vous avez besoin
          </motion.h2>
          <motion.p variants={verticalFadeIn} className="text-slate-600 text-lg">
            Une plateforme conçue pour faciliter la vie des dirigeants de TPE et PME.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={verticalFadeIn}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
