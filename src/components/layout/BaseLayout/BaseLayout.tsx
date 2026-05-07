import Header from "@/components/layout/Header/Header";
import SidePanel from "@/components/layout/SidePanel/SidePanel";
import styles from "./BaseLayout.module.scss";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.main_content}>
        <SidePanel />
        {children}
      </section>
    </main>
  );
};

export default BaseLayout;
