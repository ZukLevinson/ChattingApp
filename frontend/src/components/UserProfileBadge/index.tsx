import styles from "./index.module.css";
import { FunctionComponent, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ReactComponent as Avatar } from "../../assets/icons/account_circle_black_24dp.svg";

export enum Status {
  online = "Online",
  offline = "Offline",
  inChat = "In chat",
}

export interface Props {
  username: string;
  status: Status;
  icon?: FunctionComponent;
}

export default function UserProfileBadge(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        {props.icon ? <props.icon /> : <Avatar />}
      </div>
      <div className={styles.info}>
        <div className={styles.username}>
          <span>{props.username}</span>
        </div>
        <div
          className={styles.status}
          style={{ color: getColor(props.status) }}
        >
          <span>{props.status}</span>
        </div>
      </div>
    </div>
  );
}

function getColor(status: Status) {
  switch (status) {
    case Status.online:
      return "var(--online-color)";
    case Status.offline:
      return "var(--offline-color)";
    case Status.inChat:
      return "var(--in-chat-color)";
  }
}
