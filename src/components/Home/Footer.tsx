"use client"
// modules

// components
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,  
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaClock,
  FaArrowRight
} from 'react-icons/fa';

// css
import styles from './footer.module.css';

// Import your logo and other images
// assets images and files
import { logoImg } from '@/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Academic Programs', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'News & Events', href: '/news' },
    { name: 'Student Portal', href: '/students/login' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={`content-grid ${styles.footerMain}`}>
        <div className={styles.footerGrid}>
          {/* School Info */}
          <div className={styles.footerSection}>
            <div className={styles.logoContainer}>
              <Image
                src={logoImg}
                alt="School Logo"
                width={180}
                height={60}
                className={styles.logo}
              />
            </div>
            <p className={styles.schoolDescription}>
              Empowering students to achieve excellence in academics, character, and leadership 
              through a rigorous curriculum and supportive community environment.
            </p>
            <div className={styles.accreditation}>
              <Image
                src={logoImg}
                alt="Accreditation Badge"
                width={80}
                height={80}
              />
              <span>Fully Accredited by Education Board</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className={styles.footerLink}>
                    <FaArrowRight />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt />
                <span>123 Education Avenue, Knowledge City, 10001</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope />
                <span>info@schoolname.edu</span>
              </div>
              <div className={styles.contactItem}>
                <FaClock />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </div>
            </div>

            {/* Social Media */}
            <div className={styles.socialSection}>
              <h4 className={styles.socialTitle}>Follow Us</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            {/* <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Stay Updated</h4>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={`content-grid ${styles.footerBottomContent}`}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} International High School. All rights reserved.</p>
          </div>
          {/* <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.separator}>|</span>
            <Link href="/terms">Terms of Service</Link>
            <span className={styles.separator}>|</span>
            <Link href="/sitemap">Sitemap</Link>
          </div> */}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.footerOrnament}></div>
    </footer>
  );
};

export default Footer;