"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Building2, Users, Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { orpc } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalDashboardLayout } from "../_components/medical-layout";

export default function MedicalCompaniesPage() {
  const [search, setSearch] = useState("");

  const companiesQuery = useQuery(
    orpc.medical.listClientCompanies.queryOptions({
      input: { limit: 100 },
    })
  );

  const filteredCompanies = companiesQuery.data?.filter((company) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      company.name?.toLowerCase().includes(searchLower) ||
      company.city?.toLowerCase().includes(searchLower) ||
      company.sector?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <MedicalDashboardLayout>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        <motion.div variants={verticalFadeIn}>
          <h1 className="text-2xl font-bold text-slate-900">Entreprises clientes</h1>
          <p className="text-slate-600 mt-1">
            Gérez vos entreprises clientes et leurs employés
          </p>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher une entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          {companiesQuery.isPending ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
          ) : filteredCompanies?.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500">Aucune entreprise cliente</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies?.map((company) => (
                <Link key={company.id} href={`/medical/company/${company.id}`}>
                  <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {company.name}
                          </h3>
                          <div className="mt-2 space-y-1">
                            {company.city && (
                              <p className="text-sm text-slate-500 truncate">
                                {company.postalCode} {company.city}
                              </p>
                            )}
                            <p className="text-sm text-slate-500 flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {company.employees?.length ?? 0} employés
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </MedicalDashboardLayout>
  );
}

