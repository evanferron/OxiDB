import type { FC } from "react";
import type {
  PostgresDataSource,
  SqliteDataSource,
} from "@/core/models/datasource.ts";

interface DataSourceModalProps {
  dataSource: SqliteDataSource | PostgresDataSource;
}

const isSqlite = (
  ds: SqliteDataSource | PostgresDataSource,
): ds is SqliteDataSource => (ds as SqliteDataSource).path !== undefined;

const DataSourceModal: FC<DataSourceModalProps> = ({ dataSource }) => {
  if (isSqlite(dataSource)) {
    return (
      <div>
        <h3>SQLite — {dataSource.name}</h3>
        <p>Path: {dataSource.path}</p>
      </div>
    );
  }

  const pg = dataSource as PostgresDataSource;
  return (
    <div>
      <h3>Postgres — {pg.database}</h3>
      <p>
        {pg.username}@{pg.host}:{pg.port}
      </p>
      <p>Database: {pg.database}</p>
    </div>
  );
};

export default DataSourceModal;
