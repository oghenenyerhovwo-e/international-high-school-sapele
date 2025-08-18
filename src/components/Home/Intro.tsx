// components/IntroSection.tsx
import { motion } from 'framer-motion';
import styles from './intro.module.css';
import { FaArrowRight } from 'react-icons/fa';

const IntroSection = () => {
  return (
    <section className={`${styles.intro} full-width`}>
      {/* Wave background */}
      <div className={styles.waveContainer}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      
      {/* Enhanced blobs with better visibility */}
       <motion.div 
        className={styles.blob1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.7, // Now properly visible
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className={styles.blob2}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.6, // Now properly visible
          y: [0, 15, 0],
          x: [0, -10, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      
      <motion.div 
        className={styles.blob3}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.5, // Now properly visible
          y: [0, 25, 0],
          x: [0, 15, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      ></motion.div>
      
      {/* Content */}
      <div className={`content-grid ${styles.contentGrid}`}>
        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className={styles.heading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Education Makes <span className={styles.highlight}>The Difference</span>
            </motion.h1>
            
            <motion.p 
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Empowering young minds to shape a brighter tomorrow
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button 
                className={`btn ${styles.ctaButton}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Discover Our Approach <FaArrowRight className={styles.arrowIcon} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className={styles.inspirationQuote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="content-grid">
          <blockquote className={styles.quote}>
            The education of even a small child does not aim at preparing him for school, 
            but for life.
          </blockquote>
        </div>
      </motion.div>
      
      {/* Scrolling indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 10
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default IntroSection;