'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './SyllabusDrawer.module.css';

export default function SyllabusDrawer({ isOpen, onClose, data, title }) {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.drawerHeader}>
          <h2 className={styles.headerTitle}>{title} — Master Document</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">×</button>
        </div>

        {/* Content */}
        <div className={styles.drawerContent}>
          
          {/* Visual Banner */}
          <div className={styles.visualWrapper}>
            <Image 
              src="/bridge_wireframe_dark.png" 
              alt="Structural Rendering" 
              fill 
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 100vw, 600px"
            />
            <div className={styles.visualOverlay} />
          </div>

          {/* Design Process */}
          <section>
            <h3 className={styles.sectionTitle}>The Design Workflow</h3>
            <div className={styles.timeline}>
              {data.designProcess.map((step, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <h4 className={styles.timelineStepTitle}>
                    {String(idx + 1).padStart(2, '0')}. {step.title}
                  </h4>
                  <p className={styles.timelineStepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mechanics */}
          <section>
            <h3 className={styles.sectionTitle}>Mechanics & Theory</h3>
            <div className={styles.comparisonGrid}>
              <div className={styles.compCard}>
                <h4 className={styles.compTitle}>{data.mechanicsComparison.conventional.title}</h4>
                <p className={styles.compDesc}>{data.mechanicsComparison.conventional.desc}</p>
              </div>
              <div className={`${styles.compCard} ${styles.highlight}`}>
                <h4 className={styles.compTitle}>{data.mechanicsComparison.prestressed.title}</h4>
                <p className={styles.compDesc}>{data.mechanicsComparison.prestressed.desc}</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
