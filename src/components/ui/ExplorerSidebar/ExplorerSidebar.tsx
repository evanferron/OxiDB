import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import styles from "./ExplorerSidebar.module.scss";

interface ExplorerSidebarProps {
  onTableSelect: (tableName: string) => void;
}

const ExplorerSidebar: React.FC<ExplorerSidebarProps> = ({ onTableSelect }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      await invoke<string[]>("get_tables")
        .then((res) => {
          setTables(res);
          setError(null);
        })
        .catch((err) => {
          console.error("Erreur de récupération des tables:", err);
          setError(err.toString());
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTables();
  }, []); // Le tableau vide signifie qu'on charge ça une fois au montage

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3>🗄️ EXPLORER</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.section_title}>Tables ({tables.length})</div>

        {loading && <div className={styles.message}>Chargement...</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && !error && tables.length === 0 && (
          <div className={styles.message}>Aucune table trouvée.</div>
        )}

        <ul className={styles.table_list}>
          {tables.map((table) => (
            <li
              key={table}
              className={styles.table_item}
              onClick={() => onTableSelect(table)}
            >
              <span className={styles.icon}>📁</span>
              <span className={styles.name}>{table}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExplorerSidebar;
