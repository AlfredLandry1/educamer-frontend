"use client";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { MessageCircle, User, CheckCircle, AlertCircle, GraduationCap, MessageSquare, Filter, Loader2, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// Mock data (à remplacer par import réel)
const supportRequests = [
  {
    id: "1",
    userId: "student-1",
    type: "chat",
    message: "J'ai besoin d'aide sur un exercice de maths.",
    status: "open",
    tutorId: "",
    response: "",
    createdAt: "2024-06-01T10:00:00Z",
    resolvedAt: null,
  },
  {
    id: "2",
    userId: "student-1",
    type: "tutoring",
    message: "Je souhaite un rendez-vous avec un tuteur.",
    status: "resolved",
    tutorId: "tutor-2",
    response: "Rendez-vous fixé mardi à 17h.",
    createdAt: "2024-05-28T14:30:00Z",
    resolvedAt: "2024-05-29T09:00:00Z",
  },
];

const tutors = {
  "tutor-1": "Mme Dupont",
  "tutor-2": "M. Martin",
};

const schema = Yup.object().shape({
  type: Yup.string().required("Type requis"),
  message: Yup.string().min(10, "Message trop court").required("Message requis"),
});

function HydrationSafeDate({ date }: { date: string }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) {
    return <>{new Date(date).toISOString().slice(0, 16).replace('T', ' ')}</>;
  }
  return <>{new Date(date).toLocaleString()}</>;
}

export default function SupportPage() {
  const [requests, setRequests] = useState(supportRequests);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [ariaMessage, setAriaMessage] = useState("");

  // Filtrage
  const filteredRequests = requests.filter(r =>
    filter === 'all' ? true : filter === 'open' ? r.status === 'open' : r.status === 'resolved'
  );

  // Focus auto sur message après envoi
  useEffect(() => {
    if (success && messageRef.current) {
      messageRef.current.focus();
    }
  }, [success]);

  return (
    <DashboardLayout>
      <Toaster position="bottom-right" />
      <div className="w-full max-w-5xl animate-fade-in flex flex-col gap-8 px-2 md:px-0">
        {/* Titre sticky */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md pb-2 mb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-1">
            <MessageCircle size={32} className="text-primary-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Support & Assistance</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base mb-1">Besoin d&apos;aide ? Envoyez une demande, un tuteur vous répondra rapidement.</p>
        </div>
        {/* Grille responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulaire à gauche sur desktop, en haut sur mobile */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow flex flex-col gap-4 sticky top-24">
              <div className="flex items-center gap-2 mb-2">
                <PlusCircle size={20} className="text-primary-600" />
                <h2 className="text-lg font-semibold">Nouvelle demande</h2>
              </div>
              <Formik
                initialValues={{ type: "chat", message: "" }}
                validationSchema={schema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  setSubmitting(true);
                  setTimeout(() => {
                    setRequests([
                      {
                        id: (requests.length + 1).toString(),
                        userId: "student-1",
                        status: "open",
                        tutorId: "",
                        response: "",
                        createdAt: new Date().toISOString(),
                        resolvedAt: null,
                        ...values,
                      },
                      ...requests,
                    ]);
                    setSuccess(true);
                    setAriaMessage("Demande envoyée avec succès !");
                    toast.custom(
                      <div className="flex items-center gap-3 bg-green-100 border border-green-300 rounded-lg px-4 py-3 shadow-lg">
                        <CheckCircle size={24} className="text-green-600" />
                        <div>
                          <div className="font-semibold text-green-800">Demande envoyée !</div>
                          <div className="text-green-700 text-sm">Votre demande a bien été transmise au support.</div>
                        </div>
                      </div>,
                      { position: "bottom-right", duration: 3000 }
                    );
                    setSubmitting(false);
                    resetForm();
                    setTimeout(() => { setSuccess(false); setAriaMessage(""); }, 2500);
                  }, 800);
                }}
              >
                {({ errors, touched, isSubmitting, values, setFieldValue }) => (
                  <Form className="flex flex-col gap-4" aria-live="polite">
                    <div>
                      <label className="block text-sm font-medium mb-1">Type de demande</label>
                      <Select value={values.type} onValueChange={val => setFieldValue("type", val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chat">Chat instantané</SelectItem>
                          <SelectItem value="tutoring">Demande de tutorat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && touched.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <Field name="message">
                        {({ field }: { field: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; onBlur: () => void; } }) => (
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Décrivez votre problème ou question..."
                            className={errors.message && touched.message ? "border-red-500" : ""}
                            ref={messageRef}
                          />
                        )}
                      </Field>
                      {errors.message && touched.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                    </div>
                    {success && (
                      <div className="flex items-center gap-2 text-green-700 bg-green-100 rounded px-3 py-2 animate-fade-in" aria-live="polite">
                        <CheckCircle size={18} /> Demande envoyée avec succès !
                      </div>
                    )}
                    <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 size={18} className="animate-spin" />} {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                    </Button>
                    <div className="sr-only" aria-live="polite">{ariaMessage}</div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* Liste des demandes à droite sur desktop, en bas sur mobile */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold flex-1">Mes demandes</h2>
              <Filter size={18} className="text-gray-400" />
              <Select value={filter} onValueChange={val => setFilter(val as 'all' | 'open' | 'resolved')}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="open">Ouvertes</SelectItem>
                  <SelectItem value="resolved">Résolues</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {filteredRequests.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-500 text-center py-8 border rounded-xl bg-gray-50 dark:bg-gray-900">
                    Aucune demande pour ce filtre.
                  </motion.div>
                ) : (
                  filteredRequests.map(req => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="border rounded-xl p-5 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {req.type === "chat" ? <MessageSquare size={16} className="text-blue-500" /> : <GraduationCap size={16} className="text-purple-500" />}
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{req.type === "chat" ? "Chat" : "Tutorat"}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded-full font-medium ${req.status === "resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {req.status === "resolved" ? "Résolue" : "Ouverte"}
                        </span>
                        {req.tutorId && tutors[req.tutorId as keyof typeof tutors] && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Tuteur : {tutors[req.tutorId as keyof typeof tutors]}</span>
                        )}
                        <span className="ml-auto text-xs text-gray-500"><HydrationSafeDate date={req.createdAt} /></span>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 mb-1">{req.message}</div>
                      {req.response && (
                        <div className="flex items-center gap-2 text-blue-700 bg-blue-50 rounded px-3 py-2 mt-1">
                          <AlertCircle size={16} />
                          <span className="font-medium">Réponse tuteur :</span>
                          <span>{req.response}</span>
                        </div>
                      )}
                      {req.status === "open" && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="w-fit mt-2"
                          onClick={() => {
                            setRequests(requests => requests.map(r => r.id === req.id ? { ...r, status: "resolved", response: "Votre demande a été marquée comme résolue." } : r));
                            toast.success("Demande marquée comme résolue.");
                          }}
                        >
                          Marquer comme résolue
                        </Button>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 