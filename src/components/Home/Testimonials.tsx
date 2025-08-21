"use client"

// modules
import { useState, useEffect } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';

// css
import styles from './testimonials.module.css';

import { 
  proprietressPic,
} from '@/assets';

// Import avatar images (you can replace these with actual images)


interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: StaticImageData;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Parent of JS2 Student',
      content: 'This school has been a blessing for my daughter. The teachers are dedicated, the curriculum is well-structured, and the facilities are excellent. Her confidence has grown tremendously since she started here.',
      rating: 5,
      avatar: proprietressPic
    },
    {
      id: 2,
      name: 'David Mensah',
      role: 'SS3 Science Student',
      content: 'The academic environment here challenges you to be your best. The science program is exceptional, with well-equipped labs and teachers who go the extra mile to ensure we understand complex concepts.',
      rating: 5,
      avatar: proprietressPic
    },
    {
      id: 3,
      name: 'Amina Okafor',
      role: 'Parent of JS1 Student',
      content: 'As a working parent, I appreciate the communication from teachers and administration. The school app keeps me updated on my child\'s progress and school activities. The values they instill align with our family values.',
      rating: 4,
      avatar: proprietressPic
    },
    {
      id: 4,
      name: 'Mr. Chinedu Okoro',
      role: 'Mathematics Teacher',
      content: 'Teaching here has been incredibly rewarding. The students are eager to learn, and the administration provides all the support we need to innovate in our teaching methods. It feels like a true community.',
      rating: 5,
      avatar: proprietressPic
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[currentIndex].id}
            className={styles.testimonialCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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