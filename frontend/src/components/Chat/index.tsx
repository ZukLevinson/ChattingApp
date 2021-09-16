import styles from "./index.module.css";
import UserProfileBadge, {
  Props as UserProfileBadgeProps,
  Status,
} from "../UserProfileBadge";

const tempOnlineUsers: UserProfileBadgeProps[] = [
  {
    username: "amit",
    status: Status.online,
  },
  {
    username: "zuk",
    status: Status.inChat,
  },
  {
    username: "bruh",
    status: Status.offline,
  },
];
const tempOfflineUsers: UserProfileBadgeProps[] = [
  {
    username: "amit1",
    status: Status.offline,
  },
];

interface Props {}

export default function Chat(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>Private Chat</span>
        </div>
        <div className={styles["users-container"]}>
          <div className={styles["users-section"] + " " + styles.actives}>
            <div className={styles["users-section-header"]}>
              <span>Reacently Active</span>
            </div>
            <div className={styles.users}>
              {tempOnlineUsers.map((user) => (
                <UserProfileBadge {...user} />
              ))}
            </div>
          </div>
          <div className={styles["users-section"] + " " + styles.offlines}>
            <div className={styles["users-section-header"]}>
              <span>Others</span>
            </div>
            <div className={styles.users}>
              {tempOfflineUsers.map((user) => (
                <UserProfileBadge {...user} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <span>hi im the chat</span>
      </div>
      <div className={styles.footer}>
        <span>hi im the footer</span>
      </div>
    </div>
  );
}
