"use client";
import LandingFooter from "@/components/Landing/LandingFooter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import ParentDashboard from "@/components/Dashboard/ParentDashboard";
import TeacherDashboard from "@/components/Dashboard/TeacherDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Ici, on simule la récupération du rôle utilisateur (à remplacer par AuthContext réel)
    setRole("student"); // à remplacer par le vrai rôle
  }, []);

  return (
    <>
      <DashboardLayout>
        {role === "student" && <StudentDashboard />}
        {role === "parent" && <ParentDashboard />}
        {role === "teacher" && <TeacherDashboard />}
        {!role && <div className="text-gray-500">Chargement...</div>}
      </DashboardLayout>
      <LandingFooter />
    </>
  );
}
