'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './components.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial scroll position
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes (click on link)
  const closeMenu = () => setMenuOpen(false);

  // Determine if we are on a page with a dark hero banner at the top
  const hasDarkHero = pathname.startsWith('/courses/');
  const isDarkTheme = hasDarkHero && !scrolled;

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''} ${isDarkTheme ? styles.headerDarkTheme : ''}`}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          PARA<span className={styles.logoAccent}>STRUCTURE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.navLinks} aria-label="Main navigation">
          <Link href="/#programs" className={styles.navLink}>Programs</Link>
          <Link href="/#about" className={styles.navLink}>Why Us</Link>
          <Link href="/#testimonials" className={styles.navLink}>Reviews</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className={styles.headerCta}>
          <span className={styles.cohortBadge}>🔴 June Cohort Open</span>
          <Link href="/contact" className="btnGold">Apply Now</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/#programs" className={styles.mobileNavLink} onClick={closeMenu}>Programs</Link>
          <Link href="/#about" className={styles.mobileNavLink} onClick={closeMenu}>Why Us</Link>
          <Link href="/#testimonials" className={styles.mobileNavLink} onClick={closeMenu}>Reviews</Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>Contact</Link>
        </nav>
        <div className={styles.mobileCtas}>
          <span className={styles.cohortBadge}>🔴 June Cohort Open</span>
          <Link href="/contact" className="btnGold" style={{width:'100%', marginTop:'1rem'}} onClick={closeMenu}>
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
}
