'use client';

import { useState } from 'react';
import SyllabusDrawer from './SyllabusDrawer';

export default function SyllabusButton({ detailedSyllabus, color, title }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!detailedSyllabus) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          width: '100%',
          marginTop: 'var(--s-6)',
          padding: 'var(--s-4)',
          background: 'rgba(0, 0, 0, 0.02)',
          border: `1.5px solid ${color || 'var(--accent-gold)'}`,
          borderRadius: 'var(--r-md)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-heading)',
          fontWeight: '600',
          fontSize: '1.125rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.06)';
          e.currentTarget.style.color = color || 'var(--text-primary)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
      >
        <span>Explore Detailed Syllabus</span>
        <span>→</span>
      </button>

      <SyllabusDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        data={detailedSyllabus} 
        title={title}
      />
    </>
  );
}
