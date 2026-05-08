pub mod actions;
pub mod database;

use crate::core::error::OxiDbError;

impl From<rusqlite::Error> for OxiDbError {
    fn from(e: rusqlite::Error) -> Self {
        Self::Database(e.to_string())
    }
}
