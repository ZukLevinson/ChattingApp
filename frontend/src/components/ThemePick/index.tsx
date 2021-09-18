import styles from "./index.module.css";
import PaletteIcon from "@mui/icons-material/Palette";

export default function ThemePick() {
  return (
    <div className={styles.container}>
      <PaletteIcon className={styles.icon}/>
      <div className={styles.dropdown}>
        <div>
          Dark
        </div>
        <div>
          Purple
        </div>
        <div>
          Light
        </div>
      </div>
    </div>
  );
}
