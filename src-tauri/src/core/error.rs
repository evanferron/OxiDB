#[derive(Debug, thiserror::Error)]
pub enum OxiDbError {
    #[error("Database error: {0}")]
    Database(String),
}

impl serde::Serialize for OxiDbError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Self::Database(e) => serializer.serialize_str(e),
        }
    }
}
