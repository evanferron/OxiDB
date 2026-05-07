use directories::ProjectDirs;
use std::fs;
use std::path::PathBuf;

use crate::core::DataSource;

fn get_connexion_path() -> PathBuf {
    if let Some(proj_dirs) = ProjectDirs::from("com", "oxidedb", "app") {
        let config_dir = proj_dirs.config_dir();
        if !config_dir.exists() {
            let _ = fs::create_dir_all(config_dir);
        }
        config_dir.join("connections.json")
    } else {
        PathBuf::from("connections.json")
    }
}

pub fn read_connections() -> Vec<DataSource> {
    let path = get_connexion_path();
    if let Ok(content) = fs::read_to_string(path) {
        serde_json::from_str(&content).unwrap_or_else(|_| vec![])
    } else {
        vec![]
    }
}

pub fn save_connections(connections: &Vec<DataSource>) -> Result<(), String> {
    let path = get_connexion_path();
    let content = serde_json::to_string_pretty(connections).map_err(|e| e.to_string())?;
    fs::write(path, content).map_err(|e| e.to_string())
}
