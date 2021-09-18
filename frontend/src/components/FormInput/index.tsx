import styles from "./index.module.css";
import { useSelector } from "react-redux";

interface Props {
  title: string;
}

export default function FormInput(props: Props) {
  const state = useSelector((state: any) => state);
  return (
    <div className={styles.container} data-theme={state.theme}>
      <div className={styles.label}>
        <label>{props.title}:</label>
      </div>
      <div className={styles['input-container']}>
        <input className={styles['input-box']} type={props.title} name={props.title} defaultValue='' />
      </div>
    </div>
  );
}
