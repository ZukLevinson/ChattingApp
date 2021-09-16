import styles from "./index.module.css";
import { FunctionComponent, useEffect, useState } from "react";

export interface Props {
  text: string;
  icon: FunctionComponent;
  tooltip?: string;
  onPress?: any;
}

export default function IconButton(props: Props) {
  let [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.onPress}
    >
      <div className={styles["icon-container"]}>
        <div className={styles.icon}>
          <props.icon />
        </div>
      </div>
      <div
        className={styles.title}
        style={{ fontSize: isHovered ? "0.8em" : "0" }}
      >
        <span>{props.text}</span>
      </div>
    </div>
  );
}
