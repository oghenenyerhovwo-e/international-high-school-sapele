"use client"

// modules
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, BookOpen, User, HelpCircle, ArrowRight } from 'react-feather';

// components
import { Header } from '@/components';

// assets
import { schoolDayPic } from '@/assets';

// css
import styles from './studentslogin.module.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    studentId: false,
    password: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Login attempted with:', formData);
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <Header />
      
      {/* Background with optimized image */}
      <div className={styles.backgroundContainer}>
        <Image
          src={schoolDayPic}
          alt="School background"
          fill
          priority
          placeholder="blur"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay}></div>
      </div>
      
      <div className={styles.loginContent}>
        <motion.div 
          className={styles.loginCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header Section */}
          <div className={styles.loginHeader}>
            <motion.div 
              className={styles.logoContainer}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <BookOpen size={32} className={styles.logoIcon} />
            </motion.div>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Student Portal
            </motion.h1>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Access your academic resources and information
            </motion.p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <motion.div 
              className={styles.inputGroup}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={`${styles.inputContainer} ${isFocused.studentId ? styles.focused : ''}`}>
                <User size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  onFocus={() => handleFocus('studentId')}
                  onBlur={() => handleBlur('studentId')}
                  placeholder=" "
                  className={styles.inputField}
                  required
                />
                <label htmlFor="studentId" className={styles.inputLabel}>
                  Registration / ID Number
                </label>
              </div>
            </motion.div>

            <motion.div 
              className={styles.inputGroup}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className={`${styles.inputContainer} ${isFocused.password ? styles.focused : ''}`}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  placeholder=" "
                  className={styles.inputField}
                  required
                />
                <label htmlFor="password" className={styles.inputLabel}>
                  Password
                </label>
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              className={styles.buttonContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button 
                type="submit" 
                className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight size={18} className={styles.buttonIcon} />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Support Section */}
          <motion.div 
            className={styles.supportSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.divider}>
              <span>Need Help?</span>
            </div>
            
            <Link href="/contact-admin" className={styles.supportLink}>
              <HelpCircle size={16} />
              <span>Contact Admin for Login Assistance</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className={styles.loginFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>&copy; {new Date().getFullYear()} International High School. All rights reserved.</p>
          <p>Secure Student Portal Access</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentLogin;