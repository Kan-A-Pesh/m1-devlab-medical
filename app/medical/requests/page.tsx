"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Inbox, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { orpc } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicalDashboardLayout } from "../_components/medical-layout";

type RequestStatus = "pending" | "accepted" | "rejected" | "dismissed";

export default function MedicalRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | undefined>("pending");

  const requestsQuery = useQuery(
    orpc.membershipRequest.list.queryOptions({
      input: {
        status: statusFilter,
        limit: 50,
      },
    })
  );

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "accepted":
        return <Badge className="bg-emerald-100 text-emerald-700">Acceptée</Badge>;
      case "rejected":
        return <Badge variant="destructive">Refusée</Badge>;
      case "dismissed":
        return <Badge variant="outline">Annulée</Badge>;
    }
  };

  return (
    <MedicalDashboardLayout>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        <motion.div variants={verticalFadeIn}>
          <h1 className="text-2xl font-bold text-slate-900">Demandes d&apos;adhésion</h1>
          <p className="text-slate-600 mt-1">
            Gérez les demandes des entreprises souhaitant rejoindre votre service
          </p>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          <Tabs
            value={statusFilter ?? "all"}
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? undefined : (value as RequestStatus))
            }
          >
            <TabsList>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="accepted">Acceptées</TabsTrigger>
              <TabsTrigger value="rejected">Refusées</TabsTrigger>
              <TabsTrigger value="all">Toutes</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          {requestsQuery.isPending ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
          ) : requestsQuery.data?.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center">
                <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-500">Aucune demande trouvée</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {requestsQuery.data?.map((request) => (
                <Link key={request.id} href={`/medical/requests/${request.id}`}>
                  <Card className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900 truncate">
                              {request.clientCompany?.name}
                            </h3>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {request.clientCompany?.city && `${request.clientCompany.postalCode} ${request.clientCompany.city} • `}
                            {request.clientCompany?.sector && `${request.clientCompany.sector} • `}
                            {request.clientCompany?.employeeCount && `${request.clientCompany.employeeCount} employés • `}
                            Demande du {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
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

