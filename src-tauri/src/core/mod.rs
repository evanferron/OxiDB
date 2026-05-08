pub mod base;
pub mod config;
pub mod error;
pub mod state;

pub use base::data_source::DataSource;
pub use base::database::{ADatabase, QueryResult};
pub use error::OxiDbError;
