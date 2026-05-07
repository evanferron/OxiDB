pub mod base;
pub mod config;
pub mod error;

pub use base::data_source::DataSource;
pub use base::database::{ADatabase, QueryResult};
pub use error::OxiDbError;
