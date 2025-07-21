"use client";

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sophie, Parent',
    text: 'Grâce à Educamer, je suis mieux informée sur la progression de mon enfant. L’interface est claire et rassurante.'
  },
  {
    name: 'M. Diallo, Enseignant',
    text: 'La gestion des cours et le suivi des élèves sont facilités. Les outils d’analyse sont très utiles.'
  },
  {
    name: 'Lucas, Élève',
    text: 'J’adore les quiz interactifs et le tableau de bord qui me motive à progresser chaque semaine.'
  }
];

export default function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-16 bg-primary-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ils nous font confiance
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {testimonials.map((t, idx) => (
            <motion.blockquote
              key={t.name}
              className="bg-white rounded-xl shadow-md p-6 flex-1 flex flex-col justify-between hover:shadow-xl transition-shadow focus-within:ring-2 focus-within:ring-primary-600 outline-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              tabIndex={0}
              aria-label={`Témoignage de ${t.name}`}
            >
              <p className="text-gray-700 text-lg mb-4">“{t.text}”</p>
              <footer className="text-primary-700 font-semibold text-right">{t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
} 