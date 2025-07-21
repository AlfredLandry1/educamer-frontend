"use client"

import AuthForm from "@/components/Auth/AuthForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
      <div className="w-full max-w-md mx-auto mt-4 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Button>
      </div>
      <AuthForm mode="login" />
    </main>
  );
} 