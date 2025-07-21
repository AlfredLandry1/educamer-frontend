"use client";
import {
  Home,
  ClipboardList,
  Bell,
  User,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Book,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Star,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { users } from "@/data/users";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mockUser = users[1]; // À remplacer par AuthContext

// Nouvelle structure de liens pour le rôle élève (student)
const STUDENT_LINK_GROUPS = [
  {
    label: "Tableau de bord",
    links: [{ href: "/dashboard", label: "Accueil", icon: Home }],
  },
  {
    label: "Cours",
    links: [
      { href: "/catalogue", label: "Catalogue des cours", icon: BookOpen },
      { href: "/courses", label: "Mes cours", icon: Book },
      { href: "/grades", label: "Notes", icon: BarChart2 },
      { href: "/assignments", label: "Devoirs", icon: ClipboardList },
    ],
  },
  {
    label: "Interactions",
    links: [
      { href: "/forum", label: "Forum", icon: MessageSquare },
      { href: "/feedback", label: "Feedback", icon: Star },
      { href: "/support", label: "Support & Assistance", icon: HelpCircle },
      { href: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Profil",
    links: [{ href: "/profile", label: "Profil", icon: User }],
  },
];

const LOGO = (
  <Image
    src="/landing/logo-educamer.svg"
    alt="Logo Educamer"
    width={40}
    height={40}
    className="rounded-full shadow"
    priority
    aria-label="Logo Educamer"
  />
);

export default function DashboardSidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const user = mockUser;
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Trouver le groupe actif par défaut
  const getActiveGroup = () => {
    const idx = STUDENT_LINK_GROUPS.findIndex((group) =>
      group.links.some(
        (link) => pathname === link.href || pathname.startsWith(link.href + "/")
      )
    );
    return idx === -1 ? 0 : idx;
  };
  const [openGroup, setOpenGroup] = useState<number>(getActiveGroup());
  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Liste à plat de tous les liens pour le mode fermé
  const allLinks = STUDENT_LINK_GROUPS.flatMap((group) => group.links);

  // Gestion du scroll lock sur mobile quand drawer ouvert
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermer drawer mobile au clic en dehors
  useEffect(() => {
    if (!open || typeof window === "undefined" || window.innerWidth >= 768)
      return;
    function handleClick(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onToggle]);

  // Largeur sidebar desktop : 256px (ouverte), 64px (fermée)
  // Sur mobile : drawer (slide-in, width 80vw)
  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-200 ease-in-out",
          "shadow-lg md:shadow-none",
          open ? "w-64" : "w-16",
          open && "md:translate-x-0",
          !open && "-translate-x-full md:translate-x-0"
        )}
        style={{
          transitionProperty: "width, left, transform, box-shadow",
        }}
        aria-label="Navigation du tableau de bord"
        tabIndex={-1}
      >
        {/* Logo + bouton toggle */}
        <div className="flex items-center justify-between px-3 py-4 h-16">
          <div className="flex items-center gap-2">
            {LOGO}
            {open && (
              <span className="ml-2 font-bold text-lg text-primary-700 dark:text-primary-200">
                Educamer
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              open ? "Réduire la barre latérale" : "Ouvrir la barre latérale"
            }
            onClick={onToggle}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
          >
            {open ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </Button>
        </div>
        {/* Header user */}
        <div
          className={cn(
            "flex items-center w-full px-3 py-4",
            open ? "justify-start gap-3" : "justify-center"
          )}
        >
          <Avatar className="size-10">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            )}
          </Avatar>
          {open && (
            <div className="flex flex-col min-w-0">
              <span className="truncate text-base font-semibold text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span className="truncate text-xs text-gray-500 capitalize">
                {user.role}
              </span>
            </div>
          )}
        </div>
        {/* Menu */}
        <nav
          className="flex-1 flex flex-col gap-1 px-1 mt-2"
          aria-label="Menu principal"
        >
          {open ? (
            STUDENT_LINK_GROUPS.map((group, idx) => {
              const expanded = open && openGroup === idx;
              return (
                <div key={group.label} className="mb-2">
                  <button
                    className="w-full flex items-center justify-between px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-widest select-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 bg-transparent"
                    aria-expanded={expanded}
                    aria-controls={`sidebar-group-${idx}`}
                    onClick={() => setOpenGroup(openGroup === idx ? -1 : idx)}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "transition-transform",
                        expanded ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>
                  <div
                    id={`sidebar-group-${idx}`}
                    className={cn(
                      "flex flex-col gap-1 overflow-hidden transition-all duration-200",
                      expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                    aria-hidden={!expanded}
                  >
                    {group.links.map((link) => {
                      const isActive = isActiveLink(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "group flex items-center gap-3 py-2 px-3 rounded transition-colors relative",
                            "hover:bg-primary-50 dark:hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600",
                            "justify-start",
                            isActive
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border-r-4 border-blue-500 shadow-sm"
                              : "text-gray-700 dark:text-gray-200"
                          )}
                          tabIndex={0}
                          aria-label={link.label}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" />
                          )}
                          <link.icon
                            className={cn(
                              "shrink-0",
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400"
                            )}
                            size={22}
                            aria-hidden
                          />
                          <span
                            className={cn(
                              "text-sm",
                              isActive
                                ? "font-semibold text-blue-700 dark:text-blue-200"
                                : "font-medium text-gray-700 dark:text-gray-200"
                            )}
                          >
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-1 items-center">
              {allLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-center rounded p-2 my-1 transition-colors",
                          "hover:bg-primary-50 dark:hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600",
                          isActive
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 shadow-sm"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                        tabIndex={0}
                        aria-label={link.label}
                        aria-current={isActive ? "page" : undefined}
                        style={{ width: 40, height: 40 }}
                      >
                        <link.icon
                          className={cn(
                            "shrink-0",
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                          size={22}
                          aria-hidden
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </nav>
        {/* Footer (ex: logout) */}
        <div
          className={cn("mt-auto mb-4 flex", open ? "px-3" : "justify-center")}
        >
          {open ? (
            <Button
              variant="destructive"
              className="w-full flex items-center gap-2 justify-center py-2 px-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
              aria-label="Déconnexion"
              title="Déconnexion"
            >
              <LogOut size={18} />
              <span className="text-sm">Déconnexion</span>
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
                  aria-label="Déconnexion"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Déconnexion
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </>
  );
}
