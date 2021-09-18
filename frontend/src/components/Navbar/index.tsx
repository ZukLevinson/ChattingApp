import styles from "./index.module.css";
import NavbarButton from "../NavbarButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from "@mui/icons-material/Forum";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { ReactComponent as AppLogo } from "../../assets/icons/logo.svg";
import { w3cwebsocket as W3CWebsocket } from "websocket";
import { useEffect, useState } from "react";
import UserStatusUpdate from "../UserStatusUpdate";
import { Status } from "../UserProfileBadge";
import PaletteIcon from "@mui/icons-material/Palette";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

const createOnlineStatusUpdate = (id: string, remove: any) => {
  const timer = setTimeout(remove, 1000);
  return <UserStatusUpdate username={id} status={Status.online} />;
};

const createOfflineStatusUpdate = (id: string, remove: any) => {
  const timer = setTimeout(remove, 1000);
  return <UserStatusUpdate username={id} status={Status.offline} />;
};

const client = new W3CWebsocket(
  `ws://${process.env.REACT_APP_HOST}:8080/statuses`
);

export default function Navbar() {
  const dispatch = useDispatch();
  const { changeTheme } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: any) => state);

  let [uniqueId, setUniqueId] = useState("" + Date.now());
  let [statuses, setStatuses] = useState([] as JSX.Element[]);

  const sendActive = () => {
    client.send(
      JSON.stringify({
        userId: uniqueId,
        status: "Online",
      })
    );
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("Connected successfully");
      sendActive();
    };

    client.onmessage = (incoming: any) => {
      const { userId, status } = JSON.parse(incoming.data);

      const remove = () => {
        const updatedMessages = [
          ...statuses.filter((_, i) => i !== statuses.length - 1),
        ];

        setStatuses(updatedMessages);
      };

      const addOn =
        status === "Online"
          ? createOnlineStatusUpdate(userId, remove)
          : createOfflineStatusUpdate(userId, remove);

      statuses.unshift(addOn);
      const updatedMessages = [...statuses];

      setStatuses(updatedMessages);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["buttons-container"]}>
        <div className={styles.logo}>
          <AppLogo />
        </div>
        <NavbarButton title="Chats" to="/chats" icon={ForumIcon} />
        <NavbarButton title="Contacts" to="/chats" icon={ContactsIcon} />
        <NavbarButton title="Account" to="/login" icon={AccountCircleIcon} />
        <NavbarButton title="Settings" to="/chats" icon={SettingsIcon} />
      </div>
      <div
        className={styles["buttons-container"] + " " + styles.statuses}
        id="statuses"
      >
        {statuses}
      </div>
      <div className={styles["buttons-container"]}>
        <div className={styles["buttons-container"]} onClick={() => changeTheme(state.theme)}>
          <NavbarButton
          title="Theme"
          to="/chats"
          icon={PaletteIcon}
        />
        </div>
        
        <NavbarButton title="Help" to="/chats" icon={ContactSupportIcon} />
        <NavbarButton title="Sign Out" to="/chats" icon={LogoutIcon} />
      </div>
    </div>
  );
}
