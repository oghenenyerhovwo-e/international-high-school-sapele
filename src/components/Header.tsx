// components
import {
  ThemeToggle,
} from "@/components"
import Image from "next/image";
import Link from "next/link";

// objects and functions
import { logoImg } from '@/assets';

// css
import styles from './header.module.css';

const Header = () => {
  return (
    <div className="content-grid">
        <header className={styles.header}>
            <div className={styles.brand}>
                <Link href={"/"}>
                    <div className={styles.brandImg}>
                        <Image
                            src={logoImg}
                            alt="International School Logo"
                        />
                    </div>
                    <h3>International School</h3>
                </Link>
            </div>
            <div className={styles.options}>
                <div className={styles.toggleBtn}>
                    <ThemeToggle /> 
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header