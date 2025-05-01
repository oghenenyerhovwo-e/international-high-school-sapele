"use client"

// modules
import { motion } from 'framer-motion';

// components
import Link from 'next/link';
import Image from 'next/image';
import {
  Header,
} from "@/components"

// objects and functions
import { landingPageHeroImg } from '@/assets';

// css
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={`${styles.home} content-grid`}>
      <div className={`${styles.homeHeader} full-width`}>
        <Header />
      </div>
      <div className={`${styles.container}`}>
        <motion.div
          className={styles.main}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.heroImage}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={landingPageHeroImg}
              alt="After-school learning"
              width={1920}
              height={1080}
              layout="responsive"
              priority
            />
          </motion.div>
          <div className={styles.textSection}>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover <span className={styles.titleSpan}>After-School</span> Lessons
            </motion.h1>
            <motion.p
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Find quality, school-approved lessons by your child’s teachers —
              all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/lessons">
                <button className={styles.ctaButton}>Get Started</button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home
