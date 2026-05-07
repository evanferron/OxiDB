#[derive(Debug, thiserror::Error)]
pub enum OxiDbError {
    #[error("Database error: {0}")]
    DatabaseError(String),

    #[error("App state error: {0}")]
    AppStateError(String),

    #[error("Serialization error: {0}")]
    SerializationError(String),
}

impl serde::Serialize for OxiDbError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Self::DatabaseError(e) => serializer.serialize_str(e),
            Self::AppStateError(e) => serializer.serialize_str(e),
            Self::SerializationError(e) => serializer.serialize_str(e),
        }
    }
}
