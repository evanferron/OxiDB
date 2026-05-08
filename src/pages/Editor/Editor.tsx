import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { invoke } from "@tauri-apps/api/core";
import Button from "@/components/ui/Button/Button";
import styles from "./Editor.module.scss";
import ExplorerSidebar from "@/components/ui/ExplorerSidebar/ExplorerSidebar";

// Correspond à la structure de retour de ton backend Rust
interface QueryResult {
  columns: string[];
  rows: string[][];
}

const EditorView: React.FC = () => {
  const [query, setQuery] = useState<string>("SELECT * FROM sqlite_master;");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRunQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    await invoke<QueryResult>("run_query", { query })
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Permet d'exécuter la requête avec Cmd+Enter ou Ctrl+Enter
  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunQuery();
    }
  };

  const handleTableSelect = (tableName: string) => {
    const newQuery = `SELECT * FROM ${tableName} LIMIT 100;`;
    setQuery(newQuery);
    // Optionnel : tu pourrais même appeler handleRunQuery() ici
    // pour exécuter la requête automatiquement au clic.
  };

  return (
    <div className={styles.layout_container}>
      <ExplorerSidebar onTableSelect={handleTableSelect} />
      <div className={styles.editor_container} onKeyDown={handleEditorKeyDown}>
        {/* Barre d'outils de l'éditeur */}
        <div className={styles.toolbar}>
          <span className={styles.tab_title}>📝 Nouvelle Requête.sql</span>
          <div className={styles.actions}>
            <Button onClick={handleRunQuery}>
              {loading ? "Exécution..." : "▶ Exécuter (Ctrl+Enter)"}
            </Button>
          </div>
        </div>

        {/* Zone de l'éditeur SQL (Haut) */}
        <div className={styles.editor_section}>
          <MonacoEditor
            height="100%"
            language="sql"
            theme="vs-dark"
            value={query}
            onChange={(value) => setQuery(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Zone des résultats (Bas) */}
        <div className={styles.results_section}>
          <div className={styles.results_header}>
            Résultats {result && `(${result.rows.length} lignes)`}
          </div>

          <div className={styles.results_content}>
            {error && (
              <div className={styles.error_box}>
                <strong>Erreur SQL :</strong> {error}
              </div>
            )}

            {result && result.rows.length === 0 && !error && (
              <div className={styles.empty_result}>
                Requête exécutée avec succès (0 ligne).
              </div>
            )}

            {result && result.rows.length > 0 && (
              <div className={styles.table_wrapper}>
                <table className={styles.data_table}>
                  <thead>
                    <tr>
                      {result.columns.map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
