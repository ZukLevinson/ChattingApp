import { FunctionComponent } from "react";
import styles from "./index.module.css";

interface Props {
  title: string;
  icon: FunctionComponent;
}

export default function NavbarButton(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <props.icon />
      </div>
      <div className={styles.text}>
        <span>{props.title}</span>
      </div>
    </div>
  );
}
