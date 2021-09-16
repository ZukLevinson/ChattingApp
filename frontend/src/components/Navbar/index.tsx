import styles from "./index.module.css";
import NavbarButton from "../NavbarButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from "@mui/icons-material/Forum";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { ReactComponent as AppLogo } from "../../assets/icons/logo.svg";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles["buttons-container"]}>
        <div className={styles.logo}>
          <AppLogo/>
        </div>
        <NavbarButton title="Chats" to="/chats" icon={ForumIcon} />
        <NavbarButton title="Contacts" to="/chats" icon={ContactsIcon} />
        <NavbarButton title="Account" to="/login" icon={AccountCircleIcon} />
        <NavbarButton title="Settings" to="/chats" icon={SettingsIcon} />
      </div>
      <div className={styles["buttons-container"]}>
        <NavbarButton title="Help" to="/chats" icon={ContactSupportIcon} />
        <NavbarButton title="Sign Out" to="/chats" icon={LogoutIcon} />
      </div>
    </div>
  );
}
