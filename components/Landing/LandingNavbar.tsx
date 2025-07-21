"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../ui/dropdown-menu';
import ThemeToggle from '../ui/theme-toggle';

const NAV_LINKS = [
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#demo', label: 'Démo' },
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function LandingNavbar({
  currentLang = 'fr',
  onLangChange,
  onSignIn,
}: {
  currentLang?: 'fr' | 'en';
  onLangChange?: (lang: 'fr' | 'en') => void;
  onSignIn?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary-600">
          <Image src="/landing/logo-educamer.svg" alt="Logo Educamer" width={40} height={40} className="rounded-full" />
          <span className="font-bold text-lg text-primary-700 hidden sm:inline">Educamer</span>
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
            >
              {link.label}
            </a>
          ))}
          {/* Sélecteur de langue shadcn/ui */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="ml-2 px-3 py-1 rounded border border-gray-200 bg-white text-gray-700 font-medium flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Changer la langue"
              >
                {currentLang.toUpperCase()}
                <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={currentLang} onValueChange={v => onLangChange?.(v as 'fr' | 'en')}>
                <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Theme toggle */}
          <ThemeToggle />
          {/* CTA Connexion */}
          <Button size="sm" className="ml-4" asChild>
            <a href="/login">Connexion</a>
          </Button>
          <Button size="sm" variant="default" className="ml-2" asChild>
            <a href="/register">Inscription</a>
          </Button>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow animate-fade-in-down">
          <div className="flex flex-col gap-2 px-4 py-4">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-2 py-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="mt-2 px-3 py-1 rounded border border-gray-200 bg-white text-gray-700 font-medium flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 hover:bg-primary-50 transition-colors"
                  aria-label="Changer la langue"
                >
                  {currentLang.toUpperCase()}
                  <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={currentLang} onValueChange={v => onLangChange?.(v as 'fr' | 'en')}>
                  <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Theme toggle */}
            <ThemeToggle />
            <Button size="sm" className="mt-4" asChild>
              <a href="/login">Connexion</a>
            </Button>
            <Button size="sm" variant="default" className="mt-2" asChild>
              <a href="/register">Inscription</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
} 