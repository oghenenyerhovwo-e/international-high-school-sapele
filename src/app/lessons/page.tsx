"use client"

import React from 'react'

import styles from "./lessons.module.css"
import ThemeToggle from '@/components/ThemeToggle'
import { motion } from 'framer-motion';

const Page = () => {
  return (
    <div className={`content-grid ${styles.container}`}>
        <header className={styles.header}>
            <ThemeToggle />
        </header>
        <motion.div
            className={styles.main}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >

        </motion.div>
    </div>
  )
}

export default Page