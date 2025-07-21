"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/utils/validation";
import { validateResetTokenMock, resetPasswordMock } from "@/services/authService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, PasswordInput } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const router = useRouter();

  function handleCheckToken() {
    setError(null);
    const u = validateResetTokenMock(token);
    if (!u) {
      setError("Token invalide ou expiré.");
      setUser(null);
    } else {
      setUser(u);
    }
    setTokenChecked(true);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
      <div className="w-full max-w-md mx-auto mt-4 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Button>
      </div>
      <div className="max-w-md w-full mx-auto bg-white/90 rounded-2xl shadow-xl p-6 sm:p-10 mt-10 animate-fade-in flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-2">Réinitialisation du mot de passe</h2>
        <p className="text-gray-600 text-center mb-4">Saisissez le token reçu par email puis choisissez un nouveau mot de passe.</p>
        {!user && (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Token de réinitialisation"
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full"
            />
            <Button type="button" className="w-full" onClick={handleCheckToken}>
              Vérifier le token
            </Button>
            {error && <div className="text-red-600 text-sm text-center animate-shake">{error}</div>}
          </div>
        )}
        {user && !success && (
          <Formik
            initialValues={{ password: "", confirm: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                const ok = resetPasswordMock(token, values.password);
                if (!ok) throw new Error("Erreur lors de la réinitialisation.");
                setSuccess(true);
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
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                  <Field name="password" as={PasswordInput} className="w-full" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
                  <Field name="confirm" as={PasswordInput} className="w-full" />
                  <ErrorMessage name="confirm" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                {error && <div className="text-red-600 text-sm text-center animate-shake">{error}</div>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  Réinitialiser le mot de passe
                </Button>
              </Form>
            )}
          </Formik>
        )}
        {success && (
          <div className="text-center text-primary-700 font-bold">Mot de passe réinitialisé avec succès !</div>
        )}
      </div>
    </main>
  );
} 