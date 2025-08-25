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

// import assests and data
import { schoolAlert } from '@/data';

// css
import styles from './home.module.css';

const HomeScreen = () => {
  return (
    <div className={`${styles.home} content-grid`}>

        <AlertBanner 
          alerts={schoolAlert}
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
