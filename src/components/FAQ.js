'use client';
import { useState } from 'react';
import { FAQS } from '@/data/courses';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.faqList}>
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              id={`faq-btn-${i}`}
            >
              <span>{item.question}</span>
              <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </button>
            <div
              className={styles.faqAnswer}
              style={{ maxHeight: isOpen ? '400px' : '0' }}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
