'use client';
import React, { useState, useEffect } from 'react';
import { NEXT_COHORT_DATE } from '@/data/courses';
import styles from './CountdownTimer.module.css';

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  // Start with null so server and first client render match (no hydration mismatch)
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set immediately on mount
    setTime(getTimeLeft(NEXT_COHORT_DATE));
    const id = setInterval(() => setTime(getTimeLeft(NEXT_COHORT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  // Render skeleton until client-side timer kicks in
  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Next Cohort Begins In</p>
      <div className={styles.timer}>
        {[
          { value: display.days, unit: 'Days' },
          { value: display.hours, unit: 'Hours' },
          { value: display.minutes, unit: 'Mins' },
          { value: display.seconds, unit: 'Secs' },
        ].map(({ value, unit }, i) => (
          <React.Fragment key={unit}>
            <div className={styles.unit}>
              <div className={styles.digit} suppressHydrationWarning>{pad(value)}</div>
              <div className={styles.unitLabel}>{unit}</div>
            </div>
            {i < 3 && <span className={styles.colon}>:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
