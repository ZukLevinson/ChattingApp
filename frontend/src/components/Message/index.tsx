import styles from "./index.module.css";
import { FunctionComponent, useEffect, useState } from "react";
import { Props as UserProfileBadgeProps, Status } from "../UserProfileBadge";

export interface Props {
  text: string;
  date: Date;
  sender?: UserProfileBadgeProps;
}

export default function Message(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.sender}></div>
      <div className={styles.content}>
        <span>{props.text}</span>
      </div>
      <div className={styles.date}>
        <span>{props.date.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
