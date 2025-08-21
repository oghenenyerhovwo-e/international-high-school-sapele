"use client"

// modules
import React, { useState, useRef, useEffect } from 'react';

// components
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  FaFlask, 
  FaLaptop, 
  FaGraduationCap, 
  FaUsers, 
  FaSmile, 
  FaChalkboardTeacher,
  FaQuoteLeft,
  FaSignature
} from 'react-icons/fa';
import Image from 'next/image';

// assets
import { 
  schoolDayPic,
  proprietressPic,
} from '@/assets';

// css
import styles from './about.module.css';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Academic Excellence",
      description: "Our rigorous curriculum and dedicated faculty ensure students achieve excellence in all subjects, preparing them for top universities worldwide.",
      image: schoolDayPic,
      stats: "98% pass rate in national exams"
    },
    {
      icon: <FaFlask />,
      title: "Science Laboratories",
      description: "State-of-the-art laboratories where students can explore and experiment with the latest equipment and technology.",
      image: schoolDayPic,
      stats: "12 fully equipped labs"
    },
    {
      icon: <FaLaptop />,
      title: "Technology Integration",
      description: "Modern computing facilities with the latest technology to prepare students for the digital future and careers in tech.",
      image: schoolDayPic,
      stats: "1:1 device ratio for students"
    },
    {
      icon: <FaUsers />,
      title: "Parent Engagement",
      description: "Regular opportunities for parents to interact with teachers and discuss their child's progress in a collaborative environment.",
      image: schoolDayPic,
      stats: "4 parent-teacher events yearly"
    },
    {
      icon: <FaSmile />,
      title: "Holistic Development",
      description: "Each term features exciting events and activities that make learning enjoyable and build community spirit.",
      image: schoolDayPic,
      stats: "20+ extracurricular clubs"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Inspiring Environments",
      description: "Our campus features bright, airy classrooms and facilities designed to inspire creativity, focus, and a love for learning.",
      image: schoolDayPic,
      stats: "15-acre campus with modern facilities"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      {/* Animated background elements */}
      <motion.div 
        className={styles.animatedCircle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <motion.div 
        className={styles.animatedCircle2}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
      
      <div className={styles.floatingParticles}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.7, 0],
              x: Math.random() * 100 - 50
            }}
            transition={{ 
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="content-grid">
        <motion.div 
          className={styles.aboutHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.titleDecoration}></div>
          <h2>Excellence in <span className={styles.highlight}>Education</span></h2>
          <p className={`spacing-md ${styles.subtitle}`}>Where curious minds grow, explore, and achieve remarkable success</p>
          <div className={styles.headerDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerIcon}><FaGraduationCap /></div>
            <div className={styles.dividerLine}></div>
          </div>
        </motion.div>

        <div className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            <motion.div 
              className={styles.featuresList}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`${styles.featureItem} ${activeFeature === index ? styles.active : ''}`}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={styles.featureNumber}>0{index + 1}</div>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                    <div className={styles.featureStats}>{feature.stats}</div>
                  </div>
                  <div className={styles.featureHoverIndicator}></div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className={styles.featureVisual}
              style={{ y, opacity }}
            >
              <div className={styles.featureImage}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={features[activeFeature].image} 
                    alt={features[activeFeature].title}
                    fill
                  />
                  <div className={styles.imageOverlay}></div>
                  <div className={styles.imageFrame}></div>
                </div>
              </div>
              
              <motion.div 
                className={styles.activeIndicator}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={activeFeature}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className={styles.indicatorText}>Focus Area</div>
                <div className={styles.indicatorProgress}>
                  <motion.div 
                    className={styles.progressBar}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Proprietress Section */}
        <motion.div 
          className={styles.proprietressSection}
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.waveDivider}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shapeFill}></path>
            </svg>
          </div>

          <div className={styles.proprietressContent}>
            <motion.div 
              className={styles.proprietressImage}
              initial={{ opacity: 0, x: -40, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className={styles.imageFrame}>
                <Image 
                  src={proprietressPic} 
                  alt="School Proprietress" 
                  fill
                />
                <div className={styles.frameDecoration}></div>
                <div className={styles.imageGlow}></div>
              </div>
              
              <div className={styles.proprietressInfo}>
                <h4>Mrs. Jane Smith</h4>
                <p>Proprietress & Education Director</p>
                <div className={styles.signatureDecoration}>
                  <FaSignature />
                  <span>25+ Years in Education</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.proprietressMessage}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className={styles.quoteIcon}><FaQuoteLeft /></div>
              <h3>Shaping Future <span className={styles.highlight}>Leaders</span></h3>
              
              <blockquote>
                {'"'}At our school, we believe in nurturing not just academic excellence but also character, creativity, and confidence. Our holistic approach ensures that each child discovers their unique potential and develops the skills needed to thrive in an ever-changing world.{'"'}
              </blockquote>
              
              <div className={styles.messageHighlights}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}></div>
                  <span>Individual attention with small class sizes</span>
                </div>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}></div>
                  <span>Focus on critical thinking and problem-solving</span>
                </div>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}></div>
                  <span>Values-based education for character development</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className={styles.footerWave}>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className={styles.shapeFill}></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;