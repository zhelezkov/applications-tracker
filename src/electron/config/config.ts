import fs from 'fs';
import yaml from 'js-yaml';
import type { Schema } from '../../types/schema';

export interface RuntimeConfig {
  db: string;
  schema: Schema;
}

export function loadRuntimeConfig(path: string): RuntimeConfig {
  const content = fs.readFileSync(path).toString();
  return yaml.load(content) as RuntimeConfig;
}
