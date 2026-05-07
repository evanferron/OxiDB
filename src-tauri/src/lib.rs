mod actions;
mod core;
mod postgres;
mod sqlite;
mod state;

use actions::connection::get_saved_connections;
use actions::query::{get_tables, run_query};
use sqlite::actions::{connect_sqlite, save_sqlite_datasource};
use state::AppState;
use tokio::sync::Mutex;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(AppState {
            db: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            connect_sqlite,
            run_query,
            get_tables,
            get_saved_connections,
            save_sqlite_datasource,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
