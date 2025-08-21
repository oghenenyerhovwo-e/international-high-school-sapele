// modules

// components
import {
  Header,
  Intro,
  About,
  AcademicPrograms,
  AlertBanner,
  NewsEvents,
  Testimonials,
  Footer,
} from "@/components"


// css
import styles from './home.module.css';

const HomeScreen = () => {
  return (
    <div className={`${styles.home} content-grid`}>

        <AlertBanner 
          alerts={[
            {
              id: 'alert-1',
              message: '🚨 URGENT: School will be closed this Friday due to inclement weather.',
              fullMessage: '🚨 URGENT: School will be closed this Friday due to inclement weather. All classes will transition to online learning. Please check your email for detailed instructions from your teachers. Stay safe and warm!',
              type: 'critical'
            },
            {
              id: 'alert-2', 
              message: '📢 Important: Parent-Teacher conferences scheduled for next week.',
              fullMessage: '📢 Important: Parent-Teacher conferences scheduled for next week. Please book your time slot through the parent portal. Each session will be 15 minutes long. If you need more time, please contact the teacher directly to schedule a separate meeting.',
              type: 'warning'
            },
            {
              id: 'alert-3',
              message: 'ℹ️ Reminder: School photo day is coming up next Monday.',
              fullMessage: 'ℹ️ Reminder: School photo day is coming up next Monday. All students must come in full school uniform. Individual portraits will be taken in the morning, and class photos will be taken after lunch. Order forms have been sent home with students.',
              type: 'info'
            }
          ]}
          autoRotate={true}
          rotateInterval={6000}
        />

        <Header />

        <Intro />

        <About />

        <AcademicPrograms />

        <NewsEvents />

        <Testimonials />

        <Footer />
        
    </div>
  );
}

export default HomeScreen
