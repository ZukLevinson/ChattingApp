import styles from "./index.module.css";
import FormInput from "../../components/FormInput";

export default function Login() {
  return (
    <div className={styles.container} data-theme="dark">
      <div className={styles.title}>Log In.</div>
      <form className={styles.form}>
        <FormInput title="Username" />
        <FormInput title="Password" />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
