use serde::{Deserialize, Serialize};

use crate::core::{ADatabase, OxiDbError, QueryResult};

#[derive(Debug, Serialize, Deserialize)]
pub struct PostgresDatabase {
    host: String,
    port: u16,
    user: String,
    database: String,
    ssl: bool,
}

impl PostgresDatabase {
    pub fn new(host: String, port: u16, user: String, database: String, ssl: bool) -> Self {
        Self {
            host,
            port,
            user,
            database,
            ssl,
        }
    }
}

#[async_trait::async_trait]
impl ADatabase for PostgresDatabase {
    async fn execute(&self, query: &str) -> Result<QueryResult, OxiDbError> {
        todo!()
    }

    async fn ping(&self) -> Result<(), OxiDbError> {
        todo!()
    }
}
