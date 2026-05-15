import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '@/components/Testimonials';
import { getCourse } from '@/data/courses';
import { formatPrice } from '@/config/payment';
import { notFound } from 'next/navigation';
import styles from './course.module.css';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) return {};
  return {
    title: `${course.title} | Parastructure`,
    description: course.description,
  };
}

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  const emiAmount = Math.ceil(course.price / course.emiMonths);

  return (
    <div className={styles.page}>

      {/* ---- Hero Banner ---- */}
      <div className={styles.heroBanner} style={{ '--course-color': course.color }}>
        {course.image && (
          <Image 
            src={course.image} 
            alt={course.title} 
            fill 
            className={styles.heroBannerImage}
            priority
          />
        )}
        <div className={styles.heroBannerOverlay} />
        <div className={styles.heroBannerInner}>
          <Link href="/#programs" className={styles.backLink}>
            ← All Programs
          </Link>
          <div className={styles.heroBadges}>
            <span className={styles.levelBadge}>{course.level}</span>
            <span className={styles.modeBadge}>📡 {course.mode}</span>
            <span className={styles.langBadge}>🗣 {course.language}</span>
          </div>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroDesc}>{course.description}</p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><strong>{course.duration}</strong><span>Duration</span></div>
            <div className={styles.statDivider}/>
            <div className={styles.heroStat}><strong>{course.hours}</strong><span>Total Hours</span></div>
            <div className={styles.statDivider}/>
            <div className={styles.heroStat}><strong>{course.sessions}</strong><span>Live Sessions</span></div>
          </div>
        </div>
      </div>

      {/* ---- Content Grid ---- */}
      <div className={styles.contentLayout}>
        <div className={styles.mainContent}>

          {/* Curriculum */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Curriculum</h2>
            <div className={styles.modules}>
              {course.modules.map((mod, i) => (
                <details key={i} className={styles.moduleItem}>
                  <summary className={styles.moduleSummary}>
                    <span className={styles.moduleNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.moduleTitle}>{mod.title}</span>
                    <span className={styles.moduleToggle}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </summary>
                  <ul className={styles.topicList}>
                    {mod.topics.map((t, j) => (
                      <li key={j} className={styles.topicItem}>
                        <span className={styles.topicDot}/>
                        {t}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You'll Achieve</h2>
            <div className={styles.outcomesGrid}>
              {course.outcomes.map((o, i) => (
                <div key={i} className={styles.outcomeCard}>
                  <span className={styles.outcomeCheck}>✓</span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Who is this for */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Who Is This For?</h2>
            <ul className={styles.audienceList}>
              {course.targetAudience.map((a, i) => (
                <li key={i} className={styles.audienceItem}>
                  <span className={styles.audienceDot} style={{ background: course.color }}/>
                  {a}
                </li>
              ))}
            </ul>
          </section>

          {/* Tools */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tools You'll Master</h2>
            <div className={styles.toolsRow}>
              {course.tools.map((t) => (
                <span key={t} className={styles.toolChip}>{t}</span>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <Testimonials items={course.testimonials} />
          </section>

        </div>

        {/* ---- Sticky Sidebar ---- */}
        <aside className={styles.sidebar}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingTop} style={{ '--course-color': course.color }}>
              <div className={styles.pricingLabel}>Program Fee</div>
              <div className={styles.price}>{formatPrice(course.price)}</div>
              <div className={styles.emiLine}>
                or <strong>{formatPrice(emiAmount)}/mo</strong> × {course.emiMonths} months
              </div>
            </div>

            <ul className={styles.includesList}>
              {[
                `${course.sessions} live sessions`,
                `${course.hours} of content`,
                'Recordings for 1 year',
                'Real project data & reviews',
                '1-on-1 mentorship',
                'Portfolio building',
                'Community access',
                '7-day money-back guarantee',
              ].map((item) => (
                <li key={item} className={styles.includesItem}>
                  <span className={styles.includesCheck}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.pricingCardButtons}>
              <Link
                href={`/checkout/${course.id}`}
                className="btnGold"
                style={{ display: 'block', width: '100%', textAlign: 'center' }}
              >
                Enroll Now — {formatPrice(course.price)}
              </Link>
              <Link
                href="/contact"
                className="btnSecondary"
                style={{ display: 'block', width: '100%', textAlign: 'center' }}
              >
                Ask a Question
              </Link>
            </div>

            <p className={styles.guarantee}>
              🔒 Secure payment via Razorpay · UPI, Cards, Net Banking, EMI
            </p>
            <p className={styles.guarantee}>
              ✅ 7-day full refund if not satisfied
            </p>
          </div>

          {/* Cohort info */}
          <div className={styles.cohortCard}>
            <div className={styles.cohortRow}>
              <span>📅 Next Cohort</span>
              <strong>June 15, 2026</strong>
            </div>
            <div className={styles.cohortRow}>
              <span>👥 Batch Size</span>
              <strong>Max 40 Students</strong>
            </div>
            <div className={styles.cohortRow}>
              <span>🕐 Class Time</span>
              <strong>Sat & Sun, 10–12 AM</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
