"use client"

// modules
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';

// css
import styles from './testimonials.module.css';

// assets
import { schoolTestimonials } from '@/data';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: StaticImageData;
}

// Move static data outside component to prevent recreation on every render
const testimonialsData: Testimonial[] = schoolTestimonials;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize testimonials to prevent recreation on every render
  const testimonials = useMemo(() => testimonialsData, []);

  // Memoize navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Memoize star rendering function
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  }, []);

  // Auto-rotate testimonials with proper cleanup
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(goToNext, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, goToNext]);

  // Animation variants for better performance
  const testimonialVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }), []);

  // Memoize event handlers
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section className={`${styles.testimonials} content-grid`}>
      <div className={styles.backgroundElements}>
        <div className={styles.floatingCircle1}></div>
        <div className={styles.floatingCircle2}></div>
      </div>
      
      <div className={styles.header}>
        <h2>What People Say About Us</h2>
        <p>Hear from our students, parents, and staff about their experiences</p>
      </div>

      <div 
        className={styles.testimonialContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[currentIndex].id}
            className={styles.testimonialCard}
            variants={testimonialVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            
            <div className={styles.testimonialContent}>
              <p>{testimonials[currentIndex].content}</p>
            </div>
            
            <div className={styles.rating}>
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            
            <div className={styles.author}>
              <div className={styles.avatar}>
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  width={60}
                  height={60}
                  className={styles.avatarImage}
                  placeholder="blur"
                />
              </div>
              <div className={styles.authorInfo}>
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          <button className={styles.navButton} onClick={goToPrev} aria-label="Previous testimonial">
            <FaChevronLeft />
          </button>
          
          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button className={styles.navButton} onClick={goToNext} aria-label="Next testimonial">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;