interface SqliteDataSource {
  path: string;
  name: string;
}

interface PostgresDataSource {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export type { SqliteDataSource, PostgresDataSource };
