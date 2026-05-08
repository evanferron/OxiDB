use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    core::{OxiDbError, base::database::ADatabase},
    postgres::database::PostgresDatabase,
    sqlite::database::SqliteDatabase,
};

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(tag = "db_type", content = "config")]
pub enum DataSourceConfig {
    #[serde(rename = "sqlite")]
    Sqlite { path: String },
    #[serde(rename = "postgres")]
    Postgres {
        host: String,
        port: u16,
        user: String,
        database: String,
        ssl: bool,
    },
}

// db factory
impl DataSourceConfig {
    pub fn build_database(&self) -> Result<Box<dyn ADatabase>, OxiDbError> {
        match self {
            DataSourceConfig::Sqlite { path } => Ok(Box::new(SqliteDatabase::new(path.clone()))),
            DataSourceConfig::Postgres {
                host,
                port,
                user,
                database,
                ssl,
            } => Ok(Box::new(PostgresDatabase::new(
                host.clone(),
                *port,
                user.clone(),
                database.clone(),
                *ssl,
            ))),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct DataSource {
    pub id: Uuid,
    pub name: String,
    pub connection: DataSourceConfig,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl DataSource {
    pub fn new(
        id: Uuid,
        name: String,
        connection: DataSourceConfig,
        created_at: DateTime<Utc>,
        updated_at: DateTime<Utc>,
    ) -> Self {
        Self {
            id,
            name,
            connection,
            created_at,
            updated_at,
        }
    }
}
