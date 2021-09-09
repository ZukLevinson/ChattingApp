import Card from "../../components/card";
import Chat from "../../components/card";
import Menu from "../menu";
import styles from "./index.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container} data-view="dark">
      <Card width="20%" component={() => <a>321</a>} />
      <Card flex width="100%" component={() => <a>123</a>} />
    </div>
  );
}
