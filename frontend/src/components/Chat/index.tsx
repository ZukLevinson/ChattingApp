import styles from "./index.module.css";
import UserProfileBadge, {
  Props as UserProfileBadgeProps,
} from "../UserProfileBadge";

const tempCurrentChat: UserProfileBadgeProps = {
  username: "amit",
  status: "Online",
};

interface Props {}

export default function Chat(props: Props) {
  return (
    <div className={styles.container}>
      <div>
        <UserProfileBadge {...tempCurrentChat} />
      </div>
    </div>
  );
}
