"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mapping des segments à des labels lisibles
const LABELS: Record<string, string> = {
  dashboard: "Tableau de bord",
  courses: "Mes cours",
  assignments: "Devoirs",
  grades: "Notes",
  notifications: "Notifications",
  profile: "Profil",
  users: "Utilisateurs",
  stats: "Statistiques",
  support: "Support",
  children: "Enfants",
  messages: "Messages",
  students: "Élèves",
};

export default function DashboardBreadcrumbs() {
  const pathname = usePathname();
  // Découpe le chemin en segments, ignore le premier ("" ou "/")
  const segments = pathname.split("/").filter(Boolean);
  // On ne veut afficher les breadcrumbs que pour le dashboard et ses sous-pages
  if (!segments[0] || segments[0] !== "dashboard") return null;

  // Génère les liens cumulés pour chaque segment
  let path = "";
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Tableau de bord</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.slice(1).map((seg, i) => {
          path += "/" + seg;
          const isLast = i === segments.length - 2;
          const label =
            LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
          return (
            <>
              <BreadcrumbSeparator key={"sep-" + seg} />
              <BreadcrumbItem key={seg}>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={"/dashboard" + path}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
