// modules
import { motion } from "framer-motion";

// component
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import styles from "./lessoncard.module.css";
import Image from "next/image";

// objects and funcions
import {
  Lesson,
} from "@/utils"
  

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
    return (
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className={styles.name}>
          {lesson.teacherNames.join(" & ")}
        </h3>
  
        <div className={styles.meta}>
          <div className={styles.badgeList}>
            {lesson.subjects.map((sub) => (
              <span key={sub} className={styles.badge}>
                {sub}
              </span>
            ))}
          </div>
          <div className={styles.badgeList}>
            {lesson.classes.map((cls) => (
              <span key={cls} className={styles.badgeSecondary}>
                {cls}
              </span>
            ))}
          </div>
        </div>
  
        {/* Teacher images above buttons */}
        {lesson.teacherImages && (
          <div className={styles.avatars}>
            {lesson.teacherImages.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={lesson.teacherNames[i]}
                className={styles.avatar}
                width={60}
                height={60}
              />
            ))}
          </div>
        )}
  
        <div className={styles.buttons}>
            <a 
                href={`tel:${lesson.phoneNumber}`} 
                className={styles.callBtn}
            >
                <FaPhoneAlt  />
                <span>Call</span>
            </a>
            {lesson.whatsappLink && (
                <a
                    href={lesson.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                </a>
            )}
        </div>
      </motion.div>
    );
  }
export default LessonCard;
