"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Mail,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { orpc } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedicalDashboardLayout } from "../../_components/medical-layout";

export default function MedicalCompanyDetailPage() {
  const params = useParams();
  const companyId = parseInt(params.id as string);

  const companyQuery = useQuery(
    orpc.medical.getClientCompany.queryOptions({
      input: { id: companyId },
    })
  );

  const company = companyQuery.data;

  if (companyQuery.isPending) {
    return (
      <MedicalDashboardLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      </MedicalDashboardLayout>
    );
  }

  if (!company) {
    return (
      <MedicalDashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Entreprise non trouvée</p>
          <Link href="/medical/company">
            <Button variant="link">Retour à la liste</Button>
          </Link>
        </div>
      </MedicalDashboardLayout>
    );
  }

  return (
    <MedicalDashboardLayout>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        <motion.div variants={verticalFadeIn}>
          <Link href="/medical/company">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-slate-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                {company.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {company.postalCode} {company.city}
                  </span>
                )}
                {company.sector && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {company.sector}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Employés ({company.employees?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {company.employees?.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p>Aucun employé enregistré</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {company.employees?.map((employee) => (
                    <Link
                      key={employee.id}
                      href={`/medical/company/${companyId}/employee/${employee.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {employee.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {employee.user?.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate">{employee.user?.email}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {employee.position ?? employee.role}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MedicalDashboardLayout>
  );
}

