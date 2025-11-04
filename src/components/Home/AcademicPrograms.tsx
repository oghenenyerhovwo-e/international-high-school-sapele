"use client"

// modules
import { useState, useCallback, useMemo } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaGraduationCap, FaChevronDown } from 'react-icons/fa';

// assets
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

  const toggleClassSelection = useCallback((classId: string) => {
    setSelectedClass(prev => prev === classId ? null : classId);
  }, []);

  // Memoize class data to prevent unnecessary re-renders
  const classData = useMemo((): ClassInfo[] => classSubjectsInfo, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <section className={`${styles.academicPrograms} content-grid`}>
      <div className={styles.header}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Academic Programs
        </motion.h2>
        <motion.p 
          className="spacing-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover our comprehensive curriculum designed to nurture well-rounded individuals prepared for future challenges
        </motion.p>
      </div>

      <motion.div 
        className={styles.classesContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {classData.map((classInfo) => (
          <motion.div 
            key={classInfo.id}
            className={`${styles.classCard} ${selectedClass === classInfo.id ? styles.active : ''}`}
            variants={cardVariants}
            style={{ '--class-color': classInfo.color } as React.CSSProperties}
          >
            <div 
              className={styles.classHeader}
              onClick={() => toggleClassSelection(classInfo.id)}
            >
              <div className={styles.classIcon} style={{ backgroundColor: classInfo.color }}>
                <FaGraduationCap />
              </div>
              <div className={styles.classInfo}>
                <h3>{classInfo.name}</h3>
                <span className={styles.level}>{classInfo.level}</span>
              </div>
              <motion.div 
                className={styles.chevron}
                animate={{ rotate: selectedClass === classInfo.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {selectedClass === classInfo.id && (
                <motion.div 
                  className={styles.classContent}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.description}>{classInfo.description}</p>
                  
                  <div className={styles.subjectsSection}>
                    <div className={styles.subjectCount}>
                      <FaBook />
                      <span>{classInfo.subjects.length} subjects</span>
                    </div>
                    
                    <div className={styles.subjectsGrid}>
                      {classInfo.subjects.map((subject, index) => (
                        <div key={index} className={styles.subject}>
                          <span className={styles.subjectName}>{subject.name}</span>
                          {subject.category && (
                            <span className={styles.category}>{subject.category}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AcademicPrograms;