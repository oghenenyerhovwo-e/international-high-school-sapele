// components/InfoSection.tsx
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaLightbulb, 
  FaGlobe,
  FaChartLine,
  FaHandshake
} from 'react-icons/fa';
import styles from './info.module.css';

const InfoSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className={`${styles.infoSection} full-width`}>
      <div className="content-grid">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Why Choose Our School?</h2>
          <p className={styles.subtitle}>
            We provide an exceptional learning environment that nurtures 
            intellectual curiosity, creativity, and character development
          </p>
        </motion.div>

        <motion.div 
          className={styles.featuresGrid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaGraduationCap className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Academic Excellence</h3>
            <p className={styles.featureDescription}>
              Our rigorous curriculum and dedicated faculty ensure students 
              achieve their highest academic potential.
            </p>
          </motion.div>

          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaUsers className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Inclusive Community</h3>
            <p className={styles.featureDescription}>
              We foster a diverse, welcoming environment where every student 
              feels valued and supported.
            </p>
          </motion.div>

          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaLightbulb className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Creative Thinking</h3>
            <p className={styles.featureDescription}>
              Our programs encourage innovation and problem-solving skills 
              essential for future success.
            </p>
          </motion.div>

          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaGlobe className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Global Perspective</h3>
            <p className={styles.featureDescription}>
              We prepare students to be global citizens with international 
              programs and cultural exchanges.
            </p>
          </motion.div>

          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaChartLine className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Future Readiness</h3>
            <p className={styles.featureDescription}>
              Our career guidance and technology programs equip students 
              for {"tomorrow's"} challenges.
            </p>
          </motion.div>

          <motion.div className={styles.featureCard} variants={item}>
            <div className={styles.iconContainer}>
              <FaHandshake className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Community Engagement</h3>
            <p className={styles.featureDescription}>
              Students learn the value of service through meaningful 
              community projects and partnerships.
            </p>
          </motion.div>
        </motion.div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <motion.div 
              className={styles.statNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              98<span className={styles.percent}>%</span>
            </motion.div>
            <p className={styles.statLabel}>Graduation Rate</p>
          </div>

          <div className={styles.statCard}>
            <motion.div 
              className={styles.statNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              22<span className={styles.plus}>+</span>
            </motion.div>
            <p className={styles.statLabel}>Extracurricular Programs</p>
          </div>

          <div className={styles.statCard}>
            <motion.div 
              className={styles.statNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              15<span className={styles.colon}>:</span>1
            </motion.div>
            <p className={styles.statLabel}>Student-Teacher Ratio</p>
          </div>

          <div className={styles.statCard}>
            <motion.div 
              className={styles.statNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              100<span className={styles.percent}>%</span>
            </motion.div>
            <p className={styles.statLabel}>College Acceptance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;