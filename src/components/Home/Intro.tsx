"use client"

// modules
import { useState, useEffect, useRef } from 'react';

// components/IntroSection.tsx
import Image from 'next/image';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// assets pic and files
import { schoolDayPic } from '@/assets';

// css
import styles from './intro.module.css';

// Sample images - replace with your actual images
const heroImages = [
  {
    src: schoolDayPic,
    alt: "School day program",
    caption: "Engaging school day programs for holistic development"
  },
  {
    src: schoolDayPic,
    alt: "Students in well-equipped science lab",
    caption: "Hands-on learning in our advanced laboratories"
  },
  {
    src: schoolDayPic,
    alt: "Championship sports team",
    caption: "2023 Regional Champions - Basketball"
  },
  {
    src: schoolDayPic,
    alt: "Graduating students celebrating",
    caption: "95% WAEC success rate in 2023"
  },
  {
    src: schoolDayPic,
    alt: "Students in computer lab",
    caption: "Technology-integrated learning spaces"
  }
];

const IntroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset timeout when index changes
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  // Auto-advance slideshow
  useEffect(() => {
    if (isPlaying) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => resetTimeout();
  }, [currentImageIndex, isPlaying]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  return (
    <section className={`${styles.intro} full-width`}>
      {/* Hero Image Slideshow */}
      <div className={styles.heroSection}>
        <div className={styles.heroSlideshow}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className={styles.heroImageContainer}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                fill
                className={styles.heroImage}
                priority={currentImageIndex === 0}
                onLoad={() => setIsLoading(false)}
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.imageCaption}>
                {heroImages[currentImageIndex].caption}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Loading placeholder */}
          {isLoading && (
            <div className={styles.imagePlaceholder}></div>
          )}
          
          {/* Navigation arrows */}
          <button className={styles.prevButton} onClick={prevImage} aria-label="Previous slide">
            <FaChevronLeft />
          </button>
          <button className={styles.nextButton} onClick={nextImage} aria-label="Next slide">
            <FaChevronRight />
          </button>
          
          {/* Play/Pause button */}
          <button className={styles.playPauseButton} onClick={togglePlayPause} aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          {/* Slide indicators */}
          <div className={styles.slideIndicators}>
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      {/* Content - Adjusted z-index to be above slideshow */}
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
            
            <motion.div className={styles.achievementBadges}>
              <span className={styles.badge}>95% WAEC Success</span>
              <span className={styles.badge}>Top JAMB Scores</span>
              <span className={styles.badge}>Championship Teams</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.buttonGroup}
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
              
              <motion.button 
                className={`btn ${styles.secondaryButton}`}
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Tour
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave background - Positioned above slideshow but below content */}
      <div className={styles.waveContainer}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      
      {/* Blobs with better visibility */}
      <motion.div 
        className={styles.blob1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 0.7,
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
          opacity: 0.6,
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
          opacity: 0.5,
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