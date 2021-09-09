import { FunctionComponent } from "react";
import styles from "./index.module.css";

export interface Props {
  component: FunctionComponent;
  flex?: boolean;
  width: string;
}

const renderStyle = (width: string, isFlex?: boolean) =>
  isFlex
    ? {
        flex: "1",
        width,
      }
    : {
        marginRight: "2.25em",
        width,
      };

export default function Card(props: Props) {
  return (
    <div
      className={styles.container}
      style={renderStyle(props.width, props.flex)}
    >
      <props.component />
    </div>
  );
}
