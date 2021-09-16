import styles from "./index.module.css";
import NavbarButton from "../NavbarButton";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.menuButtonContainer}>
          <div className={styles.menuButton}>
            <NavbarButton />
            {/* Chats */}
          </div>
          <div className={styles.menuButton}>
            <NavbarButton />
            {/* Contacts */}
          </div>
          <div className={styles.menuButton}>
            <NavbarButton />
            {/* Settings */}
          </div>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.loginButton}>
            <span className={styles.loginButtonText}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}
