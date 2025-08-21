"use client"

// modules
import { useState, useEffect } from 'react';

// components
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaTimes, FaBell, FaInfoCircle, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';

// css
import styles from './alertbanner.module.css';

interface Alert {
  id: string;
  message: string;
  fullMessage?: string;
  type: 'info' | 'warning' | 'critical';
}

interface AlertBannerProps {
  alerts: Alert[];
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

  // Auto-rotate through alerts
  useEffect(() => {
    if (!autoRotate || alerts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
      setExpanded(false); // Collapse when rotating to new alert
    }, rotateInterval);

    return () => clearInterval(timer);
  }, [alerts.length, autoRotate, rotateInterval, isPaused]);

  // If no alerts, don't render anything
  if (!alerts || alerts.length === 0) return null;

  const currentAlert = alerts[currentAlertIndex];
  const displayMessage = expanded && currentAlert.fullMessage 
    ? currentAlert.fullMessage 
    : currentAlert.message;

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const goToNext = () => {
    setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
    setExpanded(false);
  };

  const goToPrev = () => {
    setCurrentAlertIndex((prevIndex) => (prevIndex - 1 + alerts.length) % alerts.length);
    setExpanded(false);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getIcon = () => {
    switch (currentAlert.type) {
      case 'warning':
        return <FaExclamationCircle />;
      case 'critical':
        return <FaBell />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${styles.alertBanner} ${styles[currentAlert.type]} ${expanded ? styles.expanded : ''}`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.alertStripes}></div>
          
          <div className={`content-grid ${styles.alertContent}`}>
            <motion.div 
              className={styles.alertIcon}
              animate={{ 
                scale: currentAlert.type === 'critical' ? [1, 1.2, 1] : 1,
              }}
              transition={{ 
                duration: currentAlert.type === 'critical' ? 0.8 : 0,
                repeat: currentAlert.type === 'critical' ? Infinity : 0
              }}
            >
              {getIcon()}
            </motion.div>
            
            <div className={styles.alertMessageContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAlert.id}
                  className={styles.alertMessage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayMessage}
                  {currentAlert.fullMessage && (
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