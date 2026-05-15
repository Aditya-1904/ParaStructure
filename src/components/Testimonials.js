import { TESTIMONIALS } from '@/data/courses';
import styles from './Testimonials.module.css';

function StarRating({ rating }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i < rating ? '#C8A86B' : 'none'}
          stroke={i < rating ? '#C8A86B' : '#ccc'}
          strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ items = TESTIMONIALS }) {
  return (
    <div className={styles.grid}>
      {items.map((t, i) => (
        <div key={i} className={styles.card}>
          <StarRating rating={t.rating} />
          <blockquote className={styles.quote}>"{t.quote}"</blockquote>
          <div className={styles.author}>
            <div className={styles.avatar}>
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className={styles.name}>{t.name}</div>
              <div className={styles.role}>{t.role}</div>
              <div className={styles.cohort}>{t.cohort}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
