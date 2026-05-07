use crate::core::DataSource;
use crate::core::config;

#[tauri::command]
pub fn get_saved_connections() -> Vec<DataSource> {
    config::read_connections()
}
