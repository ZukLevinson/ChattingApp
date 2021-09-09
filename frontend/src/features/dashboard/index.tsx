import Chats from "../menu";
import styles from "./index.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container} data-view="dark">
      <Chats />
    </div>
  );
}
