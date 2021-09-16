import styles from "./index.module.css";
import UserProfileBadge, {
  Props as UserProfileBadgeProps,
  Status,
} from "../UserProfileBadge";
import IconButton from "../IconButton";
import { ReactComponent as SendIcon } from "../../assets/icons/send_black_24dp.svg";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebsocket } from "websocket";

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
const client = new W3CWebsocket("ws://localhost:8080/ws");

interface Props {}

export default function Chat(props: Props) {
  let [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    client.send(
      JSON.stringify({
        message: currentMessage,
      })
    );

    setCurrentMessage("");
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("Connected successfully");
    };

    client.onmessage = (message) => {
      console.log(`New message: '${message.data}'`);
    };
  }, []);

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
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="What's on your mind?"
        />
        <IconButton icon={SendIcon} text={"send"} onPress={sendMessage} />
      </div>
    </div>
  );
}
