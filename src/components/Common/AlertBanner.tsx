"use client"

// modules
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaTimes, FaBell, FaInfoCircle, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';

// assets
import { AlertTypes } from "@/data"

// css
import styles from './alertbanner.module.css';

interface AlertBannerProps {
  alerts: AlertTypes[];
  autoRotate?: boolean;
  rotateInterval?: number;
}

const AlertBanner = ({ 
  alerts = [], 
  autoRotate = true, 
  rotateInterval = 8000 
}: AlertBannerProps) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize current alert
  const currentAlert = useMemo(() => {
    return alerts.length > 0 ? alerts[currentAlertIndex] : null;
  }, [alerts, currentAlertIndex]);

  // Memoize display message
  const displayMessage = useMemo(() => {
    if (!currentAlert) return '';
    return expanded && currentAlert.fullMessage 
      ? currentAlert.fullMessage 
      : currentAlert.message;
  }, [currentAlert, expanded]);

  // Clear rotation interval
  const clearRotationInterval = useCallback(() => {
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }
  }, []);

  // Auto-rotate through alerts
  useEffect(() => {
    if (!autoRotate || alerts.length <= 1 || isPaused) {
      clearRotationInterval();
      return;
    }

    rotationIntervalRef.current = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
      setExpanded(false);
    }, rotateInterval);

    return clearRotationInterval;
  }, [alerts.length, autoRotate, rotateInterval, isPaused, clearRotationInterval]);

  // Memoized event handlers
  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
    setExpanded(false);
  }, [alerts.length]);

  const goToPrev = useCallback(() => {
    setCurrentAlertIndex((prevIndex) => (prevIndex - 1 + alerts.length) % alerts.length);
    setExpanded(false);
  }, [alerts.length]);

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Memoize icon component
  const IconComponent = useMemo(() => {
    if (!currentAlert) return FaInfoCircle;
    
    switch (currentAlert.type) {
      case 'warning':
        return FaExclamationCircle;
      case 'critical':
        return FaBell;
      default:
        return FaInfoCircle;
    }
  }, [currentAlert]);

  // Animation variants for better performance
  const messageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const bannerVariants = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 }
  };

  // Simplified icon animation
  const iconAnimationProps = useMemo(() => {
    if (currentAlert?.type === 'critical') {
      return {
        animate: { scale: [1, 1.2, 1] },
        transition: { duration: 0.8, repeat: Infinity }
      };
    }
    return {};
  }, [currentAlert?.type]);

  // If no alerts, don't render anything
  if (!alerts || alerts.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${styles.alertBanner} ${currentAlert ? styles[currentAlert.type] : ''} ${expanded ? styles.expanded : ''}`}
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.alertStripes}></div>
          
          <div className={`content-grid ${styles.alertContent}`}>
            <motion.div 
              className={styles.alertIcon}
              {...iconAnimationProps}
            >
              {IconComponent && <IconComponent />}
            </motion.div>
            
            <div className={styles.alertMessageContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAlert?.id || 'no-alert'}
                  className={styles.alertMessage}
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {displayMessage}
                  {currentAlert?.fullMessage && (
                    <button 
                      className={styles.expandButton}
                      onClick={toggleExpand}
                      aria-label={expanded ? "Collapse message" : "Expand message"}
                    >
                      {expanded ? <FaCompress /> : <FaExpand />}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className={styles.alertControls}>
              {alerts.length > 1 && (
                <>
                  <button 
                    className={styles.navButton}
                    onClick={goToPrev}
                    aria-label="Previous alert"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className={styles.alertCounter}>
                    {currentAlertIndex + 1} / {alerts.length}
                  </div>
                  
                  <button 
                    className={styles.navButton}
                    onClick={goToNext}
                    aria-label="Next alert"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
              
              <button 
                className={styles.dismissButton}
                onClick={handleDismiss}
                aria-label="Dismiss all alerts"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;