import styles from "./index.module.css";
import FormInput from "../../components/FormInput";

export default function Login() {
  return (
    <div className={styles.container} data-theme="dark">
      <div className={styles.title}>Log In</div>
      <form className={styles.form}>
        <FormInput title="Username" />
        <FormInput title="Password" />
      </form>
      <div className={styles.button}>Log In</div>
      <div className={styles["sign-up"]}>Not signed up yet? Sign Up here!</div>
    </div>
  );
}
