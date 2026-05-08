import styles from "./Header.module.scss";
import logo from "@/assets/OxiDB.png";

const Header: React.FC = () => (
  <header className={styles.header}>
    <img src={logo} alt="OxiDB" className={styles.logo} />
  </header>
);

export default Header;
