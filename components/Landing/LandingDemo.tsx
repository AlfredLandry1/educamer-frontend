"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const demoImages = [
  { src: '/landing/demo-dashboard.svg', alt: 'Tableau de bord Educamer' },
  { src: '/landing/demo-courses.svg', alt: 'Gestion des cours' },
  { src: '/landing/demo-quiz.svg', alt: 'Quiz interactif' },
];

export default function LandingDemo() {
  return (
    <section id="demo" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Démo visuelle
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {demoImages.map((img, idx) => (
            <motion.div
              key={img.src}
              className="rounded-xl overflow-hidden shadow-lg bg-gray-50"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Image src={img.src} alt={img.alt} width={160} height={100} className="object-cover w-full h-48" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 