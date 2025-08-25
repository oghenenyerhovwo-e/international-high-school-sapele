"use client"

// modules
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronLeft, FaChevronRight, FaGraduationCap } from 'react-icons/fa';

// assets pic and files
import { classSubjectsInfo } from '@/data';

// css
import styles from './academicprograms.module.css';

interface Subject {
  name: string;
  category?: string;
}

interface ClassInfo {
  id: string;
  name: string;
  level: string;
  description: string;
  subjects: Subject[];
  color: string;
}

const AcademicPrograms = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize class data to prevent unnecessary re-renders
  const classData = useMemo((): ClassInfo[] => classSubjectsInfo, []);

  // Throttled scroll handler
  const updateArrowVisibility = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }, 100);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateArrowVisibility);
      window.addEventListener('resize', updateArrowVisibility);
      // Initial check
      updateArrowVisibility();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateArrowVisibility);
      }
      window.removeEventListener('resize', updateArrowVisibility);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateArrowVisibility]);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }, []);

  const toggleClassSelection = useCallback((classId: string) => {
    setSelectedClass(prev => prev === classId ? null : classId);
  }, []);

  // Animation variants for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const subjectVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section className={`${styles.academicPrograms} content-grid`} ref={containerRef}>
      <div className={styles.backgroundBlob}></div>
      
      <div className={styles.header}>
        <h2>Academic Programs</h2>
        <p className="spacing-md">Our comprehensive curriculum is designed to nurture well-rounded individuals prepared for future challenges</p>
        
        {/* Scroll indicator for mobile */}
        <div className={styles.scrollHint}>
          <span>Scroll horizontally to explore all programs</span>
          <div className={styles.scrollDots}>
            {classData.map((_, index) => (
              <div key={index} className={styles.dot}></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollWrapper}>
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button 
              className={`${styles.scrollButton} ${styles.leftButton}`}
              onClick={scrollLeft}
              aria-label="Scroll left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>
          )}
        </AnimatePresence>
        
        <div className={styles.classesContainer} ref={scrollContainerRef}>
          {classData.map((classInfo) => (
            <motion.div 
              key={classInfo.id}
              className={`${styles.classCard} ${selectedClass === classInfo.id ? styles.active : ''}`}
              style={{ '--class-color': classInfo.color } as React.CSSProperties}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleClassSelection(classInfo.id)}
            >
              <div className={styles.classHeader}>
                <div className={styles.classIcon}>
                  <FaGraduationCap />
                </div>
                <h3>{classInfo.name}</h3>
                <span className={styles.level}>{classInfo.level}</span>
              </div>
              
              <p className={styles.description}>{classInfo.description}</p>
              
              <div className={styles.subjectCount}>
                <FaBook />
                <span>{classInfo.subjects.length} subjects</span>
              </div>
              
              <AnimatePresence>
                {selectedClass === classInfo.id && (
                  <motion.div 
                    className={styles.subjectsContainer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>Subjects</h4>
                    <div className={styles.subjectsGrid}>
                      {classInfo.subjects.map((subject, index) => (
                        <motion.span 
                          key={index}
                          className={styles.subject}
                          variants={subjectVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.03 }}
                        >
                          {subject.name}
                          {subject.category && <span className={styles.category}>{subject.category}</span>}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <AnimatePresence>
          {showRightArrow && (
            <motion.button 
              className={`${styles.scrollButton} ${styles.rightButton}`}
              onClick={scrollRight}
              aria-label="Scroll right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Gradient fade effects on the edges */}
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
      </div>

      <div className={styles.waveDivider}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shapeFill}></path>
        </svg>
      </div>
    </section>
  );
};

export default AcademicPrograms;