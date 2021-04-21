import ipc from './ipc';

export interface Attribute {
  id: string;
  values: string[];
}

export interface Schema {
  attributes: Record<string, Omit<Attribute, 'id'>>;
}

export async function loadSchema(): Promise<Schema> {
  return ipc().invoke('loadSchema');
}
