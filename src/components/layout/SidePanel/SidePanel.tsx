import styles from "./SidePanel.module.scss";

const SidePanel: React.FC = () => {
  return (
    <section className={styles.side_panel}>
      <nav className={styles.nav}></nav>
    </section>
  );
};

export default SidePanel;
