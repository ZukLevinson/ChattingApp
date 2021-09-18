import styles from "./index.module.css";
import { useSelector } from "react-redux";

interface Props {
  title: string;
}

export default function FormInput(props: Props) {
  const theme = useSelector((state: any) => state.theme);
  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.label}>
        <label>{props.title}:</label>
      </div>
      <div className={styles['input-container']}>
        <input className={styles['input-box']} type={props.title} name={props.title} defaultValue='' />
      </div>
    </div>
  );
}
