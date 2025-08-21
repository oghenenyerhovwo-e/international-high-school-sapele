"use client"

// modules
import { useState } from 'react';

// components
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, BookOpen, User, HelpCircle } from 'react-feather';
import { Header } from '@/components';

// css
import styles from './studentslogin.module.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      {/* Animated background elements */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
        <div className={styles.floatingShape3}></div>
      </div>
      
      <div className={styles.loginContent}>
        <motion.div 
          className={styles.loginCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            <h1 className={styles.title}>Student Portal</h1>
            <p className={styles.subtitle}>Access your academic resources and information</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <motion.div 
              className={styles.inputGroup}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="studentId" className={styles.inputLabel}>
                Registration / ID Number
              </label>
              <div className={styles.inputContainer}>
                <User size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your student ID"
                  className={styles.inputField}
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              className={styles.inputGroup}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.inputContainer}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={styles.inputField}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                type="submit" 
                className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  'Sign In to Portal'
                )}
              </button>
            </motion.div>
          </form>

          {/* Support Section */}
          <motion.div 
            className={styles.supportSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.divider}>
              <span>Need Help?</span>
            </div>
            
            <Link href="/contact-admin" className={styles.supportLink}>
              <HelpCircle size={16} />
              <span>Contact Admin for Login Assistance</span>
            </Link>
            
            <div className={styles.helpText}>
              <p>If you{"'"}re having trouble accessing your account, please contact the administration office for support.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Footer */}
        <motion.div 
          className={styles.loginFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>&copy; {new Date().getFullYear()} School Name. All rights reserved.</p>
          <p>Secure Student Portal Access</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentLogin;