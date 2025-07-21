"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { emailSchema } from "@/utils/validation";
import { sendResetPasswordEmailMock } from "@/services/authService";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
      <div className="w-full max-w-md mx-auto mt-4 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Button>
      </div>
      <div className="max-w-md w-full mx-auto bg-white/90 rounded-2xl shadow-xl p-6 sm:p-10 mt-10 animate-fade-in flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-2">Mot de passe oublié</h2>
        <p className="text-gray-600 text-center mb-4">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
        {sent ? (
          <div className="text-center text-green-600 font-medium">Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.</div>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                const token = sendResetPasswordEmailMock(values.email);
                if (!token) throw new Error("Aucun compte trouvé avec cet email.");
                setSent(true);
              } catch (e: unknown) {
                if (e instanceof Error) {
                  setError(e.message);
                } else {
                  setError('Erreur inconnue');
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Field name="email" type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-600" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                {error && <div className="text-red-600 text-sm text-center animate-shake">{error}</div>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  Envoyer le lien de réinitialisation
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </main>
  );
} 