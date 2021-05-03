import ipc from './ipc';

export enum AttributeType {
  input = 'input',
  select = 'select',
  multiSelect = 'multiSelect',
}

export interface AttributeDefinition {
  id: string;
  name?: string;
  values?: string[];
  type?: AttributeType;
  otherValue?: boolean;
  multiSelect?: boolean;
}

export interface Schema {
  attributes: Record<string, Omit<AttributeDefinition, 'id'>>;
}

export async function loadSchema(): Promise<Schema> {
  return ipc().invoke('loadSchema');
}
