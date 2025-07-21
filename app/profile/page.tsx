"use client";
import { useState } from "react";
import { User, Save, Edit, Shield, Bell, Upload, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import ChangePasswordModal from "@/components/Profile/ChangePasswordModal";
import ProfileAvatar from "@/components/Profile/ProfileAvatar";
import AchievementsCard from "@/components/Profile/AchievementsCard";
import QuickActionsCard from "@/components/Profile/QuickActionsCard";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Mock data utilisateur
const user = {
  id: "1",
  name: "Marie Dupont",
  email: "marie.dupont@email.com",
  role: "student" as const,
  avatarUrl: "/api/placeholder/150/150",
  phone: "+33 6 12 34 56 78",
  birthDate: "15/03/2008",
  location: "Paris, France",
  lastLogin: "Aujourd'hui à 09:15",
  experience: "2 ans",
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profilePublic: false,
      showProgress: true,
      allowMessages: true,
    },
    language: "fr",
    theme: "auto" as const,
  },
  achievements: [
    { type: "gold" as const, label: "Or", description: "Niveau 3 atteint", date: "Ce mois" },
    { type: "star" as const, label: "Série", description: "5 devoirs rendus d'affilée", date: "Semaine dernière" },
  ],
};

interface FormField {
  label: string;
  value: string;
  type: string;
  key: string;
  readonly?: boolean;
  options?: string[];
}

const profileSections = [
  {
    id: "personal",
    title: "Informations personnelles",
    icon: <User size={20} />,
    fields: [
      { label: "Nom complet", value: user.name, type: "text", key: "name" },
      { label: "Email", value: user.email, type: "email", key: "email" },
      { label: "Téléphone", value: user.phone, type: "tel", key: "phone" },
      { label: "Date de naissance", value: user.birthDate, type: "date", key: "birthDate" },
      { label: "Localisation", value: user.location, type: "text", key: "location" },
    ] as FormField[],
  },
  {
    id: "security",
    title: "Sécurité",
    icon: <Shield size={20} />,
    fields: [
      { label: "Mot de passe", value: "••••••••", type: "password", key: "password" },
      { label: "Dernière connexion", value: user.lastLogin, type: "text", key: "lastLogin", readonly: true },
    ] as FormField[],
  },
  {
    id: "preferences",
    title: "Préférences",
    icon: <Bell size={20} />,
    fields: [
      { label: "Langue", value: "Français", type: "select", key: "language", options: ["Français", "English"] },
      { label: "Thème", value: "Automatique", type: "select", key: "theme", options: ["Clair", "Sombre", "Automatique"] },
    ] as FormField[],
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate,
    location: user.location,
    language: "Français",
    theme: "Automatique",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Mock save action
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate,
      location: user.location,
      language: "Français",
      theme: "Automatique",
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (newPassword: string) => {
    console.log("Password changed:", newPassword);
    // Mock API call to update password
  };

  const handleAvatarChange = (file: File) => {
    console.log("Avatar changed:", file);
    // Mock API call to upload avatar
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    console.log("Account deletion confirmed");
    // Mock API call to delete account
    setShowDeleteConfirm(false);
  };

  const handleExportData = () => {
    console.log("Exporting user data");
    // Mock API call to export data
  };

  const handleManageNotifications = () => {
    console.log("Opening notification settings");
    // Navigate to notification settings
  };

  const quickActions = [
    {
      id: "change-password",
      label: "Changer le mot de passe",
      icon: <User size={16} className="text-gray-500" />,
      onClick: () => setShowPasswordModal(true),
      variant: "primary" as const,
    },
    {
      id: "notifications",
      label: "Gérer les notifications",
      icon: <Bell size={16} className="text-gray-500" />,
      onClick: handleManageNotifications,
    },
    {
      id: "export-data",
      label: "Exporter mes données",
      icon: <Upload size={16} className="text-gray-500" />,
      onClick: handleExportData,
    },
    {
      id: "delete-account",
      label: "Supprimer mon compte",
      icon: <Trash2 size={16} className="text-red-500" />,
      onClick: handleDeleteAccount,
      variant: "danger" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        {/* Header avec breadcrumbs */}
        <div className="flex items-center justify-between">
          <div>
            <DashboardBreadcrumbs />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
              Mon Profil
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600"
                >
                  <Save size={18} /> Sauvegarder
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400"
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <Edit size={18} /> Modifier
              </button>
            )}
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Avatar et infos principales */}
          <div className="flex flex-col gap-6">
            {/* Avatar et infos de base */}
            <ProfileAvatar
              user={user}
              onAvatarChange={handleAvatarChange}
              onEditClick={() => setIsEditing(true)}
              isEditing={isEditing}
            />

            {/* Badges et réalisations */}
            <AchievementsCard achievements={user.achievements} />

            {/* Actions rapides */}
            <QuickActionsCard actions={quickActions} />
          </div>

          {/* Colonne centrale et droite - Sections du profil */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {profileSections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow mb-6">
                <div className="font-bold text-primary-700 dark:text-primary-200 mb-4 flex items-center gap-2">
                  {section.icon} {section.title}
                </div>
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[120px]">
                        {field.label}
                      </label>
                      <div className="flex-1">
                        {field.type === "select" ? (
                          <Select
                            value={formData[field.key as keyof typeof formData] as string}
                            onValueChange={(val) => handleInputChange(field.key, val)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={field.label} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type={field.type}
                            value={formData[field.key as keyof typeof formData] as string}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Notifications et confidentialité */}
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow">
              <div className="font-bold text-primary-700 dark:text-primary-200 mb-4 flex items-center gap-2">
                <Bell size={18} /> Notifications et confidentialité
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Notifications email</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Recevoir les notifications par email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Notifications push</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Recevoir les notifications push</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-200">Profil public</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Autoriser les autres à voir mon profil</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onPasswordChange={handlePasswordChange}
      />

      {/* Modal de confirmation de suppression de compte */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteAccount}
        title="Supprimer votre compte"
        message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </DashboardLayout>
  );
} 