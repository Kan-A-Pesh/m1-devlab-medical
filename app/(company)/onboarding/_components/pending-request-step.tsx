"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Clock, Building2, X } from "lucide-react";
import { orpc, orpcClient } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PendingRequestStepProps {
  onDismiss: () => void;
}

export function PendingRequestStep({ onDismiss }: PendingRequestStepProps) {
  const requestQuery = useQuery(
    orpc.membershipRequest.getMy.queryOptions({})
  );

  const dismissMutation = useMutation({
    mutationFn: async () => {
      if (!requestQuery.data?.id) throw new Error("Aucune demande trouvée");
      return orpcClient.membershipRequest.dismiss({
        requestId: requestQuery.data.id,
      });
    },
    onSuccess: () => {
      onDismiss();
    },
  });

  const request = requestQuery.data;

  if (requestQuery.isPending) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={verticalFadeIn}
    >
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="w-14 h-14 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center">
            <Clock className="w-7 h-7 text-amber-600" />
          </div>
          <CardTitle className="text-xl">Demande en attente</CardTitle>
          <CardDescription>
            Votre demande a été envoyée et est en cours de traitement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {request?.medicalCompany && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Service demandé</p>
                  <p className="font-semibold text-slate-900">
                    {request.medicalCompany.name}
                  </p>
                  {request.medicalCompany.city && (
                    <p className="text-sm text-slate-500 mt-1">
                      {request.medicalCompany.postalCode} {request.medicalCompany.city}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 py-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-slate-500 ml-2">En attente de réponse</span>
          </div>

          <div className="text-center text-sm text-slate-500">
            <p>
              Le service de santé examinera votre demande et vous répondra dans les plus brefs délais.
            </p>
            <p className="mt-1">
              Vous recevrez une notification dès que votre demande sera traitée.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <Button
              variant="outline"
              onClick={() => dismissMutation.mutate()}
              disabled={dismissMutation.isPending}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              {dismissMutation.isPending ? "Annulation..." : "Annuler la demande"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

