use chrono::Utc;
use uuid::Uuid;

use crate::{
    core::{DataSource, OxiDbError, base::data_source::DataSourceConfig, config, state::AppState},
    sqlite::database::SqliteDatabase};

#[tauri::command]
pub async fn connect_sqlite(
    state: tauri::State<'_, AppState>,
    path: String,
) -> Result<String, OxiDbError> {
    let db = SqliteDatabase::new(path);
    state.replace_db(Box::new(db)).await;
    Ok("Connected to sqlite database".to_string())
}

#[tauri::command]
pub fn save_sqlite_datasource(path: String, name: String) -> Result<Vec<DataSource>, String> {
    let mut connections = config::read_connections();

    // si le chemin n'existe pas déjà, on l'ajoute
    if !connections.iter().any(|c| match &c.connection {
        DataSourceConfig::Sqlite {
            path: existing_path,
        } => existing_path == &path,
        _ => false,
    }) {
        let sqlite_con = DataSourceConfig::Sqlite { path };
        let new_source = DataSource::new(Uuid::new_v4(), name, sqlite_con, Utc::now(), Utc::now());
        connections.push(new_source);
        config::save_connections(&connections)?;
    }
    Ok(connections)
}
