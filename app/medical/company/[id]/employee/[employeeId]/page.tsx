"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Calendar,
  FileText,
  Plus,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { orpc, orpcClient } from "@/lib/orpc-client";
import { verticalFadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicalDashboardLayout } from "../../../../_components/medical-layout";

export default function MedicalEmployeeDetailPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const companyId = parseInt(params.id as string);
  const employeeId = parseInt(params.employeeId as string);

  const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: "",
    type: "",
    url: "",
  });
  const [error, setError] = useState<string | null>(null);

  const employeeQuery = useQuery(
    orpc.medical.getClientEmployee.queryOptions({
      input: { employeeId },
    })
  );

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: "completed" | "cancelled" }) => {
      return orpcClient.booking.updateStatus({
        id,
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const createDocMutation = useMutation({
    mutationFn: async () => {
      return orpcClient.document.create({
        employeeId,
        name: newDoc.name,
        type: newDoc.type || undefined,
        url: newDoc.url,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setIsDocDialogOpen(false);
      setNewDoc({ name: "", type: "", url: "" });
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const employee = employeeQuery.data;

  if (employeeQuery.isPending) {
    return (
      <MedicalDashboardLayout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      </MedicalDashboardLayout>
    );
  }

  if (!employee) {
    return (
      <MedicalDashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Employé non trouvé</p>
          <Link href={`/medical/company/${companyId}`}>
            <Button variant="link">Retour à l&apos;entreprise</Button>
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
          <Link href={`/medical/company/${companyId}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à {employee.clientCompany?.name}
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                {employee.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {employee.user?.name}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {employee.user?.email}
                  </span>
                  {employee.position && (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {employee.position}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={verticalFadeIn}>
          <Tabs defaultValue="bookings">
            <TabsList>
              <TabsTrigger value="bookings" className="gap-2">
                <Calendar className="w-4 h-4" />
                Rendez-vous
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-4">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Historique des rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.bookings?.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p>Aucun rendez-vous</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {employee.bookings?.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100"
                        >
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <Clock className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              {new Date(booking.scheduledAt).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-sm text-slate-500">
                              {new Date(booking.scheduledAt).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {booking.status === "scheduled" ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateBookingMutation.mutate({
                                    id: booking.id,
                                    status: "cancelled",
                                  })
                                }
                                disabled={updateBookingMutation.isPending}
                              >
                                Annuler
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateBookingMutation.mutate({
                                    id: booking.id,
                                    status: "completed",
                                  })
                                }
                                disabled={updateBookingMutation.isPending}
                              >
                                Terminer
                              </Button>
                            </div>
                          ) : (
                            <Badge
                              variant={
                                booking.status === "completed" ? "default" : "destructive"
                              }
                            >
                              {booking.status === "completed" ? "Terminé" : "Annulé"}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Documents médicaux</CardTitle>
                  <Dialog open={isDocDialogOpen} onOpenChange={setIsDocDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un document</DialogTitle>
                        <DialogDescription>
                          Ajoutez un document médical pour {employee.user?.name}
                        </DialogDescription>
                      </DialogHeader>

                      {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom du document *</Label>
                          <Input
                            id="name"
                            value={newDoc.name}
                            onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                            placeholder="Certificat médical"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={newDoc.type}
                            onValueChange={(value) => setNewDoc({ ...newDoc, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="certificat">Certificat médical</SelectItem>
                              <SelectItem value="aptitude">Fiche d&apos;aptitude</SelectItem>
                              <SelectItem value="examen">Résultat d&apos;examen</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="url">URL du document *</Label>
                          <Input
                            id="url"
                            value={newDoc.url}
                            onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDocDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button
                          onClick={() => createDocMutation.mutate()}
                          disabled={createDocMutation.isPending || !newDoc.name || !newDoc.url}
                        >
                          {createDocMutation.isPending ? "Ajout..." : "Ajouter"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {employee.documents?.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p>Aucun document</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {employee.documents?.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                        >
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{doc.name}</p>
                            <p className="text-sm text-slate-500">
                              {doc.type && `${doc.type} • `}
                              {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MedicalDashboardLayout>
  );
}

