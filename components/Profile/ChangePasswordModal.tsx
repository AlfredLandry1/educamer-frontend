"use client";
import { useState } from "react";
import { X, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordChange: (newPassword: string) => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onPasswordChange }: ChangePasswordModalProps) {
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Le mot de passe actuel est requis"),
    newPassword: Yup.string()
      .required("Le nouveau mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(/(?=.*[a-z])/, "Au moins une lettre minuscule")
      .matches(/(?=.*[A-Z])/, "Au moins une lettre majuscule")
      .matches(/(?=.*\d)/, "Au moins un chiffre"),
    confirmPassword: Yup.string()
      .required("La confirmation du mot de passe est requise")
      .oneOf([Yup.ref("newPassword")], "Les mots de passe ne correspondent pas"),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Shield size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Changer le mot de passe
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sécurisez votre compte
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="p-2"
          >
            <X size={20} className="text-gray-500" />
          </Button>
        </div>
        <Formik
          initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            onPasswordChange(values.newPassword);
            resetForm();
            setIsLoading(false);
            onClose();
          }}
        >
          {({ errors, touched, values }) => (
            <Form className="p-6 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Field
                    as={Input}
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Entrez votre mot de passe actuel"
                    className={errors.currentPassword && touched.currentPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.currentPassword && touched.currentPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.currentPassword}
                  </p>
                )}
              </div>
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Field
                    as={Input}
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    placeholder="Entrez votre nouveau mot de passe"
                    className={errors.newPassword && touched.newPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.newPassword && touched.newPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.newPassword}
                  </p>
                )}
                {values.newPassword && !errors.newPassword && (
                  <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle size={14} />
                    Mot de passe valide
                  </p>
                )}
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Field
                    as={Input}
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirmez votre nouveau mot de passe"
                    className={errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.confirmPassword}
                  </p>
                )}
                {values.confirmPassword && !errors.confirmPassword && values.newPassword === values.confirmPassword && (
                  <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle size={14} />
                    Mots de passe identiques
                  </p>
                )}
              </div>
              {/* Password Requirements */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Exigences du mot de passe :
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li className={`flex items-center gap-1 ${values.newPassword.length >= 8 ? "text-green-600" : ""}`}>
                    <CheckCircle size={12} className={values.newPassword.length >= 8 ? "text-green-600" : "text-gray-400"} />
                    Au moins 8 caractères
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*[a-z])/.test(values.newPassword) ? "text-green-600" : ""}`}>
                    <CheckCircle size={12} className={/(?=.*[a-z])/.test(values.newPassword) ? "text-green-600" : "text-gray-400"} />
                    Au moins une lettre minuscule
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(values.newPassword) ? "text-green-600" : ""}`}>
                    <CheckCircle size={12} className={/(?=.*[A-Z])/.test(values.newPassword) ? "text-green-600" : "text-gray-400"} />
                    Au moins une lettre majuscule
                  </li>
                  <li className={`flex items-center gap-1 ${/(?=.*\d)/.test(values.newPassword) ? "text-green-600" : ""}`}>
                    <CheckCircle size={12} className={/(?=.*\d)/.test(values.newPassword) ? "text-green-600" : "text-gray-400"} />
                    Au moins un chiffre
                  </li>
                </ul>
              </div>
              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Modification..." : "Envoyer"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 