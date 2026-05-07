use crate::core::ADatabase;
use tokio::sync::Mutex;

// On crée une structure pour stocker la connexion active
pub struct AppState {
    pub db: Mutex<Option<Box<dyn ADatabase + Send + Sync>>>,
}

impl AppState {
    pub async fn replace_db(&self, db: Box<dyn ADatabase + Send + Sync>) {
        let mut db_lock = self.db.lock().await;
        *db_lock = Some(db);
    }
}
