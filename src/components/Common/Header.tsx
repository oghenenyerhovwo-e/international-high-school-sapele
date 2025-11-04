"use client"

// components/Header.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook,
  FaBlog,
  FaSignInAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Your existing component
import Image from 'next/image';

// objects and functions

// assets images and files
import { logoImg } from '@/assets';

// css
import styles from './header.module.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Students', path: '/students/login', icon: <FaUserGraduate /> },
    { name: 'Teachers', path: '/teachers/login', icon: <FaChalkboardTeacher /> },
    { name: 'Curriculum', path: '/curriculum', icon: <FaBook /> },
    { name: 'Blog', path: '/blog', icon: <FaBlog /> },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up
      if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
        setIsVisible(true);
        
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Set timeout to hide after 10 seconds
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
        }, 10000);
      } 
      // Hide when scrolling down
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
      
      // Track scroll position
      setScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    // Initial hide after 5 seconds
    const initialTimeout = setTimeout(() => {
      if (window.scrollY < 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }
    }, 10000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initialTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header 
            className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={`${styles.headerContent}`}>
              {/* Brand Logo/Name */}
              <Link href="/" className={styles.brand}>
                <div className={styles.logo}>
                  <div className={styles.logoIcon}>
                    <Image
                        src={logoImg}
                        alt="International School Logo"
                    />
                  </div>
                  <div className={styles.logoText}>IHS</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className={styles.desktopNav}>
                <ul className={styles.navList}>
                  {navItems.map((item) => (
                    <li key={item.name} className={styles.navItem}>
                      <Link href={item.path} className={styles.navLink}>
                        <span className={styles.navIcon}>{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right Side Controls */}
              <div className={styles.controls}>
                <Link href="/students/login" className={styles.loginButton}>
                  <FaSignInAlt className={styles.loginIcon} />
                  <span>Login</span>
                </Link>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button 
                className={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <span className={styles.cancelIcon}><FaTimes /></span> : <FaBars />}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                  <Link 
                    href={item.path} 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={styles.mobileNavIcon}>{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* <li className={styles.mobileNavItem}>
                <Link 
                  href="/login" 
                  className={styles.mobileLoginButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt className={styles.mobileLoginIcon} />
                  Student/Teacher Login
                </Link>
              </li> */}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;