"use client"

// modules
import React, { useRef } from 'react';

// components
import { motion, useInView } from 'framer-motion';
import { 
  FaFlask, 
  FaLaptop, 
  FaGraduationCap, 
  FaUsers, 
  FaSmile, 
  FaChalkboardTeacher,
  FaQuoteLeft,
  FaSignature,
  FaAward,
  FaHeart
} from 'react-icons/fa';
import Image from 'next/image';

// assets
import { 
  schoolDayPic,
  technologyPic,
  proprietressPic,
} from '@/assets';

// css
import styles from './about.module.css';

const About = () => {
  const sectionRef = useRef(null);
  const proprietressRef = useRef(null);
  const isProprietressInView = useInView(proprietressRef, { once: true, margin: "-100px" });
  
  
  // Features data
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
      title: "State-of-the-art laboratories",
      description: "State-of-the-art laboratories where students can explore and experiment with the latest equipment and technology.",
      image: schoolDayPic,
      stats: "5 fully equipped labs"
    },
    {
      icon: <FaLaptop />,
      title: "Technology Integration",
      description: "Modern computing facilities with the latest technology to prepare students for the digital future and careers in tech.",
      image: technologyPic,
      stats: "1:1 device ratio for students"
    },
    {
      icon: <FaUsers />,
      title: "Parent Engagement",
      description: "Regular opportunities for parents to interact with teachers and discuss their child's progress in a collaborative environment.",
      image: schoolDayPic,
      stats: "3 parent-teacher events yearly"
    },
    {
      icon: <FaSmile />,
      title: "Holistic Development",
      description: "Each term features exciting events and activities that make learning enjoyable and build community spirit.",
      image: technologyPic,
      stats: "3+ major extracurricular activities yearly"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Inspiring Environments",
      description: "Our campus features bright, airy classrooms and facilities designed to inspire creativity, focus, and a love for learning.",
      image: schoolDayPic,
      stats: "15-acre school with modern facilities"
    }
  ];

  return (
    <motion.section 
      id="about" 
      className={`${styles.about} full-width`}
      ref={sectionRef}
    >
      <>
        {/* Header Section */}
        <motion.div 
          className={styles.aboutHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2>Excellence in <span className={styles.highlight}>Education</span></h2>
          <p className={`spacing-md ${styles.subtitle}`}>
            Where curious minds grow, explore, and achieve remarkable success
          </p>
        </motion.div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={styles.featureStats}>
                  <FaAward /> 
                  <span>{feature.stats}</span>
                </div>
              </div>
              
              <motion.div 
                className={styles.featureImage}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
              >
                <Image 
                  src={feature.image} 
                  alt={feature.title}
                  placeholder="blur"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Proprietress Section */}
        <motion.div 
          className={styles.proprietressSection}
          ref={proprietressRef}
          initial={{ opacity: 0 }}
          animate={isProprietressInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.proprietressContent}>
            <motion.div 
              className={styles.proprietressImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image 
                src={proprietressPic} 
                alt="School Proprietress" 
                placeholder="blur"
              />
              <div className={styles.imageBorder}></div>
            </motion.div>

            <motion.div 
              className={styles.proprietressMessage}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className={styles.quoteIcon}><FaQuoteLeft /></div>
              <h3>Shaping Future <span className={styles.highlight}>Leaders</span></h3>
              
              <blockquote>
                {'"'}At our school, we believe in nurturing not just academic excellence but also character, creativity, and confidence. Our holistic approach ensures that each child discovers their unique potential and develops the skills needed to thrive in an ever-changing world.{'"'}
              </blockquote>
              
              <div className={styles.proprietressInfo}>
                <div className={styles.signature}>
                  <FaSignature />
                  <div>
                    <h4>Mrs. Ofotokun</h4>
                    <p>Proprietress & Education Director</p>
                  </div>
                </div>
                <div className={styles.experience}>
                  <FaHeart />
                  <span>25+ Years in Education</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </>
    </motion.section>
  );
};

export default About;