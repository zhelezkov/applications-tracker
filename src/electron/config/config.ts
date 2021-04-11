import fs from 'fs';
import yaml from 'js-yaml';

export interface RuntimeConfig {
  db: string;
}

export function loadRuntimeConfig(path: string): RuntimeConfig {
  const content = fs.readFileSync(path).toString();
  return yaml.load(content) as RuntimeConfig;
}
