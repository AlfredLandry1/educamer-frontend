"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    img: '/landing/feature-auth.svg',
    title: 'Authentification sécurisée',
    description: 'Connexion simple et sécurisée pour tous les profils.'
  },
  {
    img: '/landing/feature-courses.svg',
    title: 'Gestion des cours',
    description: 'Catalogue interactif, suivi des leçons et progression.'
  },
  {
    img: '/landing/feature-quiz.svg',
    title: 'Quiz & Statistiques',
    description: 'Évaluez vos acquis et suivez vos performances en temps réel.'
  },
  {
    img: '/landing/feature-notifications.svg',
    title: 'Notifications instantanées',
    description: 'Restez informé des nouveautés et échéances importantes.'
  },
  {
    img: '/landing/feature-forum.svg',
    title: 'Forum collaboratif',
    description: 'Partagez, échangez et posez vos questions à la communauté.'
  }
];

export default function LandingFeatures() {
  return (
    <section id="features" className="py-16 bg-primary-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Fonctionnalités principales
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-primary-600 outline-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              tabIndex={0}
              aria-label={feature.title}
            >
              <Image src={feature.img} alt={feature.title} width={64} height={64} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 