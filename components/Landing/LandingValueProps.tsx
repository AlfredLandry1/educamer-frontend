"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const valueProps = [
  {
    img: '/landing/value-security.svg',
    title: '100% Sécurisé',
    description: 'Données protégées, confidentialité garantie pour tous les utilisateurs.'
  },
  {
    img: '/landing/value-success.svg',
    title: '+30% de réussite',
    description: 'Des outils de suivi et d’analyse pour booster la progression.'
  },
  {
    img: '/landing/value-accessibility.svg',
    title: 'Accessible partout',
    description: 'Plateforme responsive, multilingue et disponible sur tous les supports.'
  }
];

export default function LandingValueProps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Pourquoi choisir Educamer ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, idx) => (
            <motion.div
              key={prop.title}
              className="flex flex-col items-center p-6 rounded-xl shadow-md bg-primary-50 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              tabIndex={0}
              aria-label={prop.title}
            >
              <Image src={prop.img} alt={prop.title} width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
              <p className="text-gray-700 text-center">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 