use crate::core::{ADatabase, OxiDbError, QueryResult};
use rusqlite::Connection;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SqliteDatabase {
    path: String,
}

impl SqliteDatabase {
    pub fn new(path: String) -> Self {
        Self { path }
    }
}

#[async_trait::async_trait]
impl ADatabase for SqliteDatabase {
    async fn execute(&self, query: &str) -> Result<QueryResult, OxiDbError> {
        let conn = Connection::open(&self.path).map_err(|e| OxiDbError::from(e))?;
        let mut stmt = conn.prepare(query).map_err(|e| OxiDbError::from(e))?;

        let col_names: Vec<String> = stmt.column_names().iter().map(|n| n.to_string()).collect();

        // On récupère les lignes dynamiquement
        let rows = stmt
            .query_map([], |row| {
                let mut res = Vec::new();
                for i in 0..col_names.len() {
                    // On cast tout en String pour le MVP de l'UI
                    let val: String = row
                        .get::<_, rusqlite::types::Value>(i)
                        .map(|v| format!("{:?}", v)) // Améliorable plus tard
                        .unwrap_or_default();
                    res.push(val);
                }
                Ok(res)
            })
            .map_err(|e| OxiDbError::from(e))?;

        let mut result_rows = Vec::new();
        for row in rows {
            result_rows.push(row.map_err(|e| OxiDbError::from(e))?);
        }

        Ok(QueryResult {
            columns: col_names,
            rows: result_rows,
        })
    }

    async fn ping(&self) -> Result<(), OxiDbError> {
        Ok(())
    }
}
