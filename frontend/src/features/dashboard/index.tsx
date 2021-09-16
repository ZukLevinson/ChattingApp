import styles from "./index.module.css";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";

export default function Dashboard() {
  return (
    <div className={styles.container} data-theme="dark">
      <Navbar />
      <Chat />
    </div>
  );
}
