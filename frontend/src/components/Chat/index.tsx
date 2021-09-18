import styles from "./index.module.css";
import UserProfileBadge, {
  Props as UserProfileBadgeProps,
  Status,
} from "../UserProfileBadge";
import IconButton from "../IconButton";
import { ReactComponent as SendIcon } from "../../assets/icons/send_black_24dp.svg";
import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebsocket } from "websocket";
import Message from "../Message";

const tempOnlineUsers: UserProfileBadgeProps[] = [
  {
    username: "amit",
    status: Status.online,
  },
  {
    username: "BIG CHUNGUS",
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
const client = new W3CWebsocket(
  `ws://${process.env.REACT_APP_HOST}:8080/messages`
);

interface Props {}

export default function Chat(props: Props) {
  let [currentMessage, setCurrentMessage] = useState("");
  let [messages, setMessages] = useState([] as JSX.Element[]);
  let [uniqueId, setUniqueId] = useState("" + Date.now());
  let textArea = useRef<any>();

  const sendMessage = () => {
    client.send(
      JSON.stringify({
        message: currentMessage,
        sender: uniqueId,
      })
    );

    setCurrentMessage("");
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("Connected successfully");
    };

    client.onmessage = (incoming: any) => {
      const { message, sender } = JSON.parse(incoming.data);

      messages.push(
        <Message text={message} date={new Date()} isMe={uniqueId === sender} />
      );
      const updatedMessages = [...messages];

      setMessages(updatedMessages);
    };

    textArea.current?.focus(); // Focus on text box
  }, []);

  const handleKeyDownTextArea = (e: any, limit: number) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

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
              {tempOnlineUsers.map((user, key) => (
                <UserProfileBadge {...user} key={key} />
              ))}
            </div>
          </div>
          <div className={styles["users-section"] + " " + styles.offlines}>
            <div className={styles["users-section-header"]}>
              <span>Others</span>
            </div>
            <div className={styles.users}>
              {tempOfflineUsers.map((user, key) => (
                <UserProfileBadge {...user} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content} id="chat">
        {messages}
      </div>
      <form className={styles.footer}>
        <div className={styles.texter}>
          <textarea
            // type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="What's on your mind?"
            onKeyPress={(e) => {
              console.log(e.code === "Enter");
              e.code === "Enter" && sendMessage();
            }}
            onKeyDown={(e) => handleKeyDownTextArea(e, 50)}
            ref={textArea}
            rows={1}
          />
        </div>
        <div className={styles.limit}>
          <span>{currentMessage.length}/512</span>
        </div>

        <IconButton icon={SendIcon} text={"send"} onPress={sendMessage} />
        <input
          type="submit"
          style={{ visibility: "hidden", display: "none" }}
        />
      </form>
    </div>
  );
}
