import styles from "./index.module.css";

export default function NavbarButton() {
  return (
    <div className={styles.button}>
      {/* <span class="material-icons-outlined">settings</span> */}
      <span className={styles.text}>Chats</span>
    </div>
  );
}
