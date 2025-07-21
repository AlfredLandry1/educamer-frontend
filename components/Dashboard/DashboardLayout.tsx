"use client";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Bouton burger toujours visible en haut à gauche */}
      <div className="fixed top-4 left-4 z-40 md:z-20">
        <Button
          variant="ghost"
          size="icon"
          aria-label={sidebarOpen ? "Réduire la barre latérale" : "Ouvrir la barre latérale"}
          onClick={() => setSidebarOpen((o) => !o)}
          className="md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
        >
          <Menu size={28} />
        </Button>
      </div>
      <DashboardSidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <main
        className={`flex-1 transition-all duration-200 ease-in-out px-4 py-8 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
        aria-label="Contenu principal du tableau de bord"
      >
        {/* <DashboardBreadcrumbs /> */}
        {children}
      </main>
    </div>
  );
} 