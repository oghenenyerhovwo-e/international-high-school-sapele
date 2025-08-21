"use client"

// modules
import { useState, useRef, useEffect } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronLeft, FaChevronRight, FaGraduationCap } from 'react-icons/fa';

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

  const classData: ClassInfo[] = [
    {
      id: 'js1',
      name: 'JS1',
      level: 'Junior Secondary',
      description: 'Foundation year introducing core subjects',
      subjects: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Basic Science' },
        { name: 'Social Studies' },
        { name: 'French' },
        { name: 'Computer Studies' },
        { name: 'Creative Arts' },
        { name: 'Home Economics' },
        { name: 'Physical Education' }
      ],
      color: 'var(--clr-primary)'
    },
    {
      id: 'js2',
      name: 'JS2',
      level: 'Junior Secondary',
      description: 'Building on foundational knowledge with more depth',
      subjects: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Basic Science' },
        { name: 'Social Studies' },
        { name: 'French' },
        { name: 'Computer Studies' },
        { name: 'Creative Arts' },
        { name: 'Home Economics' },
        { name: 'Physical Education' },
        { name: 'Business Studies' }
      ],
      color: 'var(--clr-secondary)'
    },
    {
      id: 'js3',
      name: 'JS3',
      level: 'Junior Secondary',
      description: 'Preparation for senior secondary with focused curriculum',
      subjects: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Integrated Science' },
        { name: 'Social Studies' },
        { name: 'French' },
        { name: 'Computer Studies' },
        { name: 'Basic Technology' },
        { name: 'Religious Studies' }
      ],
      color: 'var(--clr-accent)'
    },
    {
      id: 'ss1',
      name: 'SS1',
      level: 'Senior Secondary',
      description: 'Broad curriculum before specialization',
      subjects: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Biology' },
        { name: 'Literature in English' },
        { name: 'Government' },
        { name: 'Economics' },
        { name: 'Financial Accounting' },
        { name: 'Further Mathematics' },
        { name: 'Agricultural Science' },
        { name: 'Geography' }
      ],
      color: '#8A2BE2' // Purple
    },
    {
      id: 'ss2-science',
      name: 'SS2 Science',
      level: 'Senior Secondary',
      description: 'Science stream with focus on core STEM subjects',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Physics', category: 'Science' },
        { name: 'Chemistry', category: 'Science' },
        { name: 'Biology', category: 'Science' },
        { name: 'Further Mathematics', category: 'Science' },
        { name: 'Agricultural Science', category: 'Elective' }
      ],
      color: '#228B22' // Forest Green
    },
    {
      id: 'ss2-art',
      name: 'SS2 Art',
      level: 'Senior Secondary',
      description: 'Arts and humanities focused curriculum',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Literature in English', category: 'Arts' },
        { name: 'Government', category: 'Arts' },
        { name: 'Economics', category: 'Arts' },
        { name: 'Financial Accounting', category: 'Arts' },
        { name: 'Commerce', category: 'Arts' },
        { name: 'CRK/IRK', category: 'Arts' }
      ],
      color: '#DC143C' // Crimson
    },
    {
      id: 'ss3-science',
      name: 'SS3 Science',
      level: 'Senior Secondary',
      description: 'Final year preparation for science students',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Physics', category: 'Science' },
        { name: 'Chemistry', category: 'Science' },
        { name: 'Biology', category: 'Science' },
        { name: 'Further Mathematics', category: 'Science' }
      ],
      color: '#20B2AA' // Light Sea Green
    },
    {
      id: 'ss3-art',
      name: 'SS3 Art',
      level: 'Senior Secondary',
      description: 'Final year preparation for arts students',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Literature in English', category: 'Arts' },
        { name: 'Government', category: 'Arts' },
        { name: 'Economics', category: 'Arts' },
        { name: 'Financial Accounting', category: 'Arts' }
      ],
      color: '#FF8C00' // Dark Orange
    }
  ];

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Scroll to end on initial render to ensure all content is accessible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedClass(selectedClass === classInfo.id ? null : classInfo.id)}
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
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
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