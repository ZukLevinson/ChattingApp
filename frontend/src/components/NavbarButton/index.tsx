import { FunctionComponent } from "react";
import styles from "./index.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

interface Props {
  title: string;
  icon: FunctionComponent;
  to: string;
}

export default function NavbarButton(props: Props) {
  return (
    <Link style={{ textDecoration: 'none'}} to={props.to} className={styles.container}>
      <div className={styles.icon}>
        <props.icon />
      </div>
      <div className={styles.text}>
        <span>{props.title}</span>
      </div>
    </Link>
  );
}
