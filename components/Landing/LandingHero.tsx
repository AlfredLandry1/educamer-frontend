"use client";

import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function LandingHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-primary-50/80 to-white text-center px-4 overflow-hidden">
      {/* Halo effet */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full bg-primary-100 blur-3xl opacity-60 pointer-events-none z-0" />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Badge/tagline */}
        <span className="mb-4 inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold tracking-widest shadow-sm animate-fade-in">
          Plateforme éducative 2025
        </span>
        {/* Illustration */}
        {/* <Image src="/landing/hero-illustration.svg" alt="Illustration Educamer" width={360} height={240} className="mx-auto mb-8 drop-shadow-xl" priority /> */}
        {/* Titre */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight max-w-3xl mx-auto">
          Réinventez le suivi scolaire avec <span className="text-primary-600 bg-primary-50 px-2 rounded">Educamer</span>
        </h1>
        {/* Sous-titre */}
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-xl mx-auto font-light">
          Plateforme moderne, sécurisée et collaborative pour élèves, parents et enseignants. Expérience fluide, design premium, résultats concrets.
        </p>
        {/* CTA */}
        <Button size="lg" asChild className="shadow-xl px-8 py-4 text-lg rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary-600">
          <a href="/dashboard">Essayez gratuitement</a>
        </Button>
      </motion.div>
    </section>
  );
} 