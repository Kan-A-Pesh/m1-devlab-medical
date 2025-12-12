"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Briefcase,
  MessageSquare,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { orpc, orpcClient } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicalDashboardLayout } from "../../_components/medical-layout";

export default function MedicalRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const requestId = parseInt(params.id as string);

  const requestQuery = useQuery(
    orpc.membershipRequest.get.queryOptions({
      input: { id: requestId },
    })
  );

  const respondMutation = useMutation({
    mutationFn: async (action: "accept" | "reject") => {
      return orpcClient.membershipRequest.respond({
        requestId,
        action,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/medical/requests");
    },
  });

  const request = requestQuery.data;

  if (requestQuery.isPending) {
    return (
      <MedicalDashboardLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      </MedicalDashboardLayout>
    );
  }

  if (!request) {
    return (
      <MedicalDashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Demande non trouvée</p>
          <Link href="/medical/requests">
            <Button variant="link">Retour à la liste</Button>
          </Link>
        </div>
      </MedicalDashboardLayout>
    );
  }

  const company = request.clientCompany;

  return (
    <MedicalDashboardLayout>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6 max-w-3xl"
      >
        <motion.div variants={verticalFadeIn}>
          <Link href="/medical/requests">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux demandes
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-slate-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {company?.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      request.status === "pending"
                        ? "secondary"
                        : request.status === "accepted"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {request.status === "pending"
                      ? "En attente"
                      : request.status === "accepted"
                      ? "Acceptée"
                      : request.status === "rejected"
                      ? "Refusée"
                      : "Annulée"}
                  </Badge>
                  <span className="text-slate-500 text-sm">
                    Demande du {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Informations de l&apos;entreprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {company?.siret && (
                  <div>
                    <p className="text-sm text-slate-500">SIRET</p>
                    <p className="font-medium text-slate-900">{company.siret}</p>
                  </div>
                )}
                {company?.sector && (
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Secteur d&apos;activité
                    </p>
                    <p className="font-medium text-slate-900">{company.sector}</p>
                  </div>
                )}
                {company?.employeeCount && (
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Nombre d&apos;employés
                    </p>
                    <p className="font-medium text-slate-900">{company.employeeCount}</p>
                  </div>
                )}
                {company?.city && (
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Localisation
                    </p>
                    <p className="font-medium text-slate-900">
                      {company.postalCode} {company.city}
                    </p>
                  </div>
                )}
              </div>

              {company?.address && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-slate-500">Adresse complète</p>
                    <p className="font-medium text-slate-900">{company.address}</p>
                  </div>
                </>
              )}

              {request.message && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message de la demande
                    </p>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                      {request.message}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {company?.employees && company.employees.length > 0 && (
          <motion.div variants={verticalFadeIn}>
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">
                  Employés ({company.employees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {company.employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-slate-50"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {employee.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {employee.user?.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {employee.position ?? employee.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {request.status === "pending" && (
          <motion.div variants={verticalFadeIn} className="flex gap-3 pt-4">
            <Button
              onClick={() => respondMutation.mutate("reject")}
              variant="outline"
              className="flex-1 h-12 text-red-600 border-red-200 hover:bg-red-50"
              disabled={respondMutation.isPending}
            >
              <X className="w-4 h-4 mr-2" />
              Refuser
            </Button>
            <Button
              onClick={() => respondMutation.mutate("accept")}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              disabled={respondMutation.isPending}
            >
              <Check className="w-4 h-4 mr-2" />
              Accepter
            </Button>
          </motion.div>
        )}
      </motion.div>
    </MedicalDashboardLayout>
  );
}

