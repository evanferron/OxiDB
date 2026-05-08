use crate::AppState;
use crate::core::OxiDbError;
use crate::core::QueryResult;

#[tauri::command]
pub async fn run_query(
    state: tauri::State<'_, AppState>,
    query: String,
) -> Result<QueryResult, OxiDbError> {
    let db_lock = state.db.lock().await;

    if let Some(ref db) = *db_lock {
        db.execute(&query).await
    } else {
        Err(OxiDbError::Database("No database connected".to_string()))
    }
}

#[tauri::command]
pub async fn get_tables(state: tauri::State<'_, AppState>) -> Result<Vec<String>, OxiDbError> {
    let db_lock = state.db.lock().await;

    if let Some(ref db) = *db_lock {
        let result = db
            .execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
            )
            .await?;

        let tables = result
            .rows
            .into_iter()
            .filter_map(|row| row.first().cloned())
            .collect();

        Ok(tables)
    } else {
        Err(OxiDbError::Database("No database connected".to_string()))
    }
}
