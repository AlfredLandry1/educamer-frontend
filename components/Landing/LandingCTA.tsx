"use client";

import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function LandingCTA() {
  return (
    <section className="py-16 bg-primary-50 flex items-center justify-center">
      <motion.div
        className="text-center max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">
          Prêt à rejoindre la communauté Educamer ?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Inscrivez-vous gratuitement et découvrez une nouvelle façon de suivre la scolarité.
        </p>
        <Button size="lg" asChild className="shadow-lg animate-bounce focus:animate-none">
          <a href="/register">Créer mon compte</a>
        </Button>
      </motion.div>
    </section>
  );
} 