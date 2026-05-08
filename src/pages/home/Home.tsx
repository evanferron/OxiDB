import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button";
import styles from "./Home.module.scss";
import logo from "@/assets/OxiDB.png";

interface SavedConnection {
  id: string;
  name: string;
  path: string;
  db_type: string;
  last_used: number;
}

const HomePage: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [recentConnections, setRecentConnections] = useState<SavedConnection[]>(
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const conns = await invoke<SavedConnection[]>("get_saved_connections");
        setRecentConnections(conns.sort((a, b) => b.last_used - a.last_used));
      } catch (err) {
        console.error("Erreur lors du chargement des connexions:", err);
      }
    };
    loadConnections();
  }, []);

  const connectToPath = async (filePath: string, fileName?: string) => {
    setError("");
    setStatus(`Connexion à ${fileName || filePath}...`);
    try {
      await invoke("connect_sqlite", { path: filePath });

      if (fileName) {
        await invoke("save_new_connection", { path: filePath, name: fileName });
      }

      setStatus(`Connecté avec succès !`);
      setTimeout(() => navigate("/editor"), 500);
    } catch (err) {
      console.error(err);
      setError(`Erreur: ${err}`);
      setStatus("");
    }
  };

  const handleOpenNewDialog = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{ name: "SQLite", extensions: ["db", "sqlite", "sqlite3"] }],
      });

      if (selected && typeof selected === "string") {
        const fileName = selected.split(/[\\/]/).pop() || "Nouvelle Base";
        await connectToPath(selected, fileName);
      }
    } catch (_) {
      setError("Erreur lors de l'ouverture du dialogue.");
    }
  };

  return (
    <div className={styles.home_container}>
      <div className={styles.content_wrapper}>
        <div className={styles.empty_state}>
          <div className={styles.icon_wrapper}>
            <img src={logo} alt="OxiDB" className={styles.database_icon} />
          </div>
          <h1 className={styles.title}>Bienvenue sur OxiDB</h1>
          <p className={styles.description}>
            Connectez-vous à une base de données SQLite locale pour commencer à
            explorer.
          </p>
          <div className={styles.actions}>
            <Button onClick={handleOpenNewDialog}>
              Ouvrir une base de données
            </Button>
          </div>
          {status && <p className={styles.status_success}>{status}</p>}
          {error && <p className={styles.status_error}>{error}</p>}
        </div>

        {recentConnections.length > 0 && (
          <div className={styles.recent_connections}>
            <h2 className={styles.recent_title}>Récents</h2>
            <div className={styles.connection_list}>
              {recentConnections.map((conn) => (
                <div key={conn.id} className={styles.connection_item}>
                  <div className={styles.conn_icon}>sqlite</div>
                  <div className={styles.conn_info}>
                    <span className={styles.conn_name}>{conn.name}</span>
                    <span className={styles.conn_path}>{conn.path}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
