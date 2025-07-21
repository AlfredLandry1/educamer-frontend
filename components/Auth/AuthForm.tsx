"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../ui/button";
import { Input, PasswordInput } from "../ui/input";
import { Label } from "../ui/label";
import { loginMock, registerMock } from "../../services/authService";
import type { User } from "../../data/users";
import { loginSchema, registerSchema } from "../../utils/validation";
import { formatAuthError } from "../../utils/error";
import Link from "next/link";

interface AuthFormProps {
  mode?: "login" | "register";
  onAuthSuccess?: (user: User) => void;
}

export default function AuthForm({ mode = "login", onAuthSuccess }: AuthFormProps) {
  const [formMode, setFormMode] = useState<"login" | "register">(mode);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-lg w-full mx-auto bg-white/90 rounded-2xl shadow-xl p-6 sm:p-10 mt-10 animate-fade-in flex flex-col gap-6">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          {formMode === "login" ? "Connexion à Educamer" : "Créer un compte"}
        </h2>
        <p className="text-gray-600 text-base font-light">
          {formMode === "login"
            ? "Accédez à votre espace personnel."
            : "Inscrivez-vous gratuitement pour profiter de toutes les fonctionnalités."}
        </p>
      </div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm: "",
        }}
        validationSchema={formMode === "login" ? loginSchema : registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError(null);
          setLoading(true);
          try {
            let user: User | null = null;
            if (formMode === "login") {
              user = loginMock(values.email, values.password);
              if (!user) throw new Error("Identifiants invalides");
            } else {
              user = registerMock({ name: values.name, email: values.email, password: values.password });
              if (!user) throw new Error("Erreur lors de l'inscription");
            }
            onAuthSuccess?.(user);
          } catch (e: unknown) {
            setError(formatAuthError(e));
          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            {formMode === "register" && (
              <div>
                <Label htmlFor="name">Nom</Label>
                <Field as={Input} name="name" id="name" autoComplete="name" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Field as={Input} name="email" id="email" type="email" autoComplete="email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Field
                as={PasswordInput}
                name="password"
                id="password"
                autoComplete={formMode === "login" ? "current-password" : "new-password"}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              {formMode === "login" && (
                <div className="text-right mt-1">
                  <Link href="/forgot-password" className="text-primary-600 text-xs hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
                    Mot de passe oublié&nbsp;?
                  </Link>
                </div>
              )}
            </div>
            {formMode === "register" && (
              <div>
                <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                <Field
                  as={PasswordInput}
                  name="confirm"
                  id="confirm"
                  autoComplete="new-password"
                />
                <ErrorMessage name="confirm" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            )}
            {error && <div className="text-red-600 text-sm text-center animate-shake">{error}</div>}
            <Button type="submit" className="w-full mt-2" disabled={isSubmitting || loading}>
              {loading ? "Chargement..." : formMode === "login" ? "Se connecter" : "Créer un compte"}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="flex items-center gap-4 my-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-widest">ou</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="text-center text-sm text-gray-600">
        {formMode === "login" ? (
          <>
            Pas encore de compte ?{' '}
            <button
              type="button"
              className="text-primary-600 hover:underline font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
              onClick={() => setFormMode("register")}
            >
              S&apos;inscrire
            </button>
          </>
        ) : (
          <>
            Déjà inscrit ?{' '}
            <button
              type="button"
              className="text-primary-600 hover:underline font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
              onClick={() => setFormMode("login")}
            >
              Se connecter
            </button>
          </>
        )}
      </div>
    </div>
  );
} 