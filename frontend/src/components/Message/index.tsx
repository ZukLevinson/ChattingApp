import styles from "./index.module.css";
import { FunctionComponent, useEffect, useState } from "react";
import { Props as UserProfileBadgeProps, Status } from "../UserProfileBadge";

export interface Props {
  text: string;
  date: Date;
  sender?: UserProfileBadgeProps;
  isMe: boolean;
}

export default function Message(props: Props) {
  return (
    <div
      className={styles.container}
      style={{ alignSelf: props.isMe ? "flex-end" : "flex-start" }}
    >
      <div
        className={styles.sender}
        style={{ alignSelf: props.isMe ? "flex-end" : "flex-start" }}
      >
        <span>{props.isMe && "YOU ARE "}The Sender</span>
      </div>
      <div className={styles.text}>
        <span>{props.text}</span>
      </div>
      <div
        className={styles.date}
        style={{ alignSelf: props.isMe ? "flex-start" : "flex-end" }}
      >
        <span>
          {!datesAreOnSameDay(new Date(), props.date) &&
            props.date.toLocaleDateString("he-IL") + ", "}{" "}
          {props.date.toLocaleTimeString("he-IL")}
        </span>
      </div>
    </div>
  );
}

const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
