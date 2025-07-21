"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  label?: string;
}

export default function LoadingSpinner({ size = 32, color = '#0ea5e9', label = 'Chargement...' }: LoadingSpinnerProps) {
  return (
    <div role="status" aria-busy="true" aria-label={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 50 50" style={{ animation: 'spin 1s linear infinite' }}>
        <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4" />
      </svg>
      <span style={{ marginLeft: 8 }}>{label}</span>
      <style jsx>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 