import db from 'better-sqlite3-helper';

import { RuntimeConfig } from '../config/config';
import { Database } from 'better-sqlite3';

export function initDb(
  // initConfig: InitConfig,
  runtimeConfig: RuntimeConfig
): Database {
  return db({
    path: runtimeConfig.db,
    migrate: {
      migrationsPath: './electron/migrations',
    },
  }).connection();
}
