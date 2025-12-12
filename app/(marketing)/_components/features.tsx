"use client";

import { motion } from "motion/react";
import { verticalFadeIn } from "@/lib/animations";
import { Search, Scale, UserCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Recherche intuitive",
    description: "Recherchez par code postal ou secteur d'activité pour trouver les centres agréés autour de vous.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Scale,
    title: "Comparaison transparente",
    description: "Comparez les tarifs et les services proposés pour choisir l'offre la plus adaptée à votre budget.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: UserCheck,
    title: "Prise de contact simplifiée",
    description: "Entrez en relation directe avec les services de santé et gérez vos adhésions en ligne.",
    color: "bg-violet-100 text-violet-600",
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
          transition={{ staggerChildren: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={verticalFadeIn}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

