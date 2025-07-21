"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <motion.h2
      className={`text-3xl md:text-4xl font-bold text-center mb-10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      tabIndex={0}
    >
      {children}
    </motion.h2>
  );
} 