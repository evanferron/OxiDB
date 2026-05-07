use serde::{Deserialize, Serialize};

use crate::core::OxiDbError;

#[async_trait::async_trait]
pub trait ADatabase: Send + Sync {
    async fn execute(&self, query: &str) -> Result<QueryResult, OxiDbError>;

    async fn ping(&self) -> Result<(), OxiDbError>;
}
// On définit ce qu'est une ligne de résultat pour le frontend
#[derive(Serialize, Deserialize)]
pub struct QueryResult {
    pub columns: Vec<String>,
    pub rows: Vec<Vec<String>>,
}
