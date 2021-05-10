import fs from 'fs';
import yaml from 'js-yaml';
import type { SchemaConfig } from '../../types/schema';

export interface RuntimeConfig {
  db: string;
  schema: SchemaConfig;
}

export function loadRuntimeConfig(path: string): RuntimeConfig {
  const content = fs.readFileSync(path).toString();
  return yaml.load(content) as RuntimeConfig;
}
