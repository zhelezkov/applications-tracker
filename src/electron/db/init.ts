import db from 'better-sqlite3-helper';
import type { Database } from 'better-sqlite3';

import type { RuntimeConfig } from '../config/config';

export function initDb(
  // initConfig: InitConfig,
  runtimeConfig: RuntimeConfig
): Database {
  return db({
    path: runtimeConfig.db,
  }).connection();
}
