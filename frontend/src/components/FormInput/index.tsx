import styles from "./index.module.css";

interface Props {
  title: string;
}

export default function FormInput(props: Props) {
  return (
    <div className={styles.container} data-theme="dark">
      <div className={styles.label}>
        <label>{props.title}:</label>
      </div>
      <div className={styles['input-container']}>
        <input className={styles['input-box']} type={props.title} name={props.title} defaultValue='' />
      </div>
    </div>
  );
}
