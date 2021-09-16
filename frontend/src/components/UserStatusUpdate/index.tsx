import styles from "./index.module.css";
import { Status } from "../UserProfileBadge";

interface Props {
  username: string;
  status: Status.offline | Status.online;
}

export default function UserStatusUpdate({ status, username }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.username}>
        <span>{username}</span>
      </div>

      <div
        className={styles.status}
        style={{
          color:
            status === Status.online
              ? "var(--online-color)"
              : "var(--offline-color)",
        }}
      >
        <span>{status}</span>
      </div>
    </div>
  );
}
