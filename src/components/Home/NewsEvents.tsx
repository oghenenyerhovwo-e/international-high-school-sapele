"use client"

// modules
import { useState } from 'react';

// components
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';

// assets pic and files
import { schoolDayPic } from '@/assets';

// css
import styles from './newsevents.module.css';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  excerpt: string;
  image: StaticImageData; // Changed from string to StaticImageData
  category: string;
  featured?: boolean;
}

const NewsEvents = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'Annual Science Fair Exhibition',
      date: new Date(2023, 9, 15),
      time: '9:00 AM - 3:00 PM',
      location: 'School Main Hall',
      excerpt: 'Students showcase their innovative science projects. Parents and community members are invited to attend.',
      image: schoolDayPic,
      category: 'academic',
      featured: true
    },
    {
      id: '2',
      title: 'Basketball Championship Finals',
      date: new Date(2023, 9, 20),
      time: '4:00 PM - 6:00 PM',
      location: 'School Gymnasium',
      excerpt: 'Our school team faces rivals in the championship finals. Come support our players!',
      image: schoolDayPic,
      category: 'sports'
    },
    {
      id: '3',
      title: 'Art & Culture Festival',
      date: new Date(2023, 9, 25),
      time: '10:00 AM - 4:00 PM',
      location: 'School Grounds',
      excerpt: 'A celebration of artistic talents with performances, exhibitions, and food stalls.',
      image: schoolDayPic,
      category: 'cultural',
      featured: true
    },
    {
      id: '4',
      title: 'Parent-Teacher Conference',
      date: new Date(2023, 10, 5),
      time: '2:00 PM - 6:00 PM',
      location: 'Various Classrooms',
      excerpt: 'Opportunity for parents to meet with teachers and discuss student progress.',
      image: schoolDayPic,
      category: 'academic'
    },
    {
      id: '5',
      title: 'Robotics Club Competition',
      date: new Date(2023, 10, 12),
      time: '10:00 AM - 2:00 PM',
      location: 'Science Lab',
      excerpt: 'Robotics club members compete in designing and programming innovative robots.',
      image: schoolDayPic,
      category: 'clubs'
    },
    {
      id: '6',
      title: 'Music Concert: Autumn Melodies',
      date: new Date(2023, 10, 18),
      time: '6:00 PM - 8:00 PM',
      location: 'Auditorium',
      excerpt: 'Our talented music students perform classical and contemporary pieces.',
      image: schoolDayPic,
      category: 'cultural'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'clubs', name: 'Clubs' }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className={`${styles.newsEvents} content-grid`}>
      <div className={styles.backgroundShape}></div>
      
      <div className={styles.header}>
        <h2>News & Events</h2>
        <p>Stay updated with the latest happenings at our school</p>
      </div>

      <div className={styles.categoryFilters}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div 
        className={styles.eventsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredEvents.map((event) => (
          <motion.article 
            key={event.id} 
            className={`${styles.eventCard} ${event.featured ? styles.featured : ''}`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className={styles.eventImage}>
              <Image 
                src={event.image} 
                alt={event.title}
                fill
              />
              <div className={styles.eventCategory}>{event.category}</div>
              {event.featured && <div className={styles.featuredBadge}>Featured</div>}
            </div>
            
            <div className={styles.eventContent}>
              <div className={styles.eventDate}>
                <FaCalendarAlt />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <h3 className={styles.eventTitle}>{event.title}</h3>
              
              <p className={styles.eventExcerpt}>{event.excerpt}</p>
              
              <div className={styles.eventMeta}>
                <div className={styles.eventTime}>
                  <FaClock />
                  <span>{event.time}</span>
                </div>
                <div className={styles.eventLocation}>
                  <FaMapMarkerAlt />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <Link href={`/events/${event.id}`} className={styles.eventLink}>
                View Details <FaArrowRight />
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* <div className={styles.ctaSection}>
        <h3>Never Miss an Event</h3>
        <p>Subscribe to our newsletter to receive updates about upcoming events</p>
        <div className={styles.ctaButtons}>
          <button className="btn btn-primary">Subscribe Now</button>
          <Link href="/events" className="btn btn-outline">View All Events</Link>
        </div>
      </div> */}
    </section>
  );
};

export default NewsEvents;