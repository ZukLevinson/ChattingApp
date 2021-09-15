import styles from "./index.module.css";

export default function Navbar() {
  return (
    <div style={styles}>
      <ul>
          <li>
              Chats
          </li>
          <li>
              Contacts
          </li>
          <li>
              Settings
          </li>
      </ul>
    </div>
  );
}
