"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <Ghost className="w-20 h-20 text-primary-600 mb-2" aria-hidden="true" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404 – Page non trouvée</h1>
        <p className="text-gray-600 text-center max-w-md mb-4">Oups ! La page que vous cherchez n’existe pas ou a été déplacée.<br />Retournez à l’accueil pour continuer votre navigation.</p>
        <Button size="lg" onClick={() => router.push("/")} className="mt-2">
          Retour à l’accueil
        </Button>
      </div>
    </main>
  );
} 