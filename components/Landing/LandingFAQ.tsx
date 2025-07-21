"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Educamer est-il gratuit ?',
    answer: 'Oui, l’inscription et l’utilisation de base sont gratuites pour tous les utilisateurs.'
  },
  {
    question: 'Comment mes données sont-elles protégées ?',
    answer: 'Toutes les données sont chiffrées et stockées de façon sécurisée. Nous respectons la confidentialité de chaque utilisateur.'
  },
  {
    question: 'Puis-je accéder à Educamer sur mobile ?',
    answer: 'Oui, la plateforme est responsive et fonctionne sur tous les appareils.'
  }
];

export default function LandingFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem value={`faq-${idx}`} key={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 