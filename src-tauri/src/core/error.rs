#[derive(Debug, thiserror::Error)]
pub enum OxiDbError {
    #[error("Database error: {0}")]
    Database(String),

    #[error("App state error: {0}")]
    AppState(String),

    #[error("Serialization error: {0}")]
    Serialization(String),
}

impl serde::Serialize for OxiDbError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Self::Database(e) => serializer.serialize_str(e),
            Self::AppState(e) => serializer.serialize_str(e),
            Self::Serialization(e) => serializer.serialize_str(e),
        }
    }
}
