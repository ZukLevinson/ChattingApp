import styles from "./index.module.css";
import FormInput from "../../components/FormInput";
import { useSelector } from "react-redux";

export default function Login() {
  const state = useSelector((state: any) => state);
  return (
    <div className={styles.container} data-theme={state.theme}>
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
